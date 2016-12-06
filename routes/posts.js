var express = require('express'),
    Post = require('../models/Post'),
    User = require('../models/User');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

// 첫 화면에서 게시판을 누른 뒤 index 페이지를 호출
router.get('/', needAuth, function(req, res, next){
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts : posts} );
  });
});

// 글 작성을 누를때 새로 작성하는 edit.jade를 호출
router.get('/new', function(req, res, next) {
  Post.find({}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post : post});
  });
});

// 게시글 제목을 눌렀을 때 게시글을 볼 수 있게 해주고 조회수를 증가시키는 기능
router.get('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read++;
    res.render('posts/show', {post : post});
    post.save(function(err) {
    if(err) {
      return next(err);
    }
    });
  });
});

// 게시글 수정을 눌렀을 때 edit 메소드로 연결시켜주는 기능
router.get('/:id/edit', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post : post});
  });
});

// 게시글을 삭제하는 기능
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

// 게시글을 수정하는 기능
router.put('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post.password !== req.body.current_password) {
      req.flash('danger', '비밀번호 틀림');
    }
    post.email = req.body.email;
    post.title = req.body.title;
    post.content = req.body.content;

    post.save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts');
    });
  });
});

// 게시글을 새로 작성하는 기능
router.post('/', function(req, res, next) {
  User.find({}, function(err, user) {
    Post.find({}, function(err, post) {
      if (err) {
        return next(err);
      }
      var newPost = new Post({
        email: user.email,
        title: req.body.title,
        content: req.body.content,
        city: req.body.city,
        address: req.body.address,
        infra: req.body.infra,
        rule: req.body.rule
      });

      newPost.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.redirect('/posts');
        }
      });
    });
  });
});

module.exports = router;