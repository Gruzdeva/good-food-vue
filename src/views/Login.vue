<template>
  <div class="login">
    <h1 class="login__heading">Войти</h1>
    <div class="login__loading" v-if="loading">Загрузка</div>
    <div class="login__error" v-if="hasError">Ой, что то пошло не так</div>
    <form class="login__form" @submit="handleLogin">
      <label class="login__label" for="email-input">Почта</label>
      <input class="login__input" id="email-input" type="email" v-model="emailInput" required placeholder="Почта">
      <label class="login__label" for="password-input">Пароль</label>
      <input class="login__input" id="password-input" type="password" v-model="passwordInput" required placeholder="Пароль">
      <button class="login__button" type="submit" :disabled="loading">Войти</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      emailInput: '',
      passwordInput: '',
      loading: false,
      hasError: false
    }
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin(event) {
      event.preventDefault()
      try {
        this.loading = true
        this.hasError = false
        const response = await this.login({
          email: this.emailInput,
          password: this.passwordInput
        })
        if (response.user) {
          this.$router.push('/')
        }
      } catch (e) {
        this.hasError = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {

  &__heading {
    font-size: 3rem;
  }

  &__loading {
    font-size: 2rem;
  }

  &__error {
    font-size: 2rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    max-width: 50rem;
    margin: auto;
  }

  &__label {
    font-size: 1.5rem;
  }

  &__input {
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  &__button {
    padding: 1rem 0;
    cursor: pointer;
  }
}
</style>