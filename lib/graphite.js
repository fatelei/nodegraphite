// node client for graphite

var net = require("net");
var util = require("util");
var events = require("events");

function GraphiteClient (host, port) {
  this.host = host;
  this.port = port;
  this.sock = null;
  this.data = [];
  events.EventEmitter.call(this);
}

exports.GraphiteClient = GraphiteClient;

GraphiteClient.prototype.connect = function () {
  var that = this;
  if (!that.sock) {
    that.sock = net.connect({
      port: that.port,
      host: that.host
    });
    that.sock.on("error", function (err) {
      console.log(err);
    });
  } else {
    return;
  }
};

GraphiteClient.prototype.write = function (metrics, callback) {
  var that = this;
  var timestamp = Date.now();
  timestamp = Math.floor(timestamp / 1000);
  var data = "";
  for (var key in metrics) {
    data += [key, metrics[key], timestamp].join(' ') + "\n";
  }
  that.connect();
  that.sock.write(data, "utf-8", callback);
};

GraphiteClient.prototype.end = function () {
  var that = this;
  that.sock.end();
  that.emit("finish");
};

