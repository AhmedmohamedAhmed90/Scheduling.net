import axios from "axios";
import { Faculty } from "./facultyService";
export interface Instructor {
  id?: number;
  name: string;
  facultyId: number;
  faculty?: Faculty;
}
export const addInstructor = async (
  instructor: Instructor,
  facultyid: number
) => {
  return await axios.post(`/api/Instructor/${facultyid}`, instructor);
};
export const getInstructorsByUniversityId = async (universityId: number) => {
  return await axios.get(`/api/Instructor/${universityId}`);
};
export const getInstructor = async (id: string) => {
  return await axios.get(`/api/Instructor/${id}`);
};
export const updateInstructor = async (id: string, instructor: Instructor) => {
  return await axios.put(`/api/Instructor/${id}`, instructor);
};
export const deleteInstructor = async (facultyid: number, id: number) => {
  return await axios.delete(`/api/Instructor/${facultyid}/${id}`);
};
