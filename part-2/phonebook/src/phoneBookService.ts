import axios from "axios";
const baseUrl = "/api/persons";

interface PhoneBook {
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
  deletedItem.then((data) => console.log(data));
  return deletedItem;
}

function update(existingPhoneBook: PhoneBook, id: number) {
  return axios.put<PhoneBook>(`${baseUrl}/${id}`, existingPhoneBook);
}
export { getAll, create, remove, update };
