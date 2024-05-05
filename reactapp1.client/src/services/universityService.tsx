import axios from "axios";
export interface University {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
}
export const addUniversity = async (university: University) => {
  return await axios.post("/University", university);
};
export const getUniversities = async () => {
  return await axios.get("/University");
};
export const getUniversity = async (id: string) => {
  return await axios.get(`/University/${id}`);
};
export const updateUniversity = async (id: string, university: University) => {
  return await axios.put(`/University/${id}`, university);
};
export const deleteUniversity = async (id: string) => {
  return await axios.delete(`/University/${id}`);
};
