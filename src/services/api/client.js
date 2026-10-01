const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function apiRequest(path, options = {}, bodyData = null) {
  let method = "GET";
  let body = undefined;
  let customHeaders = {};

  if (typeof options === "string") {
    method = options.toUpperCase();
    if (bodyData !== null && bodyData !== undefined) {
      if (bodyData instanceof FormData) {
        body = bodyData;
      } else if (typeof bodyData === "object") {
        body = JSON.stringify(bodyData);
      } else {
        body = bodyData;
      }
    }
  } else if (typeof options === "object") {
    method = (options.method || "GET").toUpperCase();
    if (options.body) {
      if (typeof options.body === "object" && !(options.body instanceof FormData)) {
        body = JSON.stringify(options.body);
      } else {
        body = options.body;
      }
    }
    customHeaders = options.headers || {};
  }

  const token = localStorage.getItem("admin_token");

  const headers = {
    ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders
  };

  const fetchOptions = {
    method,
    credentials: "include",
    headers,
    ...(body !== undefined ? { body } : {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, fetchOptions);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `API request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return data;
}


