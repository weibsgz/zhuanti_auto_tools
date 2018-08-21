let path = require('path');
let fs=require('fs');

let http = require('http');

let express = require('express');

let bodyParser = require('body-parser');

let multer = require('multer');

let tempSrc=[];

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname,'./uploads/'))
    },
    filename: function (req, file, cb) {
        let temp=file.originalname.split('.');
        let fileName=file.fieldname + '-' + Date.now()+'.'+temp[temp.length-1];
        tempSrc.push('http://localhost:3031/static/'+fileName);
        cb(null, fileName)
    }
});

let uploader = {
    storage: storage,
    limits: {
        fileSize: 10*1024*1024,
        files: 3
    },
    fileFilter: function (req, file, cb) {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        // To reject this file pass `false`, like so:
        //cb(null, false);

        // To accept the file pass `true`, like so:
        cb(null, true);

        // You can always pass an error if something goes wrong:
        //cb(new Error('I don\'t have a clue!'))
    }
};


let uploads=multer(uploader).array('file', 100);


let uploaderVideo = {
    storage: storage,
    limits: {
        fileSize: 10*1024*1024,
        files: 3
    },
    fileFilter: function (req, file, cb) {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        // To reject this file pass `false`, like so:
        //cb(null, false);

        // To accept the file pass `true`, like so:
        cb(null, true);

        // You can always pass an error if something goes wrong:
        //cb(new Error('I don\'t have a clue!'))
    }
};

let uploadsVideo=multer(uploaderVideo).array('xtv', 5);

let app = express();

app.use(require('morgan')('short'));
app.use('/static',express.static(path.resolve(__dirname,'./uploads/')));
app.use('/extern',express.static(path.resolve(__dirname,'./extern/')));
app.use('/src',express.static(path.resolve(__dirname,'./src/')));
app.use('/assets',express.static(path.resolve(__dirname,'./assets/')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


// ************************************
// This is the real meat of the example
// ************************************
(function () {

    // Step 1: Create & configure a webpack compiler
    let webpack = require('webpack');
    let webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
    let compiler = webpack(webpackConfig);
    //let router=express.Router();

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000, reload: true
    }));
})();

// Do anything you like with the rest of your express application.

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get("/view", function (req, res) {
    res.sendFile(__dirname + '/view.html');
});

/*------------------测试接口------------------*/



app.post('/upload', function (req, res, next) {
    //req.files;

    uploads(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err.code,'xxxxx');
            if(err.code==='LIMIT_FILE_SIZE'){
                res.status(200).json({"status": "0", "msg": "文件大小超出"});
            }
            return
        }
        res.status(200).json({"status": "success","code":1, "msg": "成功","image_url":tempSrc.length<2?tempSrc[0]:tempSrc});
        tempSrc=[];
        // Everything went fine
    });

});

app.post('/view',function(req,res){
    let str=req.body.html;
    fs.writeFile('./view.html', str,function(err){
        if(err){
            return res.status(200).json({"status":"保存失败"});
        }
        res.status(200).json({"status": "success","code":1, "msg": "成功"});
    });

});




app.post('/deleteDraft|clearDraft|log$/',function(req,res){
    res.status(200).json({"status":Math.random() * 10 < 9 })
});



/*------------------测试接口------------------*/

if (require.main === module) {
    let server = http.createServer(app);
    server.listen(process.env.PORT || 3031, function () {
        console.log("Listening on %j", server.address());
    });
}