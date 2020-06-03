/**
 * Checks the Response object as a result of a fetch call. If the response was ok, (2xx status code),
 * @param {Response} response - the Response object from fetch
 * @returns {Response} the Response if it was ok (2xx status)
 * @throws Error if the Response was not ok
 */
export function checkStatus(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}
