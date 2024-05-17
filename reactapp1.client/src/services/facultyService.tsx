import axios from "axios";
import { University } from "./universityService";
export interface Faculty {
  id?: number;
  name: string;
  universityId?: number;
  university?: University;
}
export const addFaculty = async (faculty: Faculty, universityID: number) => {
  return await axios.post(`/api/Faculty/${universityID}`, faculty);
};
export const getFaculties = async () => {
  return await axios.get("/api/Faculty");
};
export const getFacultiesByUniversityId = async (universityID: number) => {
  return await axios.get(`/api/Faculty/${universityID}`);
};
export const getFaculty = async (id: string) => {
  return await axios.get(`/api/Faculty/${id}`);
};
export const updateFaculty = async (id: string, faculty: Faculty) => {
  return await axios.put(`/api/Faculty/${id}`, faculty);
};
export const deleteFaculty = async (universityID: number, id: number) => {
  return await axios.delete(`/api/Faculty/${universityID}/${id}`);
};
