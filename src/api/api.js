export default {
  fetchPosts: async () => {
    try {
      const response = await fetch('http://localhost:8080/api/post')
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  },
  fetchUsers: async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user')
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  },
  fetchComments: async () => {
    try {
      const response = await fetch('http://localhost:8080/api/comment')
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  },
  register: async (registerData) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
      })
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  },
  login: async loginData => {
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      })
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  },
  createPost: async createPostData => {
    try {
      const response = await fetch('http://localhost:8080/api/post', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createPostData)
      })
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  },
  createComment: async createCommentData => {
    try {
      const response = await fetch('http://localhost:8080/api/comment', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createCommentData)
      })
      return await response.json()
    } catch (e) {
      return {
        error: e.message
      }
    }
  }
}
