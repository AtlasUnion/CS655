# CS655

# Design
## worker side

Hey, I uploaded the worker in a separate branch. There's another file I was using just for testing, we can remove it from the final build. Currently, the worker expects a message of the form "{'hash': base64_encoded_hash, 'index': [start_index,end_index]}\n". For example, "{'hash': b'/JPSe2O0LRk+fyvduXBZsA==', 'index': [0,250000]}\n" looks for a password that hashes to b'/JPSe2O0LRk+fyvduXBZsA==' and will search passwords from index 0 up to but not including 250000. Format was just something arbitrary and can be easily tweaked, just let me know if you have any changes to it.

## server side expectation for worker
1. worker should be multi-threaded (otherwise may not be able to handle high volume of request) 
2. once a worker finish its job, if find a password, send in format: "password\n", if do not find a passsword, send "Fail to find password\n"

# How to deploy code & test
You need to ssh into each machine and cd into CS665. There are currently 4 workers as I fail to reserve 6-8 workers. (If you feel number of workers not enough, please let me know.)
## Without loss
On server
```sh
cd server
node server.js name_of_output_file
```
The server should prompt you a question asking for number of workers to use -- type any number you like and server will print out current number of workers in use. "name_of_output_file" is the filename for recording data you would like to use. (Each line contains a data point with unit millisecond).

On worker
```sh
python3 worker.py 1338
```
on browser: type http://192.171.20.110:8080/ **Be sure to uinput BASE64 MD5 HASH** -- can use the following website: https://approsto.com/md5-generator/

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
Above command can simulate #requests/sec via changing the second parameter. To stop browser from sending request, type the following:
```javascript
clearInterval(some_number) // some_number is generated via calling above command
```

## With loss
Please refer to GENI TCP lab.

## Graph to produce
### #request/second vs. Average response time (with x # of worker nodes)
We should produce different plots for each number of worker nodes. We need to use four testing functions.

One worker
```javascript
function one() {
    const data = new URLSearchParams(); 
    data.append('md5hash', '/hun8BuxtTyOqQZRVo0PcQ=='); 
    fetch('/api/processform', {method: 'post', body: data})
}
```
Two workers
```javascript
function one() {
    const data = new URLSearchParams(); 
    data.append('md5hash', '/hun8BuxtTyOqQZRVo0PcQ=='); 
    fetch('/api/processform', {method: 'post', body: data})
}

function two() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'Q5rz8L0cMBhz/bFu4J8j3A=='); 
    fetch('/api/processform', {method: 'post', body: data})
}
```
Three workers
```javascript
function one() {
    const data = new URLSearchParams(); 
    data.append('md5hash', '/hun8BuxtTyOqQZRVo0PcQ=='); 
    fetch('/api/processform', {method: 'post', body: data})
}

function two() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'tAMvjAdpAUQzwwkqg3/bAg=='); 
    fetch('/api/processform', {method: 'post', body: data})
}

function three() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'ocXVKZnmNfiqVRx98a74AQ=='); 
    fetch('/api/processform', {method: 'post', body: data})
}
```
Four workers
```javascript
function one() {
    const data = new URLSearchParams(); 
    data.append('md5hash', '/hun8BuxtTyOqQZRVo0PcQ=='); 
    fetch('/api/processform', {method: 'post', body: data})
}

function two() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'Un9AjYn5CMsncOv07Lp4iA=='); 
    fetch('/api/processform', {method: 'post', body: data})
}

function three() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'KGU3NqLAupqzHpW1P6L0Eg==');
    fetch('/api/processform', {method: 'post', body: data})
}

function four() {
    const data = new URLSearchParams(); 
    data.append('md5hash', 'QBXSQnhLdnKIzqFxzVIqbA=='); // replace with any hash you like
    fetch('/api/processform', {method: 'post', body: data})
}
```
***Note*** #requests/second = sum of #requests/second of all functions in each scenario.

### #workers vs. Average response time
I think this graph is unecessary so we should ignore it.

### rate of loss vs. Average response time (Pick any number of worker nodes you like)
Refer to GENI TCP Lab


