var async   = require('async');
var faker   = require('faker');
var nano    = require('./connection');
var count   = 0;
var userIds = [];


function addUsers(DB, callback) {
  var i = 100;
  var bulkData = [];
  var userId   = '';

  var data = function () {
    userId = 'user-' + faker.random.uuid(1);

    return {
      _id      : userId,
      name     : faker.name.findName(),
      email    : faker.internet.email(1)
    };
  };

  while (i--) {
    bulkData.push(data());
  }

  DB.bulk({ docs: bulkData }, {}, function (err, body, header) {
    if (err) {
      console.log('erro user->>> ', err, body, header);
    } else {
      userIds.push(userId);
    }

    callback();
  });
}

function addPost(DB, callback) {
  var i = 1000;
  var bulkData = [];
  var data = function () {
    return {
      _id      : 'blog-post-' + faker.random.uuid(1),
      title    : faker.lorem.words(2),
      author   : faker.random.arrayElement(userIds),
      body     : faker.lorem.paragraphs(4),
      type     : faker.random.arrayElement(['blog/post', 'blog/article']),
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

  addUsers(DB, function () {
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
});


