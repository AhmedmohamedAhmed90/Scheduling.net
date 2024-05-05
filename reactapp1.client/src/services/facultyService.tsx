import axios from "axios";
import { University } from "./universityService";
export interface Faculty {
  id?: number;
  name: string;
  universityId: number;
  university?: University;
}
export const addFaculty = async (faculty: Faculty, universityID: number) => {
  return await axios.post(`/Faculty?universityId=${universityID}`, faculty);
};
export const getFaculties = async () => {
  return await axios.get("/Faculty");
};
export const getFaculty = async (id: string) => {
  return await axios.get(`/Faculty/${id}`);
};
export const updateFaculty = async (id: string, faculty: Faculty) => {
  return await axios.put(`/Faculty/${id}`, faculty);
};
export const deleteFaculty = async (id: string) => {
  return await axios.delete(`/Faculty/${id}`);
};
