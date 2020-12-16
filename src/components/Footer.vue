<template>
  <footer class="footer">
    <ul class="footer__list">
      <li class="footer__item">
        <a class="footer__link" href="https://vk.com/8valeryanka8" target="_blank">Автор</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.footer {
  height: $footer-height;
  display: flex;
  justify-content: center;
  align-items: center;

  &__list {
    height: 100%;
    list-style: none;
    display: flex;
  }

  &__item {
    height: 100%;
    width: 9rem;
  }

  &__link {
    display: block;
    height: 100%;
    font-size: 1.5rem;
    text-decoration: none;
    text-align: center;
    line-height: $footer-height;
    transition: all .5s;
    color: $main-color;

    &:hover {
      color: $accent-color;
    }
  }
}
</style>
