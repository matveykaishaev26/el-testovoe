export async function fetchData(endpoint: string) {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/api${endpoint}&key=${import.meta.env.VITE_API_KEY}`, {});
  console.log(res);
  if (!res.ok) throw new Error(`Failed to fetch /${endpoint}!`);
  const data = await res.json();
  console.log(data);
  return data;
}
