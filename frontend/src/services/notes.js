import axios from "axios";
// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "http://localhost:3001/notes";

// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// const create = (newObject) => {
//   const request = axios.post(baseUrl, newObject);
//   return request.then((response) => response.data);
// };
const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };
const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object);
  return response.data;
};

// const destroy = (id) => {
//   const request = axios.delete(`${baseUrl}/${id}`);
//   return request.then((response) => response.data);
// };

export default {
  getAll,
  // create,
  createNew,
  // update,
  update,
  // destroy,
};
