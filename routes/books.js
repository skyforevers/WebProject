var express = require('express'),
    Book = require('../models/Book'),
    Post = require('../models/Post'),
    User = require('../models/User');
var router = express.Router();

// navigation 에서 예약 리스트 호출
router.get('/bookList', function(req, res, next) {
    Book.find({}, function(err, books) {
        if (err) {
            return next(err);
        }
        res.render('books/bookList', {books : books});
    });
});

router.get('/:id/postshow', function(req, res, next) {
    Book.findById({_id: req.params.id}, function(err, book) {
        if (err) {
            return next(err);
        }
        Post.findOne({title: book.title}, function(err, post) {
            if (err) {
                return next(err);
            }
            res.render('posts/show', {post : post});
        });
    });
        
});

// 첫 화면에서 게시판을 누른 뒤 index 페이지를 호출
router.get('/', function(req, res, next){
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

// 예약하기를 눌렀을 때 예약기능으로 들어감
router.get('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    User.findById({_id: req.params.id}, function(err, user) {
      res.render('books/index', {post : post , user : user});
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

// 예약을 수락함
router.put('/:id/agree', function(req, res, next) {
  Book.findById({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
    book.status= "agree";
    book.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '예약을 수락하였습니다');
      res.redirect('/books/bookList');
    });
  });
});

// 예약을 거절함
router.put('/:id/reject', function(req, res, next) {
  Book.findOneAndRemove({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
    book.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '예약을 거절 하였습니다');
      res.redirect('/books/bookList');
    });
  });
});

// 예약을 거절함
router.put('/:id/cancle', function(req, res, next) {
  Book.findOneAndRemove({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
    book.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '예약을 취소하였습니다');
      res.redirect('/books/bookList');
    });
  });
});


// 예약을 저장하는 기능
router.post('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
      if (err) {
          return next(err);
      }
      User.findOne({email: req.body.customerEmail}, function(err, user) {
        if (err) {
            return next(err);
        }
        var newBook = new Book({
            hostEmail: post.email,
            customerEmail: req.user.email,
            name: req.user.name,
            address: post.address + post.address2,
            pay: post.pay,
            dateFirst: req.body.dateFirst,
            dateLast: req.body.dateLast,
            title: post.title
        });

        newBook.save(function(err) {
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
