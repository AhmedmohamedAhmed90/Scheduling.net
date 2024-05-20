import axios from "axios";
import { Group } from "./groupService";
import { Faculty } from "./facultyService";
export interface Course {
  id?: number;
  code: string;
  title: string;
  description: string;
  departmeant: string;
  facultyid: number;
  faculty?: Faculty;
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
export const getCoursesByUniversityID = async (universityID: number) => {
  return await axios.get(`/api/Course/ByUniversity/${universityID}`);
};
export const getCourse = async (id: number) => {
  return axios.get(`/api/Course/${id}`).then((res) => res.data);
};
export const updateCourse = async (id: number, course: Course) => {
  return await axios.put(`/api/Course/${id}`, course);
};
export const deleteCourse = async (id: number) => {
  return await axios.delete(`/api/Course/${id}`);
};
