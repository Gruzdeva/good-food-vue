<template>
  <div class="post">
    <div class="post__loading" v-if="loading">Загрузка</div>
    <div class="post__error" v-if="hasError">Ой, что то пошло не так</div>
    <h1 class="post__heading">{{ post.title }}</h1>
    <div class="post__user-info">
      <span class="post__username">{{ author.username }}</span>
      <span class="post__email">{{ author.email }}</span>
    </div>
    <div class="post__text">{{ post.text }}</div>
    <div class="post__comments">
      <h2 class="post__comments-heading">Комментарии</h2>
      <NewCommentForm :post="post" :user="this.$store.getters.currentUser" v-if="this.$store.getters.isAuthenticated" @comment-created="handleNewCommentCreated" />
      <ul class="post__comments-list">
        <li class="post__comments-item" v-for="comment in comments" :key="comment._id">{{ comment.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../api/api'
import NewCommentForm from '../components/NewCommentForm.vue'
import utils from '../utils/utils'

export default {
  components: { NewCommentForm },
  name: 'Post',
  data() {
    return {
      post: {},
      author: {},
      comments: [],
      loading: false,
      hasError: false
    }
  },
  methods: {
    async handleNewCommentCreated() {
      try {
      this.loading = true
      const postId = this.$route.params.postId
      const allCommentsResponse = await api.fetchComments()
      this.comments = utils.getCommentsForPostById(this.post._id, allCommentsResponse.comments)
    } catch (e) {
      this.hasError = true
    } finally {
      this.loading = false
    }
    }
  },
  async mounted() {
    try {
      this.loading = true
      const postId = this.$route.params.postId
      const allPostsResponse = await api.fetchPosts()
      const allUsersResponse = await api.fetchUsers()
      const allCommentsResponse = await api.fetchComments()

      this.post = utils.getDataById(postId, allPostsResponse.posts)
      this.author = utils.getDataById(this.post.author, allUsersResponse.users)
      this.comments = utils.getCommentsForPostById(this.post._id, allCommentsResponse.comments)
    } catch (e) {
      this.hasError = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

.post {
  &__heading {
    font-size: 4rem;
  }

  &__loading {
    font-size: 2rem;
  }

  &__error {
    font-size: 2rem;
  }

  &__user-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  &__username {
    font-size: 2rem;
  }

  &__email {
    font-size: 1.5rem;
  }

  &__text {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  &__comments-heading {
    font-size: 2rem;
  }

  &__comments-list {
    list-style: none;
    margin-top: 2rem;
  }

  &__comments-item {
    font-size: 1.5rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>