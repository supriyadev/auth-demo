const mongoose = require('mongoose');
const express=require('express');
const bodyParser= require('body-parser');
const ejs=require('ejs');
const multer=require('multer');
const fs=require('fs');
const path=require('path');

// const upload = multer({ dest: './public/data/uploads/' })
//middele ware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connecting to mongodb 
// mongoose.connect('mongodb://localhost/fileupload')
// .then(()=>console.log('connected to mongodb'))
// .catch(err=> console.error('could not connect'));

 
// Set EJS as templating engine
// app.set('view engine', 'ejs');
// app.set('views','./views');

// app.get('/',(req,res)=>{
//     res.render('index');
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   console.log("filename " + file.originalname);
    //   cb(null,file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single("file");
//   console.log(storage);
  app.post('/uploadphoto',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.send("File is uploaded");
    });
    
});
// app.post("/uploadphoto", async (req,res)=>{
//     try{
//         let user = await File.findOne({ img: req.body.img });
//        await upload(req,res);
//        if(req.file == undefined ) {return res.status(400).send("bad request")}
//        res.status(200).send("file upload sucessfully");
//     }catch(err){

//     }
  
    // var img = fs.readFileSync(req.file.path);
    // console.log(img);
    // var encode_img = img.toString('base64');
    // var final_img = {
    //     contentType:req.file.mimetype,
    //     image:Buffer.from(encode_img,'base64')
        
    // };
    // File.create(final_img,function(err,result){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         // console.log(result.img.Buffer);
    //         console.log("Saved To database");
    //         res.contentType(final_img.contentType);
    //         res.send(final_img.image);
    //     }
    // })
// });
// connceting to browser 
app.listen(port,()=>console.log(`listen to port ${port}..`) );


