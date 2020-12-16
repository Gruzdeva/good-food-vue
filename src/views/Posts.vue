<template>
  <div class="posts">
    <h1 class="posts__heading">Посты о правильном питании <span v-if="posts.length > 0">({{ posts.length }})</span></h1>
    <div class="posts__loading" v-if="loading">Загрузка</div>
    <div class="posts__error" v-if="hasError">Ой, что то пошло не так</div>
    <ul class="posts__list">
      <li class="posts__item" v-for="post in posts" :key="post._id">
        <router-link class="posts__link" :to="`/post/${post._id}`" >{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api/api'

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      hasError: false,
      loading: true
    }
  },
  async mounted() {
    try {
      this.loading = true
      const data = await api.fetchPosts()
      if (data.posts) {
        this.posts = data.posts.reverse()
      } else {
        this.hasError = true
      }
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

.posts {
  &__heading {
    font-size: 3rem;
  }

  &__loading {
    font-size: 2rem;
  }

  &__error {
    font-size: 2rem;
  }

  &__list {
    list-style: none;
    margin-top: 2rem;
  }

  &__item {
    &:not(:last-child) {
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: .1rem solid #ccc;
    }
  }

  &__link {
    font-size: 2rem;
    text-decoration: none;
    color: $main-color;
    transition: all .5s;

    &:hover {
      color: $accent-color;
    }
  }
}
</style>