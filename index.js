const url = require('url');
const http = require('http');
const fs = require('fs');

const notFoundPage = fs.readFileSync('./404.html', (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = `.${pathname == '/' ? '/index' : pathname}.html`;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(notFoundPage);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  })
  .listen(8080);
