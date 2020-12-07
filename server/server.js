"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var net = require("net");
var carrier = require("carrier");
var readline = require("readline");
var fs = require("fs");
var output_filename = process.argv[2];
// var worker_ips = ["10.10.0.1", "10.10.1.1", "10.10.2.1", "10.10.3.1", "10.10.4.1", "10.10.5.1", "10.10.6.1", "10.10.7.1", "10.10.8.1", "10.10.9.1"]
var worker_ips = ["127.0.0.1"];
var num_worker_to_use = 1;
var worker_port = 1338;
var total_search_space = Math.pow(52, 5);
var num_of_pieces = 1000;
var app = express();
app.listen(8080, function () {
    console.log("Server listening...");
});
var options = {
    root: '.'
};
app.get('/', function (req, res) {
    res.sendFile("./index.html", options);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/processform', function (req, res) {
    console.log(req.body.md5hash);
    var promise = sendRequest(req.body.md5hash);
    promise.then(function (result) {
        console.log(result);
        res.send(result);
    });
});
function sendRequest(md5hash) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var length_of_search_for_each_worker = total_search_space / num_worker_to_use;
                    var piece_counter = 0;
                    var found_password = 0;
                    var socket_list = [];
                    var carrier_list = [];
                    var _loop_1 = function () {
                        start_index = Math.floor((piece_counter) / num_of_pieces * total_search_space);
                        end_index = Math.floor((piece_counter + 1) / num_of_pieces * total_search_space);
                        piece_counter++;
                        string_to_be_send = "{'hash': b'" + md5hash + "', 'index': [" + start_index + "," + end_index + "]}\n";
                        socket = new net.Socket();
                        socket_list.push(socket);
                        socket_list[i].connect(worker_port, worker_ips[i], function () { });
                        var beginTime = Date.now();
                        socket_list[i].write(string_to_be_send);
                        my_carrier = carrier.carry(socket_list[i]);
                        carrier_list.push(my_carrier);
                        j = i;
                        carrier_list[i].on('line', function (line) {
                            // check result
                            if (line == "Fail to find password") {
                                // do nothing
                            }
                            else {
                                var totalTime = Date.now() - beginTime;
                                console.log(totalTime);
                                fs.appendFile(output_filename, totalTime.toString() + "\r\n", function (err) {
                                    if (err)
                                        throw err;
                                });
                                found_password = 1;
                                resolve(line);
                            }
                            // send more piece if any and have not found password
                            if ((piece_counter != num_of_pieces) && (found_password != 1)) {
                                start_index = Math.floor((piece_counter) / num_of_pieces * total_search_space);
                                end_index = Math.floor((piece_counter + 1) / num_of_pieces * total_search_space);
                                piece_counter++;
                                var string_to_be_send = "{'hash': b'" + md5hash + "', 'index': [" + start_index + "," + end_index + "]}\n";
                                socket_list[j].write(string_to_be_send);
                            }
                            else {
                                console.log(j);
                                socket_list[j].write("Closing Connection\n");
                                console.log("Connection closed");
                                socket_list[j].destroy();
                            }
                        });
                    };
                    var start_index, end_index, string_to_be_send, socket, my_carrier, j;
                    for (var i = 0; i < num_worker_to_use; i++) {
                        _loop_1();
                    }
                })];
        });
    });
}
// add/remove workers
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var changeNumofWorkers = function () {
    rl.question("Number of workers to use?", function (num) {
        var requested_num_worker_to_use = parseInt(num);
        if (isNaN(requested_num_worker_to_use)) {
        }
        else if ((requested_num_worker_to_use < 1) || (requested_num_worker_to_use > worker_ips.length)) {
        }
        else {
            num_worker_to_use = requested_num_worker_to_use;
        }
        console.log("Current:" + num_worker_to_use);
        changeNumofWorkers();
    });
};
changeNumofWorkers();
