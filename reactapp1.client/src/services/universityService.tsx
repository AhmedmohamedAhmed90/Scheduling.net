import axios from "axios";
export interface University {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
}
export const addUniversity = async (university: University) => {
  return await axios.post("/api/University", university);
};
export const getUniversities = async () => {
  return await axios.get("/api/University");
};
export const getUniversity = async (id: string) => {
  return await axios.get(`/api/University/${id}`);
};
export const updateUniversity = async (id: string, university: University) => {
  return await axios.put(`/api/University/${id}`, university);
};
export const deleteUniversity = async (id: string) => {
  return await axios.delete(`/api/University/${id}`);
};
