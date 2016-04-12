var nano = require('./connection');
var DB = nano.db.use('blog');

var views = {
  _id      : "_design/by_type",
  language : "javascript",
  views    : {
    all_posts: {
      map: "function(doc) { if (doc.type === 'blog/post') emit(doc._id, null) }",
      reduce : "_count"
    },
    all_articles: {
      map: "function(doc) { if (doc.type === 'blog/article') emit(doc._id, null) }",
      reduce: "_count"
    }
  }
};

DB.insert(views, function (err, body, header) {
  if (err) {
    console.log('erro _design/posts_by_type>>> ', err, body, header);
  } else {
    console.log('Post Views OK!');
  }
});
