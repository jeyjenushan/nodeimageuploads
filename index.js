const express=require("express")
const app=express();
const path=require("path")
const multer=require("multer")

//we set like a form inside the views folder
app.set('views',path.join(__dirname,"views"));
app.set('view engine',"ejs")


var storage=multer.diskStorage({//it returns storage engine

    destination:(req,file,cb)=>{
        //some logic work
        //last
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{

     cb(null,file.fieldname + '_' +Date.now() + path.extname(file.originalname))
    }
}

)

let maxSize=1*1000*1000

let upload=multer({
    storage:storage,
    limits:{
        fileSize:maxSize
    },
    fileFilter:(req,file,cb)=>{//it can be validate the fie type
var filetypes=/jpeg|jpg|png/
let mimetype=filetypes.test(file.mimetype)//eg image/jpeg
let extname=filetypes.test(path.extname(file.originalname).toLowerCase())

if(mimetype && extname){
    return cb(null,true);
}
cb("Error: File upload only supports the following filwetypes"+filetypes);


    }
}).single("mypic")

app.get("/",(req,res,next)=>{
    res.render("signup")
})
app.post("/upload",(req,res,next)=>{
upload(req,res,function(err){
if(err){
    if(err  instanceof multer.MulterError && err.code=="LIMIT_FILE_SIZE"){
    return res.send("File size should be maximum is 2mb");
    }
}
else{
    res.send("Success image uploaded")
}
})
})





app.listen(4000)