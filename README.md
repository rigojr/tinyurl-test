# tinyurl-test

## Project setup
```
yarn install
```

- Remember to create your `.env` file using `.env.example`.

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

## Things that could be better
### General
- There are a lot of SCSS styles that need to be reused, which could be accomplished with an ITCSS architecture.
- Each view handled directly the service that they need, nevertheless, it would be great to encapsulate that through Vuex actions.
- Different store states should be created to answer for a unique responsibility, I'm using  `session` state to handle articles-related logic, which should be avoided. And more stores related to sign/authentication/authorization should be added.
- Currently the `store/index.ts` is hosting all `mutations` and `actions` definitions, that could be handled in different files to improve readability. Also, the type definition should be improved.
- The loading states could be improved using `Suspense` or maybe `AsyncComponents`, I opted to avoid that complexity for now.

### FORM PAGE
- The autocomplete and dropdown could be encapsulated into a different component, the `SignInForm` component is hosting a lot of responsibility.
- There are some edge cases in which the dropdown should be closed that are not being attended, one of them is when the user clicks outside the dropdown, for it, I could add a global event listener with `click` and observe certain scenarios to properly close the dropdown.

### ARTICLES PAGE
- Since the WordPress installation is outside, I honestly couldn't add it to the development environment that I'm using with Vue, those API endpoints (provided by WP) are outside the main domain and should be avoided for CORS Policies, for testing purposes I added a plugin that let me bypass that security policy.
- I'm adding into `ArticleExcerpt` and `ArticleDetails` the `content` using the directive `v-html` since the API responded with valuable HTML data that could be added. That mechanism needs to be done with an HTML validation to avoid security vulnerabilities like script injections.

### FAQ
- Nothing to add.

### ADDITIONAL
- The menu component should receive as props a collection of option links to be shown.
- I simulated an API called to my static folder `/public`, the CORS policy was getting me crazy so ideally that should be given by a proper backend call.
    - Here I "guard" the logo display with a default value in `App.vue` `'logo': require('@/assets/logo.png')` in case the API call failed for any reason.
    - I guess that the backed logo should be handled as a file-like variable, for that reason I used `blob()` and `URL.createObjectURL`.
- The Vuex stores should be hydrated with localStorage, some libraries could help with that, but I did not have the time to use it.
    - This will help, for example, to keep consistent the cookie notification and session tokens.
- I could use Vuex better as I mentioned before, there are some improvement opportunities.
- I could add simple unit tests for only two components: `SignInForm` and `CookieNotification`, there are more tests that can be done, for example, the services. I did not have enough time to properly add more coverage.
    - I used to work with TDD, or a smooth version, however, I couldn't do it calmly because of the time restriction.