nodegraphite
============
graphite client for nodejs


## Install

```
npm install nodegraphite
```

## Test
```
jasmine
```

## Events

### error

When there is a socket error occurs, the err info will be in event listener.

## APIs

### GraphiteClient

Initialize a new graphite client.

+ port {String}: graphite server port, default is 2003
+ host {String}: graphite server host, default is localhost

#### Usage

```
var GraphiteClient = require('nodegraphite');
var cli = new GraphiteClient();
```

### write

Write metrics data to grapite server.

+ metrics {Object}: data sended to graphite, {metric: value}
+ callback {Function}: optional callback function, the callback function will take two parameters (err, data)

#### Usage

```
cli.once('error', function (err) {
  console.error(err);
});
cli.write({foo: 23});
```

## Debug

If you use `debug` package in your app, you can set `DEBUG=graphite` to debug `nodegraphite`.
