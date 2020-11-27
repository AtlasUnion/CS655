# -*- coding: utf-8 -*-
"""
William Frazier
TCP Client
CS655
First Programming Assignment
"""

import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening


port_num = int(sys.argv[2])
#port_num = 58319
host_name = sys.argv[1]
#host_name = 'localhost'

server_address = (host_name, port_num)
print('connecting to %s port %s' % server_address, file=sys.stderr)
sock.connect(server_address)

try:
    
    # Send data
    print('sending: ', end='')
    message = "{'hash': b'/JPSe2O0LRk+fyvduXBZsA==', 'index': [0,250000]}END"
    sock.sendall(message.encode())
    echo = ''
    while echo == '':
        data = sock.recv(16)
        data = data.decode()
        echo += data
        #print('received "%s"' % data, file=sys.stderr)
    print('received "%s"' % echo, file=sys.stderr)

finally:
    print('closing socket', file=sys.stderr)
    sock.close()