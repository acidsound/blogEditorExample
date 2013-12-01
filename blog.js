if (Meteor.isClient) {
  Template.post.rendered= function() {
    var editor = new MediumEditor('.editable');
    $('.editable').mediumImages({'uploadScript': 'upload'});
  }
}

if (Meteor.isServer) {
  var mime = Meteor.require('mime');
  var fs = Npm.require('fs');
  WebApp.connectHandlers.use(function(req, res, next) {
    if (req.url==='/upload') {
      console.log(this.request.files.file.path);
      var uploadPath = this.request.files.file.path;
      res.end(
        'data:'+mime.lookup(uploadPath)+';base64,'+
          ((Meteor._wrapAsync(fs.readFile))(uploadPath)).toString("base64")
      );
    } else {
      next();
    }
  });
}