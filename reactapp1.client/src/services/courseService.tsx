import axios from "axios";
import { Group } from "./groupService";
export interface Course {
  id?: number;
  code: string;
  title: string;
  description: string;
  departmeant: string;
  facultyid: number;
  conflict_count?: number;
  groups?: Group[];
}
export const addCourse = async (course: Course) => {
  return await axios.post(`/api/Course/${course.facultyid}`, course);
};
export const getCourses = async () => {
  return await axios.get("/api/Course");
};
export const getCoursesByFacultyID = async (facultyID: number) => {
  return await axios.get(`/api/Course/ByFaculty/${facultyID}`);
};
export const getCourse = async (id: number) => {
  return await axios.get(`/api/Course/${id}`);
};
export const updateCourse = async (id: string, course: Course) => {
  return await axios.put(`/api/Course/${id}`, course);
};
export const deleteCourse = async (id: string) => {
  return await axios.delete(`/api/Course/${id}`);
};
