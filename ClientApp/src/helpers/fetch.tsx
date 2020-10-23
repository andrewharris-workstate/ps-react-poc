const apiPath = "api/reactpoc";

export async function getData(endpoint: string) {
  const origin = window && window.location && window.location.origin;
  const host = origin || "https://localhost:44383";
  const url = `${host}/${apiPath}/${endpoint}`;

  return fetch(url);
}
