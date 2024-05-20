import axios from "axios";
import { Lecture } from "./lectureService";
import { Instructor } from "./instructorService";
import { Course } from "./courseService";
export interface Group {
  id?: number;
  code: string;
  courseid: number;
  instructorid: number;
  instructor?: Instructor;
  lectures?: Lecture[];
  course?: Course;
}
export const addGroup = async (group: Group) => {
  return await axios.post(
    `/api/Group?code=${group.code}&courseId=${group.courseid}&instructorId=${group.instructorid}`
  );
};
export const getGroupsByCourseId = async (id: string) => {
  return await axios.get(`/api/Group/${id}`);
};
export const getGroup = async (id: string) => {
  return await axios.get(`/api/Group/${id}`);
};
export const updateGroup = async (id: string, group: Group) => {
  return await axios.put(`/api/Group/${id}`, group);
};
export const deleteGroup = async (id: number) => {
  return await axios.delete(`/api/Group/${id}`);
};
