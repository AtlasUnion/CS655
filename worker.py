# -*- coding: utf-8 -*-
"""
William Frazier
TCP Server
CS655
First Programming Assignment
"""

import socket
import sys
from hashlib import md5
import ast
import math
import base64


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


def crack(data):
    print(data)
    data = ast.literal_eval(data)
    pwd_hash = data['hash'] # Placeholder
    start_index = int(data['index'][0])
    end_index = int(data['index'][1])
    while start_index <= end_index:
        pwd_attempt = get_password_at_index(start_index).encode()
        attempt_hash = base64.b64encode(md5(pwd_attempt).digest())
        print(f"attempting {pwd_attempt}: evaluated to {attempt_hash}")
        if attempt_hash == pwd_hash:
            connection.sendall(pwd_attempt)
            return
        start_index+=1
    connection.sendall(b"Not in range")



# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port

port_num = int(sys.argv[1])
#port_num = 58319

#hostname = socket.gethostname()    
#IPAddr = socket.gethostbyname(hostname)  

server_address = ('127.0.0.1', port_num)
print('Starting up on %s port %s' % server_address, file=sys.stderr)
sock.bind(server_address)

# Listen for incoming connections
sock.listen(5)

while True:
    # Wait for a connection
    print('Waiting for a connection',file=sys.stderr)
    connection, client_address = sock.accept()
    try:
       print('connection from', client_address, file=sys.stderr)
       data = ''
       # Receive the data in small chunks and retransmit it
       while True:
           data += connection.recv(16).decode()
           print('received "%s"' % data, file=sys.stderr)
           if data[-3:] == "END":
               print(f"here it's {data}")
               crack(data[:-3])  
               break
       break
   
    finally:
        # Clean up the connection
        connection.close()



    
    