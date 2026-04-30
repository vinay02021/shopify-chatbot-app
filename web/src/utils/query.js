export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
