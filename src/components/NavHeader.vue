<script setup lang="ts">
/**
 * The component public properties.
 */
interface Props {
  logo: string
  // TODO: should received links as props
}

defineProps<Props>();
</script>

<template>
  <nav class="nav-header">
    <router-link to="/">
      <img
        class="nav-header__logo"
        :src="logo"
        alt="This is a test logo"
      />
    </router-link>
    <div class="nav-header__nav">
      <router-link
        class="nav-header__nav-link"
        to="/"
      >
        Sign In
      </router-link>
      <router-link
        class="nav-header__nav-link"
        to="/articles"
      >
        Articles
      </router-link>
      <router-link
        class="nav-header__nav-link"
        to="/faq"
      >
        FAQ
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.5rem;

  &__logo {
    max-width: 3rem;
  }

  .nav-header__nav-link {
    padding: .75rem;
    margin: 0rem 1rem;

    font-weight: bold;
    color: whitesmoke;
    text-decoration: none;
    background-color: #434099;
    border-radius: 1rem;

    &.router-link-exact-active {
      color: whitesmoke;
      background-color: #2c3e50;
    }
  }
}
</style>