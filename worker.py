# -*- coding: utf-8 -*-
"""
Password Cracking Worker
CS655
"""

import socket
import sys
from hashlib import md5
import ast # Safer than using the built in eval()
import math
import base64
import threading
from _thread import start_new_thread
import io

# Some threading code from 
    # https://www.geeksforgeeks.org/socket-programming-multi-threading-python/
    # https://www.youtube.com/watch?v=FKlmAkEb40s

class SocketIO(io.RawIOBase):
    def __init__(self, sock):
        self.sock = sock
    def read(self, sz=-1):
        if (sz == -1): sz=0x7FFFFFFF
        return self.sock.recv(sz)
    def seekable(self):
        return False


print_lock = threading.Lock() 


# return char associated with the index
# index 0 -> A, index 1 => B ... index 51 => z
def helper(char_index):
    if (char_index <= 25):
        return chr(char_index + 65)
    else:
        return chr(char_index - 26 + 97)

# get 5 char password at index out of 52^5 -1 indexes
# this version is without loop but one can implement the following code with a loop
def get_password_at_index(index):
    first_char_index = index % 52
    second_char_index = math.floor((index % pow(52,2))/52)
    third_char_index = math.floor((index % pow(52,3))/pow(52,2))
    fourth_char_index = math.floor((index % pow(52,4))/pow(52,3))
    fifth_char_index = math.floor((index % pow(52,5))/pow(52,4))
    first_char = helper(first_char_index)
    second_char = helper(second_char_index)
    third_char = helper(third_char_index)
    fourth_char = helper(fourth_char_index)
    fifth_char = helper(fifth_char_index)

    final_string = fifth_char + fourth_char + third_char + second_char + first_char
    return final_string

def increment_string(string):
    char_list = list(string)
    mapped_to_num_list = []
    for char in char_list:
        if ((ord(char) >= 65) and (ord(char) <= 90)):
            mapped_to_num_list.append(ord(char)-65)
        else:
            mapped_to_num_list.append(ord(char)-97+26)
    carry = 1
    for i in range(len(mapped_to_num_list)-1, -1, -1):
        mapped_to_num_list[i] = mapped_to_num_list[i] + carry
        if (mapped_to_num_list[i] > 51):
            carry = 1
            mapped_to_num_list[i] = 0
        else:
            carry = 0
    final_string_char_list = []
    for num in mapped_to_num_list:
        if ((num >= 0) and (num <= 25)):
            final_string_char_list.append(chr(num + 65))
        else:
            final_string_char_list.append(chr(num -26  + 97))
    return "".join(final_string_char_list)



def crack(data, connection):
    data = ast.literal_eval(data) # Turn the string into a dictionary
    pwd_hash = base64.b64decode(data['hash'])
    start_index = int(data['index'][0])
    end_index = int(data['index'][1])
    print(pwd_hash)
    pwd_string = get_password_at_index(start_index)
    while start_index < end_index:
        pwd_attempt = pwd_string.encode()
        attempt_hash = md5(pwd_attempt).digest()
#        print(f"attempting {pwd_attempt}: evaluated to {attempt_hash}")
        if attempt_hash == pwd_hash:
            connection.sendall(pwd_attempt + b'\n')
            return
        start_index+=1
        pwd_string = increment_string(pwd_string)
    connection.sendall(b"Fail to find password\n")
    
def Main(client, connection):  
    ip = connection[0]
    port = connection[1]
    print(f"Connection from {ip} on port {port}")
    fd = SocketIO(client)
    for line in fd:
        if (line.decode() == "Closing Connection\n"):
            print("Close Connection\n")
            client.close()
            break
        else:
            # crack(line[:-1].decode(), client)
            print(line.decode())
            connection.sendall(b"Fail to find password\n")
        
        
# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
port_num = int(sys.argv[1])

hostname = socket.gethostname()    
# IPAddr = socket.gethostbyname(hostname)

IPAddr = 'localhost'  

server_address = (IPAddr, port_num)
print('Starting up on %s port %s' % server_address, file=sys.stderr)
sock.bind(server_address)

# Listen for incoming connections
sock.listen(5)
        
        
while True:
    # Wait for a connection
    print('Waiting for a connection',file=sys.stderr)
    try:
        connection, client_address = sock.accept()
        start_new_thread(Main, (connection, client_address))
    except KeyboardInterrupt:
        print("Shutting down on keyboard interrupt.")
        exit()
    except Exception:
        print("Unexpected error, closing the connection.")

sock.close()

  
  




    
    