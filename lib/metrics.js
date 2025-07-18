const URL = process.env.PERONDA_METRICS_URL;
const API_KEY = process.env.PERONDA_METRICS_API_KEY;

export async function fetchMetrics(filters) {
  //await 10 seconds
  if (!URL || !API_KEY) {
    return { error: "Missing environment variables for metrics API" };
  }

  try {
    const fetchUrl = filters
      ? `${URL}/metrics?${new URLSearchParams(filters)}`
      : `${URL}/metrics`;

    const response = await fetch(fetchUrl, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return { error: err.message };
  }
}

export async function fetchOrigins() {

  //await 10 seconds
  if (!URL || !API_KEY) {
    return { error: "Missing environment variables for metrics API" };
  }

  try {
    const fetchUrl = `${URL}/metrics/origins`;

    const response = await fetch(fetchUrl, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return { error: err.message };
  }
}

export async function fetchUsernames() {

  //await 10 seconds
  if (!URL || !API_KEY) {
    return { error: "Missing environment variables for metrics API" };
  }

  try {
    const fetchUrl = `${URL}/metrics/usernames`;

    const response = await fetch(fetchUrl, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return { error: err.message };
  }
}