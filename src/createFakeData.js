import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `post ${i}`,
    body: `hi i am post #${i}`,
    tags: ['fake', 'data'],
  }));
  Post.insertMany(posts, (error, docs) => {
    console.log(docs);
  });
}
