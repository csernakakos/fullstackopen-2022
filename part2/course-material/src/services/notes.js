import axios from "axios";
const baseURL = "http://localhost:3002/notes";

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(r => r.data);
}
const create = (object) => {
    const request = axios.post(baseURL, object);
    return request.then(r => r.data);
}

const update = (id, object) => {
    const request = axios.put(`${baseURL}/${id}`, object);
    return request.then(r => r.data);
    
}

export default {
    getAll,
    create,
    update,
}