import http from "./configure-http";

export const getRequest = async (url, params) => {
  return await http.get(url, { params });
};

export const postRequest = async (url, params, options = null) => {
  return await http.post(url, params, options);
};

export const putRequest = async (url, params) => {
  return await http.put(url, params);
};

export const patchRequest = async (url, params) => {
  return await http.patch(url, params);
};

export const deleteRequest = async (url, body = null) => {
  return await http.delete(url, { data: body });
};

export const getUrl = (subUrl) => {
  return getBaseUrl() + subUrl;
};
