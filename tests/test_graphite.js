var GraphiteClient = require("../main");

var client = new GraphiteClient(2003, "192.168.56.102");

if (require.main === module) {
  for (var i = 0; i < 20; i++) {
    (function () {
      client.write({'foo': 23}, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('write ok');
        }
      });
    })(); 
  }
}