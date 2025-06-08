import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

interface Person {
  id: number;
  name: string;
  number?: string;
}

function getAll() {
  const request = axios.get(baseUrl);
  return request;
}

function create(formData: { name: string; number: string }) {
  const sentData = axios.post(baseUrl, formData);
  return sentData;
}

function remove(id: number) {
  const deletedItem = axios.delete(`${baseUrl}/${id}`);
  return deletedItem;
}

function update(existingPerson: Person, id: number) {
  return axios.put<Person>(`${baseUrl}/${id}`, existingPerson);
}
export { getAll, create, remove, update };
