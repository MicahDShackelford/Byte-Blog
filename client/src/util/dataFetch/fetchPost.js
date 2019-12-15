const fetchPost = (postId) => {
  return new Promise((resolve, reject) => {
    fetch(`/post/retrieve/${postId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        resolve(res);
      })
  })
}

export default fetchPost;