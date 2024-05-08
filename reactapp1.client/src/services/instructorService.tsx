import axios from "axios";
export interface Instructor {
  id?: number;
  name: string;
  department: string;
  facultyid: number;
}
export const addInstructor = async (
  instructor: Instructor,
  facultyid: number
) => {
  return await axios.post(`/api/Instructor/${facultyid}`, instructor);
};
export const getInstructorsByUniversityId = async (id: number) => {
  return await axios.get(`/api/Instructor/${id}`);
};
export const getInstructor = async (id: string) => {
  return await axios.get(`/api/Instructor/${id}`);
};
export const updateInstructor = async (id: string, instructor: Instructor) => {
  return await axios.put(`/api/Instructor/${id}`, instructor);
};
export const deleteInstructor = async (id: string) => {
  return await axios.delete(`/api/Instructor/${id}`);
};
