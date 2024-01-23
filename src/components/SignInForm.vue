<script setup lang="ts">
import { reactive } from 'vue';

/**
 * The private component properties.
 */
type State = {
  city: string;
}

const state = reactive<State>({
  'city': ''
});
</script>

<template>
  <form class="sign-in-form">
    <div class="sign-in-form__entry-wrapper">
      <label
        class="sign-in-form__label"
        for="name"
      >
        Name:
      </label>
      <input
        id="name"
        class="sign-in-form__input"
        type="text"
      />
    </div>
    <div class="sign-in-form__entry-wrapper">
      <label
        class="sign-in-form__label"
        for="password"
      >
        Password:
      </label>
      <input
        id="password"
        class="sign-in-form__input"
        type="password"
      />
    </div>
    <div class="sign-in-form__entry-wrapper">
      <input
        class="sign-in-form__button"
        type="button"
        value="Continue"
      />
    </div>
  </form>
</template>

<style lang="scss">
.sign-in-form {
  width: 100%;
  max-width: 20rem;
  margin: 5rem auto;

  &__entry-wrapper {
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
  }

  &__label {
    text-align: left;
    font-weight: bold;
  }

  &__button {
    max-width: 10rem;
    padding: .75rem;

    border: none;
    border-radius: 1rem;

    font-weight: bold;
    font-size: 1rem;
    color: whitesmoke;
    background-color: #434099; // TODO: Repeated settings should be added to ITCSS.
  }
}
</style>