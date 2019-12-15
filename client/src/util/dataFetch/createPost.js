const createPost = (post) => {
  const token = localStorage.getItem("userToken");
  console.log(post)
  return new Promise((resolve,reject) => {
    fetch("/post/create", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
  })
}

export default createPost;