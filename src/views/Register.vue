<template>
  <div class="register">
    <h1 class="register__heading">Регистрация</h1>
    <div class="register__loading" v-if="loading">Загрузка</div>
    <div class="register__error" v-if="hasError">Ой, что то пошло не так</div>
    <form class="register__form" @submit="handleRegister">
      <label class="register__label" for="username-input">Ник</label>
      <input class="register__input" id="username-input" type="text" v-model="usernameInput" required placeholder="Ник">
      <label class="register__label" for="email-input">Почта</label>
      <input class="register__input" id="email-input" type="email" v-model="emailInput" required placeholder="Почта">
      <label class="register__label" for="password-input">Пароль</label>
      <input class="register__input" id="password-input" type="password" v-model="passwordInput" required placeholder="Пароль">
      <button class="register__button" type="submit" :disabled="loading">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      usernameInput: '',
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
    ...mapActions(['register']),
    async handleRegister(event) {
      event.preventDefault()
      try {
        this.loading = true
        this.hasError = false
        const response = await this.register({
          username: this.usernameInput,
          email: this.emailInput,
          password: this.passwordInput
        })
        if (response.message === 'User already exists') {
          throw new Error(response.error)
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
.register {

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