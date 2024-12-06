import axios from "axios";

const getFilterQuery = (filters, title) => {
  let query = "";
  for (let filter in filters) {
    if (filter !== "budget") {
      if (filters[filter]) {
        query += `&${filter}=${filters[filter]}`;
      }
    }
  }
  return query;
};

export const getBusiness = async (title, filters) => {
  let query = "http://localhost:5500/api/v1/business/";

  if (filters) {
    query =
      `http://localhost:5500/api/v1/business/` +
      "?" +
      `${title ? "title=" + title : ""}` +
      getFilterQuery(filters);
  } else {
    if (title) {
      query =
        `http://localhost:5500/api/v1/business/` +
        "?" +
        `${title ? "title=" + title : ""}`;
    }
  }
  console.log(query);
  return await axios.get(`${query}`, {
    headers: {
      "Content-Type": "application/json",
      // authorization: token,
    },
  });
};

export const getBusinessStats = async () => {
  let query = "http://localhost:5500/api/v1/business/business-stats";

  return await axios.get(`${query}`, {
    headers: {
      "Content-Type": "application/json",
      // authorization: token,
    },
  });
};

export const getTopRatedBusiness = async (topRated) => {
  let query = "http://localhost:5500/api/v1/business/top-rated";

  return await axios.get(`${query}/?topRated${topRated}`, {
    headers: {
      "Content-Type": "application/json",
      // authorization: token,
    },
  });
};
