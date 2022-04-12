import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'

let token;
export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

export const GET_all_blogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

export const POST_blog = async (object) => {
  const config = {
    headers: {Authorization: token}
}
  const response = await axios.post(baseUrl, object, config);
  return response.data;
}

// export default {
//   GET_all_blogs,
//   setToken,
// }