<template>
  <form class="new-comment-form" @submit="createComment">
    <div class="new-comment-form__loading" v-if="loading">Загрузка</div>
    <div class="new-comment-form__error" v-if="hasError">Ой, что то пошло не так</div>
    <label class="new-comment-form__label" for="comment-text-input">Ваш комментарий</label>
    <textarea class="new-comment-form__textarea" id="comment-text-input" type="text" v-model="textInput"></textarea>
    <button class="new-comment-form__button" type="submit">Оставить комментарий</button>
  </form>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'NewCommentForm',
  props: {
    user: { 
      type: Object,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textInput: '',
      loading: false,
      hasError: false
    }
  },
  methods: {
    async createComment(event) {
      event.preventDefault()
      try {
        this.loading = true
        this.hasError = false
        const response = await api.createComment({
          text: this.textInput,
          postId: this.post._id,
          authorId: this.user._id
        })
        this.$emit('comment-created')
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
.new-comment-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  
  &__label {
    font-size: 1.5rem;  
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