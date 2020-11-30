import * as express from "express"
import * as bodyParser from "body-parser"
import { promises } from "fs"

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
        res.send(result)
    })
})


// TODO: use tcp to connect to worker nodes and get results
async function sendRequest(md5hash) {
    const beginTime = Date.now()
    await new Promise(r => setTimeout(r, 200));
    return new Promise((resolve, reject) => {
        const totalTime = Date.now() - beginTime
        console.log("Total time:" + totalTime)
        resolve("Ryan@1997")
    })
}