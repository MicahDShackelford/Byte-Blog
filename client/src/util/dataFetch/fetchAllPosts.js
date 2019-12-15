const fetchAllPosts = () => {
  return new Promise((resolve, reject) => {
    fetch("/posts/retrieve")
      .then(res => {
        return res.json();
      })
      .then(res => {
        resolve(res.reverse());
      });
  })
}
export default fetchAllPosts;