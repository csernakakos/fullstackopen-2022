import axios from "axios";
const URL = "http://localhost:3002/persons";

function getAll() {
    const req = axios.get(URL);
    return req.then(r => r.data);
}

function createOne(obj) {
    const req = axios.post(URL, obj);
    return req.then(r => r.data);
}

function updateOne(id, obj) {
    const req = axios.put(`${URL}/${id}`, obj);
    return req.then(r => {
        window.confirm(`${obj.name} already exists. Replace their number with the new number?`)
        return r.data;
    });

}

function deleteOne(id) {
    const req = axios.delete(`${URL}/${id}`)
    return req.then(r => {
        window.confirm("Delete?")
        return r.data;
    });
}


export default {
    getAll,
    createOne,
    updateOne,
    deleteOne,
}