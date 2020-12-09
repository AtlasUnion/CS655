# CS655

# Design
## Worker side

The worker expects a message of the form "{'hash': base64_encoded_hash, 'index': [start_index,end_index]}\n". For example, "{'hash': b'/JPSe2O0LRk+fyvduXBZsA==', 'index': [0,250000]}\n" looks for a password that hashes to b'/JPSe2O0LRk+fyvduXBZsA==' and will search passwords from index 0 up to but not including 250000.

## Server side expectation for worker
1. Worker should be multi-threaded (otherwise may not be able to handle high volume of request) 
2. Once a worker finish its job, if find a password, send in format: "password\n", if do not find a passsword, send "Fail to find password\n"

# How to deploy code & test
You need to ssh into each machine, clone this repo and cd into CS665. 
## setup.sh
The script in our repo is used to setup software used in this project on the server node. 
```
chmod +x setup.sh
./setup.sh
```
## software needed (if setup.sh does not work)
You will need nodejs, tsc, git, and python3

You will need to install nodejs on server node:
```shell
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Then you have to install tsc
```shell
sudo apt update && sudo apt install node-typescript -y
```

Python should already be avaliable on the node.

## How to edit IP lists and change the chunk size on the server node
To edit the IP list, open the file "server.ts", you will see the following (or something similar) on line 11:
```javascript
var worker_ips = ["127.0.0.1"]
```
Just fill in IPs, seperated by a ",".

To change the chunk size, open the file "server.ts", you will see the following (or something similar) on line 14: 
```javascript
const num_of_pieces = 32000 // defines how many pieces of chunks 52^5 are broken down into
```

After you change either list or chunk size, do the following:
```shell
tsc server.ts
```
The above command will generate server.js from server.ts.

## Without loss
On server
```sh
cd server
node server.js name_of_output_file
```
The server should prompt you a question asking for number of workers to use -- type any number you like and server will print out current number of workers in use. "name_of_output_file" is the filename for recording data you would like to use. (Each line contains a data point with unit millisecond.)

On worker
```sh
python3 worker.py ip_worker_listen_on 1338
```
Worker requires you to input the IP it should listen on. This ip must be the same IP you put in the IP lists on the server node for the worker (i.e., the worker's IP address).
on browser: type http://192.170.230.102:8080 **Be sure to input BASE64 MD5 HASH** -- can use the following website to generate hash: https://approsto.com/md5-generator/.
Here are a few if you'd like a quick copy and paste: uQXHb3gDsdyEo9iVK3rA6g==, sP4RdoesM/L47vEKvcvguA==, JfyW+vB5AgbRGGDo1nWwWA==.

## With loss
To simulate loss, please refer to GENI TCP lab.


### How to test
In browser, after get to the main page, open a console. Type the following:
```javascript
function y() {
    const data = new URLSearchParams(); 
    data.append('md5hash', '9qYmMWfJLehkSsmYs8Tk0Q'); // replace with any hash you like
    fetch('/api/processform', {method: 'post', body: data})
}
```
Press Enter. Then type the following:
```javascript
setInterval(y, 1000) // call function y every 1000 millisecond
```
The above command can simulate #requests/sec via changing the second parameter. To stop browser from sending requests, type the following:
```javascript
clearInterval(some_number) // some_number is generated via calling above command
```

The above is the skeleton of what we used for testing. The actual testing code is in brower_testing_code_bits.js under the testing folder.

# Demo Video
https://www.youtube.com/watch?v=rtT_FkC3KCw&feature=youtu.be
