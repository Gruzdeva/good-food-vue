<template>
  <div class="home">
    <h1 class="home__heading">Читать</h1>
    <div class="home__loading" v-if="loading">Загрузка</div>
    <div class="home__error" v-if="hasError">Ой, что то пошло не так</div>
    <ul class="home__list">
      <li class="home__item" v-for="user in users" :key="user._id">
        <router-link class="home__link" :to="`/profile/${user._id}`">{{ user.username }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api'
import utils from '@/utils/utils'

export default {
  name: 'Home',
  data() {
    return {
      users: [],
      loading: false,
      hasError: false
    }
  },
  async mounted() {
    try {
      this.loading = true
      const usersResponse = await api.fetchUsers()
      const postsResponse = await api.fetchPosts()

      if (usersResponse.users) {
        this.users = usersResponse.users.filter(user => utils.getPostsByUserId(user._id, postsResponse.posts).length > 0)
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

.home {
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