const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL.replace(/\/$/, '')

async function getCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to load categories");
  }
  const data = await res.json();
  return data;
}

export default { getCategories };
