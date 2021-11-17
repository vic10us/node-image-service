var http = require("http");
var port = process.env.PORT || 3000;

var options = {
  host: "localhost",
  port: port,
  timeout: 2000,
  path: "/lorembarnak"
};
var request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode >= 200 && res.statusCode < 300) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});
request.on("error", function (err) {
  console.log("ERROR");
  process.exit(1);
});
request.end();