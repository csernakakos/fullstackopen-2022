import axios from "axios";
const baseURL = "http://localhost:3003/api/notes";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
}

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(r => r.data);
}
const create = async (object) => {
    const config = {
        headers: {Authorization: token}
    }
    console.log(config.headers);
    const response = await axios.post(baseURL, object, config);
    return response.data;
}

const update = (id, object) => {
    const request = axios.put(`${baseURL}/${id}`, object);
    return request.then(r => r.data);
    
}

export default {
    getAll,
    create,
    update,
    setToken,
}