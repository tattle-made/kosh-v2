import axios from "axios";

const API_URL = `https://kosh-server-v2.tattle.co.in`;

const get = async (endpoint, token) => {
  return await axios.get(`${API_URL}${endpoint}`, {
    headers: {
      token,
    },
  });
};

const post = async (endpoint, payload) => {
  return await axios.post(`${API_URL}${endpoint}`, payload);
};

const postWithToken = async (endpoint, payload, token) => {
  return await axios.post(`${API_URL}${endpoint}`, payload, {
    headers: { token },
  });
};

export { get, post, postWithToken, API_URL };
