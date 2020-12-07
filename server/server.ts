import * as express from "express"
import * as bodyParser from "body-parser"
import { promises } from "fs"
import * as net from "net"
import * as carrier from "carrier"
import * as readline from "readline"
import * as fs from "fs"

var output_filename = process.argv[2]
var worker_ips = ["10.10.0.1", "10.10.1.1", "10.10.2.1", "10.10.3.1", "10.10.4.1", "10.10.5.1", "10.10.6.1", "10.10.7.1", "10.10.8.1", "10.10.9.1"]
var num_worker_to_use = 1
const worker_port = 1338
const total_search_space = 52**5
const num_of_pieces = 1000

const app = express()
app.listen(8080, () => {
    console.log("Server listening...")
})

let options = {
    root : '.'
}

app.get('/', (req, res) => {
    res.sendFile("./index.html", options)
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/processform', (req, res) => {
    console.log(req.body.md5hash)
    const promise = sendRequest(req.body.md5hash)
    promise.then((result) => {
        console.log(result)
        res.send(result)
    })
})


async function sendRequest(md5hash) {

    return new Promise((resolve, reject) => {
        const length_of_search_for_each_worker = total_search_space/num_worker_to_use;
        var piece_counter = 0
        var found_password = 0
        for (var i = 0; i < num_worker_to_use; i++) {

            var start_index = Math.floor((piece_counter)/num_of_pieces * total_search_space)
            var end_index = Math.floor((piece_counter + 1)/num_of_pieces * total_search_space)
            piece_counter++

            var string_to_be_send = "{'hash': b'" + md5hash + "', 'index': [" + start_index + "," + end_index + "]}\n"
            var socket = new net.Socket()
            socket.connect(worker_port, worker_ips[i], () => {})
            const beginTime = Date.now()
            socket.write(string_to_be_send)
            var my_carrier = carrier.carry(socket)
            my_carrier.on('line', (line) => {

                // check result
                if (line == "Fail to find password") {
                    // do nothing
                } else {
                    const totalTime = Date.now() - beginTime
                    console.log(totalTime)
                    fs.appendFile(output_filename, totalTime.toString() + "\r\n", (err) => {
                        if (err) throw err
                    })
                    found_password = 1;
                    resolve(line)
                }

                // send more piece if any and have not found password
                if ((piece_counter != num_of_pieces) && (found_password != 1)) {
                    start_index = Math.floor((piece_counter)/num_of_pieces * total_search_space) 
                    end_index = Math.floor((piece_counter + 1)/num_of_pieces * total_search_space)
                    piece_counter++

                    var string_to_be_send = "{'hash': b'" + md5hash + "', 'index': [" + start_index + "," + end_index + "]}\n"
                    socket.write(string_to_be_send)
                } else {
                    socket.write("Closing Connection\n")
                    console.log("Connection closed")
                    socket.destroy()
                }
            })
        }
    })
}

// add/remove workers

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var changeNumofWorkers = function () {
    rl.question("Number of workers to use?", function(num) {
        var requested_num_worker_to_use = parseInt(num)
        if (isNaN(requested_num_worker_to_use)) {
            
        } else if ((requested_num_worker_to_use < 1) || (requested_num_worker_to_use > worker_ips.length)) {
            
        } else {
            num_worker_to_use = requested_num_worker_to_use;
        }
        console.log("Current:" + num_worker_to_use)
        changeNumofWorkers()
    })
}

changeNumofWorkers()
