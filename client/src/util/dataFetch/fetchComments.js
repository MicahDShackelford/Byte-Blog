const fetchComments = (postId) => {
  return new Promise((resolve, reject) => {
    fetch(`/comments/retrieve/${postId}`)
      .then((res) => {
        return res.json();
      }).then((res) => {
        console.log(res)
        resolve(res);
      })
  });
}

export default fetchComments;