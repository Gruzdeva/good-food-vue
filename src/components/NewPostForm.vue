<template>
  <form class="new-post-form" @submit="createPost">
    <div class="new-post-form__loading" v-if="loading">Загрузка</div>
    <div class="new-post-form__error" v-if="hasError">Ой, что то пошло не так</div>
    <label class="new-post-form__label" for="post-title-input">Название поста</label>
    <input class="new-post-form__input" id="post-title-input" type="text" v-model="titleInput">
    <label class="new-post-form__label" for="post-text-input">Текст поста</label>
    <textarea class="new-post-form__textarea" id="post-text-input" type="text" v-model="textInput"></textarea>
    <button class="new-post-form__button" type="submit">Создать пост</button>
  </form>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'NewPostForm',
  props: {
    user: { 
      type: Object,
      required: true
    }
  },
  data() {
    return {
      titleInput: '',
      textInput: '',
      loading: false,
      hasError: false
    }
  },
  methods: {
    async createPost(event) {
      event.preventDefault()
      try {
        this.loading = true
        this.hasError = false
        const response = await api.createPost({
          title: this.titleInput,
          text: this.textInput,
          authorId: this.user._id
        })
        this.$emit('post-created')
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
.new-post-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  
  &__label {
    font-size: 1.5rem;  
  }

  &__input {
    font-size: 1.5rem;
    font-family: inherit;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  &__textarea {
    font-size: 1.5rem;
    font-family: inherit;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  &__button {
    max-width: 30rem;
    padding: 1rem;
    cursor: pointer;
  }
}
</style>