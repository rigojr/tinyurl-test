<script setup lang="ts">
import { reactive } from 'vue';

/**
 * The sign in data structure.
 */
type SingInData = {
  name: string;
  password: string;
  location: string;
}

/**
 * The private component properties.
 */
type State = {
  name: string;
  password: string;
  location: string;
  isError: boolean;
  message?: string;
}

/**
 * The available component events.
 */
interface Events {
  (e: 'sign-in', value: SingInData): void;
}

const emits = defineEmits<Events>();

const state = reactive<State>({
  'name': '',
  'password': '',
  'location': '',
  'isError': false,
  'message': undefined
});

/**
 * Indicates whether the name is valid or not.
 */
function isNameValid(): boolean {
  const isValid = state.name.length > 0;

  return isValid;
}

/**
 * Indicates whether the password is valid or not.
 */
function isPasswordValid(): boolean {
  const regEx = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/;

  return state.password.length >= 8 && regEx.test(state.password);
}

/**
 * Cleans up the error-related properties.
 */
function cleanUpError(): void {
  state.isError = false;
  state.message = undefined;
}

/**
 * Cleans up the form-related properties.
 */
function cleanUpForm(): void {
  state.name = '';
  state.password = '';
  state.location = '';
}

/**
 * Builds the form data.
 */
function buildFormData(): SingInData {
  return {
    'name': state.name,
    'password': state.password,
    'location': state.location
  };
}

/**
 * Occurs when the sign in form has being submitted.
 */
function onSubmit(): void {
  cleanUpError();

  if (!isNameValid() || !isPasswordValid()) {
    state.isError = true;
    state.message = 'Please verify name and password...';

    return;
  }

  emits('sign-in', buildFormData());

  cleanUpForm();
  cleanUpError();
}

/**
 * Indicates whether the message is visible or not.
 */
function isMessageVisible(): boolean {
  return state.message !== undefined;
}
</script>

<template>
  <form
    class="sign-in-form"
    @submit.prevent="onSubmit"
  >
    <div class="sign-in-form__entry-wrapper">
      <label
        class="sign-in-form__label"
        for="name"
      >
        Name:
      </label>
      <input
        id="name"
        class="sign-in-form__input sign-in-form__input-name"
        type="text"
        autocomplete="off"
        required
        v-model="state.name"
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
        class="sign-in-form__input sign-in-form__input-password"
        type="password"
        autocomplete="off"
        required
        minlength="8"
        v-model="state.password"
      />
    </div>
    <div class="sign-in-form__entry-wrapper">
      <input
        class="sign-in-form__button"
        type="submit"
        value="Continue"
      />
    </div>
    <div
      v-if="isMessageVisible()"
      class="sign-in-form__message"
      :class="{'sign-in-form__message--error': state.isError}"
    >
      <p>{{ state.message }}</p>
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
    cursor: pointer;
  }
}
</style>