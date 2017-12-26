var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var Photo = require('../models/Photo');

var photos = [];
// photos.push({
//   name : 'img1',
//   path : '../photo/public/images/img1514215356275.png'
// });
// photos.push({
//   name : 'img2',
//   path : 'images/img1514215356275.png'
// });

router.get('/',  function(req, res){
  Photo.find({},function(err,photos){
    if(err){
      return ;
    }
    res.render('photos',{
      title : 'Photos',
      photos : photos
    })
  })
  
})

router.post('/upload',  function(req, res){
  var name = 'img';
  // var name = req.body.name;
  // console.log("name=" + name);
  // var img = req.body;
  // var path = 'photos/' + img; 
  // console.log(path);
  // console.log(req.files.image);

  var form = new formidable.IncomingForm();
  //文件上传 临时文件存放路径 
  form.uploadDir = '../photo/public/images'; 
  //设置编辑
  form.encoding = 'utf-8';        
  //收到上传文件处理完后发出file事件
  // form.on('file',function(name, file){
  //     console.log(name);
  //     console.log(file);
  // })


form.parse(req, function(error, fields, files){
  for(var key in files){
      var file = files[key];
      var fName = 'img' + (new Date()).getTime();
      switch (file.type){
          case "image/jpeg":
              fName = fName + ".jpg";
              break;
          case "image/png":
              fName = fName + ".png";
              break;
          default :
              fName =fName + ".png";
              break;
      }
      var uploadDir = "../photo/public/images/" + fName;
      fs.rename(file.path, uploadDir, function(err) {
          if (err) {
              res.end(err+"\n");
          }
          var path = 'images/' + fName;
          console.log("name=" + name);
          console.log("path=" + path);
          Photo.create({
            name : name,
            path : path
          }, function(err){
            if (err) return;
            
          })
      });
  }
  res.redirect('/');
});

})

router.get('/upload',  function(req, res){
  res.render('upload',{
    title : 'Photo upload'
  })
})

module.exports = router;
