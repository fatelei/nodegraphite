// node client for graphite

var net = require('net');
var util = require('util');
var events = require('events');

/**
 * GraphiteClient
 * @param {Int}    port The graphite server's port
 * @param {String} host The graphite server's address
 */
function GraphiteClient(port, host) {
  this.host = host;
  this.port = port;
  this.sock = null;
  this.data = [];
  this.isConnected = false;
  events.EventEmitter.call(this);
}

util.inherits(GraphiteClient, events.EventEmitter);

module.exports = GraphiteClient;

/**
 * Connect to server
 */
GraphiteClient.prototype.connect = function () {
  var that = this;
  if (!that.isConnected) {
    that.sock = net.connect({
      port: that.port,
      host: that.host
    });
    that.isConnected = true;

    that.sock.on('end', function () {
      that.isConnected = false;
      that.sock = null;

      // Reconnecting
      setTimeout(function () {
        that.connect();
      }, 1000);
    });

    that.sock.on('error', function (err) {
      that.emit('error', err);

      that.sock.destroy();
      that.sock = null;

      setTimeout(function () {
        that.connect();
      }, 1000);
    });
  }
};


/**
 * Write data to graphite server
 * @param  {Object}   metrics  The data wroten to server
 * @param  {Function} callback The callback function
 */
GraphiteClient.prototype.write = function (metrics, callback) {
  var that = this;
  var timestamp = Date.now();
  var data = '';
  var key = null;
  timestamp = Math.floor(timestamp / 1000);

  for (key in metrics) {
    if (metrics.hasOwnProperty(key)) {
      data += [key, metrics[key], timestamp].join(' ') + '\n';
    }
  }
  that.connect();
  that.sock.write(data, callback);
};


/**
 * Close the connection to graphite server
 */
GraphiteClient.prototype.close = function () {
  var that = this;
  that.sock.destroy();
  that.sock = null;
};

