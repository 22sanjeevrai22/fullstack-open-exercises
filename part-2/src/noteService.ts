import axios from "axios";
const baseUrl = "localhost:5173/api/notes";

interface Note {
  id: number;
  name: string;
  number?: string;
}

function getAll() {
  const request = axios.get(baseUrl);
  console.log("get all request", request);
  return request;
}

function create(formData: { name: string; number: string }) {
  const sentData = axios.post(`${baseUrl}`, formData);
  console.log("sentdataa", sentData);
  return sentData;
}

function remove(id: number) {
  const deletedItem = axios.delete(`${baseUrl}/${id}`);
  return deletedItem;
}

function update(existingNote: Note, id: number) {
  return axios.put<Note>(`${baseUrl}/${id}`, existingNote);
}
export { getAll, create, remove, update };
