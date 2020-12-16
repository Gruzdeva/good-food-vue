<template>
  <div class="profile">
    <h1 class="profile__heading">{{ this.user.username}} <span v-if="pageOfAuthenticatedUser">(Вы)</span></h1>
    <div class="profile__loading" v-if="loading">Загрузка</div>
    <div class="profile__error" v-if="hasError">Ой, что то пошло не так</div>
    <NewPostForm v-if="pageOfAuthenticatedUser" :user="user" @post-created="handleCreatePost" />
    <ul class="profile__list">
      <li class="profile__item" v-for="post in posts" :key="post._id">
        <router-link class="profile__link" :to="`/post/${post._id}`" >{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api'
import utils from '@/utils/utils'
import NewPostForm from '../components/NewPostForm.vue'

export default {
  name: 'Profile',
  components: {NewPostForm},
  computed: {
    pageOfAuthenticatedUser() {
      if (!this.user._id || !this.$store.getters.isAuthenticated) {
        return false
      }
      
      return this.user._id === this.$store.getters.currentUser._id
    }
  },
  data() {
    return {
      user: {},
      posts: [],
      loading: false,
      hasError: false
    }
  },
  methods: {
    async handleCreatePost() {
      try {
        this.loading = true
        const userId = this.$route.params.userId
        const postsResponse = await api.fetchPosts()
        this.posts = utils.getPostsByUserId(userId, postsResponse.posts)
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
      const userId = this.$route.params.userId
      const usersResponse = await api.fetchUsers()
      const postsResponse = await api.fetchPosts()
      this.user = utils.getDataById(userId, usersResponse.users)
      this.posts = utils.getPostsByUserId(userId, postsResponse.posts)
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

.profile {
  &__heading {
    font-size: 3rem;
  }

  &__list {
    list-style: none;
    margin-top: 4rem;
  }

  &__link {
    display: block;
    font-size: 2rem;
    padding: 1rem;
    color: $main-color;
    text-decoration: none;
    cursor: pointer;
    transition: all .5s;

    &:hover {
      background-color: $accent-color;
      color: white;
    }
  }
}
</style>
