// Dependency-free local static server with byte ranges for video seeking.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.webm':'video/webm','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res) => {
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname)); }
  catch {res.writeHead(400);return res.end('Bad request');}
  if (file !== root && !file.startsWith(root+path.sep)) {res.writeHead(403);return res.end();}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  fs.stat(file,(error,stat) => {
    if(error || !stat.isFile()){res.writeHead(404);return res.end('Not found');}
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    let start=0,end=stat.size-1,code=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match || (!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      if(match[1]) {start=Number(match[1]); if(match[2])end=Math.min(end,Number(match[2]));}
      else start=Math.max(0,stat.size-Number(match[2]));
      if(start>end || start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      code=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=Math.max(0,end-start+1);res.writeHead(code,headers);
    if(req.method==='HEAD'||!stat.size)return res.end();
    fs.createReadStream(file,{start,end}).on('error',()=>res.destroy()).pipe(res);
  });
}).listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log('Boba Planet: http://localhost:'+(process.env.PORT||4173)));
