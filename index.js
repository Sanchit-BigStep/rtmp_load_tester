const ffmpeg = require('fluent-ffmpeg');

var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
}).listen(9615);

const load = 10;

const start = (i) => {
    const command = ffmpeg('./s1.mp4')
        .inputOptions('-stream_loop -1')
        .output('rtmp://rtmp-dev.channelize.io/live/testing_' + i)
        .outputOptions([
            '-vcodec libx264',
            '-preset:v ultrafast',
            '-acodec aac',
            '-f flv'
        ])
        .on('error', function (err, stdout, stderr) {
            console.log('err', err)
        })
        .on('end', function () {
            console.log('end');
        })


    command.run();
}

for (let i = 0; i < load; i++) {
    start(i);
}