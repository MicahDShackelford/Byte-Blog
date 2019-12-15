let fetchUser = (username) => {
  return new Promise((resolve,reject) => {
    fetch(`/users/retrieve/${username}`)
      .then((res) => {
        return res.json();
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        // console.log("Error in fetchuser")
      })
  })
}

export default fetchUser;