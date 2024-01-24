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
      class="cookie-notification__close-button"
      @click="emits('rejected')"
    >
      X
    </button>
    <p> We use cookies to personalize and improve your experience on our site and to serve you with relevant advertising. Visit our privacy policy for more information on our data collection practices.</p>
    <div class="cookie-notification__button-container">
      <button
        class="cookie-notification__accept-button"
        @click="emits('accepted')"
      >
        Accept
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.cookie-notification {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: .5rem;

  background-color: whitesmoke;

  &__close-button {
    position: absolute;
    right: .5rem;

    border: none;
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