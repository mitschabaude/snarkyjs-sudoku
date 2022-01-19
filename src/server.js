import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';

let defaultHeaders = {
  'content-type': 'text/html',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
};
let server = http.createServer(async (req, res) => {
  let file = '.' + req.url;
  console.log(file);
  if (file === './') file = './index.html';
  let content;
  try {
    content = await fs.readFile(path.resolve('./public', file), 'utf8');
  } catch (err) {
    res.writeHead(404, defaultHeaders);
    res.write('<html><body>404</body><html>');
    res.end();
    return;
  }

  let extension = path.basename(file).split('.').pop();
  let contentType = {
    html: 'text/html',
    js: 'application/javascript',
  }[extension];
  let headers = { ...defaultHeaders, 'content-type': contentType };

  res.writeHead(200, headers);
  res.write(content);
  res.end();
});
let PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
