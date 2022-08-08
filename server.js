const express = require('express');
const app = express();
const render = require('./dist/umi.server');
const fs = require('fs');
const path = require('path');

const port = 8520;

const domain = 'http://localhost';

const sendStream = async (res, req, extname, filePath) => {
  console.log('filePath', filePath, 'extname', extname);
  if (!fs.existsSync(filePath)) return;
  let stream = null;
  let responseData = []; //存储文件流
  switch (extname) {
    case '.css':
      res.setHeader('Content-Type', 'text/css');
      stream = fs.createReadStream(filePath);

      if (stream) {
        //判断状态
        stream.on('data', function (chunk) {
          res.write(chunk);
        });
        stream.on('end', function () {
          res.end();
        });
      }
      break;
    case '.js':
      res.setHeader('Content-Type', 'text/javascript');
      stream = fs.createReadStream(filePath);
      responseData = []; //存储文件流
      if (stream) {
        //判断状态
        stream.on('data', function (chunk) {
          res.write(chunk);
        });
        stream.on('end', function () {
          res.end();
        });
      }
      break;
    case '.png':
      res.setHeader('Content-Type', 'image/png');
      stream = fs.createReadStream(filePath);
      responseData = []; //存储文件流
      if (stream) {
        //判断状态
        stream.on('data', function (chunk) {
          res.write(chunk);
        });
        stream.on('end', function () {
          res.end();
        });
      }
      break;
    case '.svg':
      res.setHeader('Content-Type', 'image/svg');
      stream = fs.createReadStream(filePath);
      responseData = []; //存储文件流
      if (stream) {
        //判断状态
        stream.on('data', function (chunk) {
          res.write(chunk);
        });
        stream.on('end', function () {
          res.end();
        });
      }
      break;
    default:
      res.setHeader('Content-Type', 'text/html');
      const context = {};
      const { html, error, rootContainer } = await render({
        // 有需要可带上 query
        path: req.url,
        context,
      });

      res.send(html);
  }
};

const sendFile = async (res, req, extname, filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }
  switch (extname) {
    case '.css':
      res.setHeader('Content-Type', 'text/css');
      res.send(fs.readFileSync(filePath));
      break;
    case '.json':
      res.setHeader('Content-Type', 'application/json');
      res.send(fs.readFileSync(filePath));
      break;
    case '.ico':
      res.setHeader('Content-Type', 'image/png');
      res.send(fs.readFileSync(filePath));
      break;
    case '.js':
      res.setHeader('Content-Type', 'text/javascript');
      res.send(fs.readFileSync(filePath));
      break;
    default:
      res.setHeader('Content-Type', 'text/html');
      const context = {};
      const { html, error, rootContainer } = await render({
        // 有需要可带上 query
        path: req.url,
        context,
      });

      res.send(html);
  }
};
// Express
app.use(async (req, res) => {
  // 或者从 CDN 上下载到 server 端
  // const serverPath = await downloadServerBundle('http://cdn.com/bar/umi.server.js');
  /*
      这里做了路由判断，更好的方案是用nginx配置静态目录（指向build好的目录，如dist）
      或者通过express设置静态目录，umi加入publicPath配置
*/
  console.log('path.extname(req.url)', req.url, path.extname(req.url));
  await sendFile(
    res,
    req,
    path.extname(req.url),
    path.join(__dirname, './dist', req.url),
  );
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on port ${port}, ${domain}:${port}`);
});
