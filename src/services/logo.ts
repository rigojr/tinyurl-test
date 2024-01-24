/**
 * Gets the backend logo.
 *
 * @throws {Error} If response is not ok.
 * @throws {Error} If something unexpected went wrong in the API call.
 */
export async function getBackendLogo(): Promise<string> { // TODO: testing purpose
  const imageUrl = '/backend-logo.png'; // TODO: for testing purpose and avoid CORS policies
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error('Something went wrong, please try again later.');
  }

  return URL.createObjectURL(await response.blob());
}