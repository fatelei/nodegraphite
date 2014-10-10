/**
 * Unittest for graphiteclient lib
 *
 * You can the host for your test.
 */

var GraphiteClient = require('../main');
var host = 'localhost';
var port = 2003;

describe('Test graphiteclient', function () {
  var client = null;

  before(function () {
    client = new GraphiteClient(port, host);
  });

  describe('Write data to graphite server', function () {
    it('it should be ok', function (done) {
      client.write({'foo': 23}, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('write ok');
        }
        done();
      });
    });
  });

  after(function () {
    client.close();
  });
});
