import axios from "axios";
export interface Course {
  id?: number;
  code: string;
  title: string;
  description: string;
  instructorId: number;
}
export const addCourse = async (course: Course, instructorId: number) => {
  return await axios.post(`/api/Course/${instructorId}`, course);
};
export const getUniversities = async () => {
  return await axios.get("/api/Course");
};
export const getCourse = async (id: string) => {
  return await axios.get(`/api/Course/${id}`);
};
export const updateCourse = async (id: string, course: Course) => {
  return await axios.put(`/api/Course/${id}`, course);
};
export const deleteCourse = async (id: string) => {
  return await axios.delete(`/api/Course/${id}`);
};
