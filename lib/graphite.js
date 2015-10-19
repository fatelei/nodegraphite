// node client for graphite
'use strict';

var EventEmitter = require('events').EventEmitter;
var net = require('net');
var util = require('util');

var debug = require('debug')('graphite');


/**
 * GraphiteClient
 * @param {Int}    port The graphite server's port
 * @param {String} host The graphite server's address
 */
class GraphiteClient extends EventEmitter {
  constructor(port, host) {
    super();
    this.port = parseInt(port || 2003, 10);
    this.host = host || 'localhost';
    this.sock = null;
    this.isConnected = false;
    this.callbacks = [];
  }

  /**
   * Connect graphite server.
   * @private method
   */
  connect() {
    let self = this;
    if (!this.isConnected) {
      this.sock = net.connect({
        port: this.port,
        host: this.host
      }, function () {
        debug("connect to graphite server successfully");
      });
      this.isConnected = true;

      // Add socket event listener.
      this.sock.once('error', function (err) {
        debug(err);
        self.sock.destroy();
        self.isConnected = false;

        self.emit('error', err);
      });

      this.sock.once('end', function () {
        self.sock.end();
        self.isConnected = false;
      });
    }
  }

  /**
   * Write data to graphite server.
   * @public method
   * @param {Object} metrics: send to graphite server
   * @param {Function} callback: optional callback method
   */
  write(metrics, callback) {
    let timestamp = Date.now();
    let msg = '';
    timestamp = Math.floor(timestamp / 1000);

    if (!this.isConnected) {
      this.connect();
    }

    for (let key in metrics) {
      if (metrics.hasOwnProperty(key)) {
        msg += [key, metrics[key], timestamp].join(' ') + '\n';
      }
    }
    
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }

    this.sock.write(msg, function () {
      console.log("successfully write data to graphite server");
    });
  }
}

module.exports = GraphiteClient;
