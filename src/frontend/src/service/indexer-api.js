import axios from "axios";

const API_URL = process.env.INDEX_API_URL;
console.log(API_URL)

const get = async (endpoint) => {
    return await axios.get(`${API_URL}${endpoint}`, headers());
};

const post = async (endpoint, payload) => {
    return await axios.post(`${API_URL}${endpoint}`, payload, headers());
};

const postFormData = async (endpoint, payload) => {
    return await axios.post(`${API_URL}${endpoint}`, payload, {headers: {"Content-type": "multipart/form-data"}});
};

const headers = () => {
    // const user = getUser();
    // if (!user) navigate("/app/login")
    // const { accessToken } = user;
    return {
        // headers: { Authorization: "Bearer " + accessToken },
        headers: {"Content-type": "application/json"}
    }
}

export { get, post, postFormData };
