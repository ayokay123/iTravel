const API_URL = "http://localhost:1337";

export async function listAllLogs() {
  const resp = await fetch(`${API_URL}/api/logs`);
  return resp.json();
}

export async function createLog(entry) {
  const resp = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return resp.json();
}
