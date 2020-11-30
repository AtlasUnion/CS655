import * as express from "express"
import * as bodyParser from "body-parser"
import { promises } from "fs"
import * as net from "net"
import * as carrier from "carrier"
import * as readline from "readline"

var worker_ips = ["127.0.0.1"]
var num_worker_to_use = 1
const worker_port = 1337 // TODO: change actual port
const total_search_space = 52**5

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


// TODO: use tcp to connect to worker nodes and get results
async function sendRequest(md5hash) {
    const beginTime = Date.now()
    return new Promise((resolve, reject) => {
        const length_of_search_for_each_worker = total_search_space/num_worker_to_use;
        for (var i = 0; i < num_worker_to_use; i++) {
            var worker_json = {
                hash: md5hash,
                index: [i*length_of_search_for_each_worker, (i+1)*length_of_search_for_each_worker]
            }
            if (i == num_worker_to_use - 1) {
                worker_json.index = [i*length_of_search_for_each_worker, total_search_space]
            }

            var socket = new net.Socket()
            socket.connect(worker_port, worker_ips[i], () => {})
            socket.write(JSON.stringify(worker_json) + "\n")
            var my_carrier = carrier.carry(socket)
            my_carrier.on('line', (line) => {
                if (line == "Fail to find password") {
                    socket.destroy()
                } else {
                    const totalTime = Date.now() - beginTime
                    console.log(totalTime)
                    resolve(line)
                }
            })
        }
    })
}

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
