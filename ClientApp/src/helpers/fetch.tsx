const apiPath = "api/reactpoc";

export async function getData(endpoint: string) {
  const url = getUrl(endpoint);

  return fetch(url);
}

export async function postData(endpoint: string, data: Record<string, any>) {
  const url = getUrl(endpoint);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getUrl(endpoint: string): string {
  const origin = window?.location?.origin;
  const host = origin || "https://localhost:44383";

  return `${host}/${apiPath}/${endpoint}`;
}
