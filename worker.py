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

# Some threading code from 
    # https://www.geeksforgeeks.org/socket-programming-multi-threading-python/
    # https://www.youtube.com/watch?v=FKlmAkEb40s


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


def crack(data, connection):
    data = ast.literal_eval(data) # Turn the string into a dictionary
    pwd_hash = data['hash'] # Placeholder
    start_index = int(data['index'][0])
    end_index = int(data['index'][1])
    print(pwd_hash)
    while start_index < end_index:
        pwd_attempt = get_password_at_index(start_index).encode() 
        attempt_hash = base64.b64encode(md5(pwd_attempt).digest())
#        print(f"attempting {pwd_attempt}: evaluated to {attempt_hash}")
        if attempt_hash == pwd_hash:
            connection.sendall(pwd_attempt + b'\n')
            return
        start_index+=1
    connection.sendall(b"Fail to find password\n")



## Create a TCP/IP socket
#sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#
## Bind the socket to the port
#port_num = int(sys.argv[1])
#
#hostname = socket.gethostname()    
#IPAddr = socket.gethostbyname(hostname)  
#
#server_address = (IPAddr, port_num)
#print('Starting up on %s port %s' % server_address, file=sys.stderr)
#sock.bind(server_address)
#
## Listen for incoming connections
#sock.listen(5)
#
#while True:
#    # Wait for a connection
#    print('Waiting for a connection',file=sys.stderr)
#    connection, client_address = sock.accept()
#    try:
#       print('connection from', client_address, file=sys.stderr)
#       data = ''
#       # Receive the data in small chunks
#       while True:
#           data += connection.recv(16).decode()
#           print('received "%s"' % data, file=sys.stderr)
#           if data[-3:] == "END": # END is place holder for something demarcating end of message
#               crack(data[:-3])  
#               break 
#       break
#   
#    finally:
#        # Clean up the connection
#        connection.close()
        
        
#def Main(): 
#    # Create a TCP/IP socket
#    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#    
#    # Bind the socket to the port
#    port_num = int(sys.argv[1])
#    
#    hostname = socket.gethostname()    
#    IPAddr = socket.gethostbyname(hostname)  
#    
#    server_address = (IPAddr, port_num)
#    print('Starting up on %s port %s' % server_address, file=sys.stderr)
#    sock.bind(server_address)
#    
#    # Listen for incoming connections
#    sock.listen(5)
#
#    print("socket is listening") 
#  
#    # a forever loop until client wants to exit 
#    while True: 
#        
#        # establish connection with client 
#        connection, client_address = sock.accept()
#        try:
#           print_lock.acquire()
#           print('connection from', client_address, file=sys.stderr)
#           data = ''
#           # Receive the data in small chunks
#           while True:
#               data += connection.recv(16).decode()
#               print('received "%s"' % data, file=sys.stderr)
#               if data[-3:] == "END": # END is place holder for something demarcating end of message
#                   start_new_thread(crack, (data,connection,))
#                   break 
#           break
#           
#        finally:
#            # Clean up the connection
#            connection.close()
#            
#  
    
def Main(client, connection):  
    ip = connection[0]
    port = connection[1]
    print(f"Connection from {ip} on port {port}")
    data = client.recv(1024)
    if data[-1:] == b'\n':
        crack(data[:-1].decode(), client)
    client.close()
    print(f"Closed connection with {ip} on port {port}")
        
        
# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
port_num = int(sys.argv[1])

hostname = socket.gethostname()    
IPAddr = socket.gethostbyname(hostname)

# IPAddr = 'localhost'  

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
    except Exception:
        print("Unexpected error, closing the connection.")

sock.close()

  
  




    
    