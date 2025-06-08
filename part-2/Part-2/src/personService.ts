import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

function getAll() {
  const request = axios.get(baseUrl);
  return request;
}

function create(formData: { name: string; number: string }) {
  const sentData = axios.post(baseUrl, formData);
  return sentData;
}

export { getAll, create };
