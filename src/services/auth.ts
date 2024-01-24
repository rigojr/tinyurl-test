/**
 * The available sign in response.
 */
export enum SignInResponse {
  SUCCESSFUL,
  VALIDATION_ERROR,
  SERVER_ERROR
}

/**
 * Signs in an user.
 *
 * @param name     The user name.
 * @param password The user password.
 *
 * @remarks The jsonplaceholder API is being for testing purpose.
 */
export async function signIn(name: string, password: string): Promise<SignInResponse> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({name, password}) // TODO: password should be handling according to security policies.
    });

    if (!response.ok) {
      throw new Error('Something went wrong, please try again later.');
    }

    if (Math.round(Math.random()) === 1) { // TODO: for testing purpose
      return SignInResponse.SUCCESSFUL;
    }

    return SignInResponse.VALIDATION_ERROR;
  } catch(_err: unknown) {
    // TODO: handle error.
    return SignInResponse.SERVER_ERROR;
  }
}