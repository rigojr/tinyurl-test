<script setup lang="ts">
import _ from 'lodash';
import { ComputedRef, computed, nextTick, reactive } from 'vue';

/**
 * The sign in data structure.
 */
export type SingInData = {
  name: string;
  password: string;
  location: string;
}

/**
 * The component public properties.
 */
export interface Props {
  suggestions: string[];
  isSearching: boolean;
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
  isDropdownOpen: boolean;
}

/**
 * The available component events.
 */
interface Events {
  (e: 'sign-in', value: SingInData): void;
  (e: 'search', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  'suggestions': () => []
});

const emits = defineEmits<Events>();
const state = reactive<State>({
  'name': '',
  'password': '',
  'location': '',
  'isError': false,
  'message': undefined,
  'isDropdownOpen': false
});

const searchLocation = _.debounce(() => {
  if (state.location === '') {
    return;
  }

  emits('search', state.location);
}, 500);

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
 * Indicates whether the message is visible or not.
 */
function isMessageVisible(): boolean {
  return state.message !== undefined;
}

/**
 * Indicates whether suggestions are visible or not.
 */
const isSuggestionsVisible = computed(() => props.suggestions.length > 0 && state.isDropdownOpen);

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
 * Occurs when a suggestions has being clicked.
 *
 * @param suggestion The clicked suggestion.
 */
function onSuggestionClicked(suggestion: string): void {
  state.location = suggestion;
  state.isDropdownOpen = false;
}

// FIXME: close dropdown could be improve.

/**
 * Occurs when location input has being changed.
 */
function onInputLocation(): void {
  searchLocation();
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
    <div class="sign-in-form__entry-wrapper sign-in-form__suggestion-wrapper">
      <label
        class="sign-in-form__label"
        for="location"
      >
        Location:
        <img
          v-if="props.isSearching"
          class="sign-in-form__label-image"
          src="@/assets/loading.svg"
          alt="loading image"
        />
      </label>
      <input
        id="location"
        class="sign-in-form__input-location"
        type="text"
        autocomplete="off"
        required
        v-model="state.location"
        @input="onInputLocation()"
        @focus="state.isDropdownOpen = true"
      />
      <ul
        v-if="isSuggestionsVisible"
        class="sign-in-form__suggests-location"
      >
        <li
          class="sign-in-form__suggests-close-button"
          @click="state.isDropdownOpen = false"
        >
          X
        </li>
        <li
          v-for="suggestion in props.suggestions"
          class="sign-in-form__suggest-location"
          @click="onSuggestionClicked(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
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

<style lang="scss" scoped>
.sign-in-form {
  $max-width-form: 20rem;

  width: 100%;
  max-width: $max-width-form;
  margin: 5rem auto;

  &__entry-wrapper {
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
  }

  &__suggestion-wrapper {
    position: relative;
  }

  &__suggests-location {
    position: absolute;
    top: 3rem;
    width: $max-width-form;
    max-height: calc($max-width-form / 2);
    margin: 0;
    padding: .75rem;

    overflow-x: hidden;
    overflow-y: scroll;

    text-align: left;
    list-style: none;
    border-radius: 1rem;

    background-color: #434099;
  }

  &__suggest-location {
    padding: .25rem;

    color: whitesmoke;
    border-radius: 1rem;
    cursor: pointer;
    transition: all ease-in-out .25s;

    &:hover {
      background-color: rgba(0,0,0,.25);
    }
  }

  &__suggests-close-button {
    position: absolute;
    right: 1rem;

    color: whitesmoke;
    cursor: pointer;
    font-weight: bold;
  }

  &__label {
    text-align: left;
    font-weight: bold;
  }

  &__label-image {
    width: 1rem;
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