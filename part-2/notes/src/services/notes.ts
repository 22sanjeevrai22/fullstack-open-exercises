import axios from "axios";

export interface Note {
  id?: number;
  content: string;
  date: string;
  correct: boolean;
}

const baseUrl = "/api/notes";

const getAll = (): Promise<Note[]> => {
  return axios.get(baseUrl).then((result) => result.data);
};

const create = (note: Omit<Note, "id">): Promise<{ data: Note }> => {
  return axios.post(baseUrl, note);
};

const update = (id: number, note: Note): Promise<{ data: Note }> => {
  return axios.put(`${baseUrl}/${id}`, note);
};

export default { getAll, create, update };
