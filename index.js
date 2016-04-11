var async = require('async');
var faker = require('faker');
var agentkeepalive = require('agentkeepalive');
var agent = new agentkeepalive({ maxSockets: 30, maxKeepAliveRequests: 1000000, maxKeepAliveTime: 1000000 });
var nano = require('nano')({ url: 'http://localhost:5984', requestDefaults: { agent : agent } });
var count = 0;

function addPost(DB, callback) {
  var i = 1000;
  var bulkData = [];
  var data = function () {
    return {
      _id      : 'blog-post-' + faker.random.uuid(1),
      title    : faker.lorem.words(2),
      body     : faker.lorem.paragraphs(4),
      type     : 'blog/post',
      createdAt: faker.date.recent()
    };
  };

  while (i--) {
    bulkData.push(data());
  }

  DB.bulk({ docs: bulkData }, {}, function (err, body, header) {
    if (err) {
      console.log('erro blog-post->>> ', err, body, header);
    } else {
      console.log(count += 1000);
    }

    callback();
  });
}

nano.db.create('blog', function () {
  var DB = nano.db.use('blog');

  async.eachLimit(
    new Int8Array(100),
    10,
    function (id, callback) {
      addPost(DB, callback);
    },
    function () {
      console.log('fim!', arguments);
    }
  );
});


