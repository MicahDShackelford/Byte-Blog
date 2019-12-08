// SEEDING SCRIPT FOR SIMPLE BLOG
// IMPORTANT INFOMATION
// // This script requires faker
// // This script will clear your posts Collection in your database
// // Use at your own risk
// // Console log's may not be appear in order due to the nature of console.log

const Post = require('./post');
const db = require('./database');
const faker = require('faker');

console.log("[Seed] Welcome to the Simple-Blog seeding script")

let clearDB = (posts) => {
  console.log("[Seed] Deleteing existing entries");
  let postLen = posts.length;
  posts.forEach((post, i) => {
    Post.deleteOne({id: post.id}, () => {
      console.log(`[Seed] Deleting post (${i+1}/${postLen})`);
    });
  });
  console.log("[Seed] Existing entries have been cleared");
}

let seedDB = () => {
  console.log("[Seed] Populating database with fake data");
  for(var i = 0; i < 50; i++) {
    console.log(`[Seed] Creating post (${i+1}/${50})`);
    let post = new Post({
      id: i,
      title: faker.lorem.words(),
      author: faker.name.findName(),
      postedTime: faker.date.past(),
      post: (faker.lorem.paragraphs() + "\n" +
            faker.lorem.paragraphs() + "\n" +
            faker.lorem.paragraphs() + "\n" +
            faker.lorem.paragraphs() + "\n" +
            faker.lorem.paragraphs() + "\n")
    });
    post.save();
  }
  console.log("[Seed] Your database has been seeded, [Ctrl+C] to close this script");
}

Post
.find({})
.then((res) => {
    if(res.length > 0) {
      console.log("[Seed] Existing entries found");
      clearDB(res);
      setTimeout(() => {
        seedDB()
      }, 250);
    } else {
      seedDB()
    }
  });