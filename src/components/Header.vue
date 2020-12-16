<template>
  <header class="header">
    <nav class="header__navigation">
      <ul class="header__list">
        <li class="header__item">
          <router-link class="header__link" active-class="header__link--active" exact to="/">Главная</router-link>
        </li>
        <li class="header__item">
          <router-link class="header__link" active-class="header__link--active" to="/posts">Посты</router-link>
        </li>
        <li class="header__item" v-if="!this.$store.getters.isAuthenticated">
          <router-link class="header__link" active-class="header__link--active" to="/register">Регистрация</router-link>
        </li>
        <li class="header__item" v-if="!this.$store.getters.isAuthenticated">
          <router-link class="header__link" active-class="header__link--active" to="/login">Войти</router-link>
        </li>
        <li class="header__item" v-if="this.$store.getters.isAuthenticated">
          <button class="header__link header__link--logout" @click="logout">Выйти</button>
        </li>
        <li class="header__item" v-if="this.$store.getters.isAuthenticated">
          <router-link class="header__link" active-class="header__link--active" :to="`/profile/${this.$store.getters.currentUser._id}`">
            {{ this.$store.getters.currentUser.username }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.header {
  height: $header-height;
  display: flex;
  justify-content: center;
  align-items: center;

  &__navigation {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__list {
    height: 100%;
    list-style: none;
    display: flex;
  }

  &__item {
    height: 100%;
    padding: 0 1rem;
  }

  &__link {
    display: block;
    height: 100%;
    line-height: $header-height;
    text-align: center;
    font-size: 2rem;
    text-decoration: none;
    transition: all .5s;
    color: $main-color;

    &--logout {
      border: none;
      background: transparent;
      cursor: pointer;
      outline: none;
      width: 100%;
    }

    &:hover, &--active {
      color: $warning-color;
    }
  }
}
</style>