var gulp = require('gulp');
var fs = require('fs');
var url = require('url');
var path = require('path');
var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            port:'9999',
            directoryListing: {
                path: './index.html',
                enable: true
            },
            open: true,
            middleware: function (req, res, next) {
                res.writeHead(200,{
                    'Access-Control-Allow-Origin':'*'
                });
                var urlObj = url.parse(req.url).query;
                var address = path.join(__dirname,urlObj+'.json');
                fs.exists(address,function(exists){
                    if(!exists){
                        res.end('地址不存在');
                    }else{
                        fs.readFile(address,function(err,sj){
                            if(err)return console.log(err);
                            res.end(sj.toString());
                        });
                    }
                });
            }
        }));
});