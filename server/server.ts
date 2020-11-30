import * as express from "express"
import * as bodyParser from "body-parser"
import { promises } from "fs"
import * as net from "net"
import * as carrier from "carrier"

var worker_ips = ["127.0.0.1"]
const worker_port = 1337

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
        for(let ip of worker_ips) {
            var socket = new net.Socket()
            socket.connect(worker_port, ip, () => {console.log("Connected")})
            var my_carrier = carrier.carry(socket)
            my_carrier.on('line', (line) => {
                if (line == "Fail to find password") { // replace with something cannot be password
                    socket.destroy()
                } else {
                    const totalTime = Date.now() - beginTime
                    console.log("Total time:" + totalTime)
                    resolve(line)
                }
            })
        }
    })
}