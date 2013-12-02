if (Meteor.isClient) {
  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.map(function() {
    this.route('post', {
      path: '/',
      template: 'post'
    });
  });
  Template.post.rendered= function() {
    var editor = new MediumEditor('.editable');
    $('.editable').mediumImages({'uploadScript': 'upload'});
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Router.map(function() {
    this.route('upload', {
      where: 'server',
      path: '/upload',
      action: function() {
        console.log(this.request.files.file.path);
        var uploadPath = this.request.files.file.path;
        var mime = Meteor.require('mime');
        var fs = Npm.require('fs');
        this.response.end(
          'data:'+mime.lookup(uploadPath)+';base64,'+
            fs.readFileSync(uploadPath).toString("base64")
        );
      }
    })
  });
}