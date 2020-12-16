export default {
  getDataById(id, arr) {
    for (let document of arr) {
      if (document._id === id) {
        return document
      }
    }
    
    return {}
  },
  getCommentsForPostById(postId, comments) {
    const commentsToSend = []

    for (let comment of comments) {
      if (comment.post === postId) {
        commentsToSend.push(comment)
      }
    }
    
    return commentsToSend
  },
  getPostsByUserId(userId, posts) {
    return posts.filter(post => post.author === userId)
  }
}
