/**
 * Unittest for graphiteclient lib
 *
 * You can the host for your test.
 */
'use strict';

var assert = require('assert');
var GraphiteClient = require('../index');

describe('Test graphiteclient', function () {
  let client = null;

  beforeAll(function () {
    client = new GraphiteClient(2003, 'localhost');
  });

  describe('Write data to graphite server', function () {
    it('it should be failed', function () {
      client.write({'foo': 23});
    });
  });
});
