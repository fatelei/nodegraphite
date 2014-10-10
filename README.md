nodegraphite
============
graphite client for nodejs


Install
============
npm install nodegraphite

Test
============
make test


Events
============
###### error
+	Error object

	When the client socket has some error occured, it emitted



Usage
============
```
var GraphiteClient = require('nodegraphite');
var client = new GraphiteClient(2003, 'localhost');

client.write({foo: 23});
```