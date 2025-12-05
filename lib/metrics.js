import { parseISO, addDays, format } from 'date-fns';
import { cache } from 'react';

const URL = process.env.PERONDA_METRICS_URL;
const API_KEY = process.env.PERONDA_METRICS_API_KEY;


export const fetchMetrics = async (filters) => {
  //await 10 seconds
  if (!URL || !API_KEY) {
    return { error: "Missing environment variables for metrics API" };
  }

  const fixedFilters = shiftEndDateForwardOneDay(filters);

  try {
    const fetchUrl = filters
      ? `${URL}/metrics?${new URLSearchParams(fixedFilters)}`
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

export const fetchOrigins = cache(async () => {

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
})

export const fetchUsernames = cache(async () => {

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
})

function shiftEndDateForwardOneDay(params) {
  if (!params?.endDate) return params;

  const adjustedEndDate = format(addDays(parseISO(params.endDate), 1), 'yyyy-MM-dd');

  return {
    ...params,
    endDate: adjustedEndDate,
  };
}