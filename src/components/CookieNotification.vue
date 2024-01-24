<script setup lang="ts">
/**
 * The available component events.
 */
interface Events {
  (e: 'accepted'): void;
  (e: 'rejected'): void;
}

const emits = defineEmits<Events>();
</script>

<template>
  <div class="cookie-notification">
    <button
      class="cookie-notification__button cookie-notification__close-button"
      @click="emits('rejected')"
    >
      X
    </button>
    <p> We use cookies to personalize and improve your experience on our site and to serve you with relevant advertising. Visit our privacy policy for more information on our data collection practices.</p>
    <button
      class="cookie-notification__button cookie-notification__accept-button"
      @click="emits('accepted')"
    >
      Accept
    </button>
  </div>
</template>

<style lang="scss">
.cookie-notification {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: .5rem;
  width: 100%;

  background-color: whitesmoke;

  &__button {
    border: none;
    cursor: pointer;
  }

  &__close-button {
    position: absolute;
    right: 1rem;

    background-color: transparent;
  }

  &__accept-button {
    padding: .5rem;

    border: none;
    border-radius: 1rem;

    font-size: 1rem;
    color: whitesmoke;
    background-color: #434099;
  }
}
</style>