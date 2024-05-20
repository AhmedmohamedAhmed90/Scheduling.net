import axios from "axios";
import { Group } from "./groupService";
export interface Lecture {
  id?: number;
  startTime: string;
  endTime: string;
  day: string;
  room: string;
  groupId: number;
  group?: Group;
}
export const addLecture = async (lecture: Lecture) => {
  return await axios.post(
    `/api/Lecture?startTime=${lecture.startTime}
    &endTime=${lecture.endTime}&day=${lecture.day}
    &room=${lecture.room}&groupId=${lecture.groupId}`
  );
};
export const getLectures = async () => {
  return await axios.get("/api/Lecture");
};
export const getLecture = async (id: string) => {
  return await axios.get(`/api/Lecture/${id}`);
};
export const updateLecture = async (id: string, lecture: Lecture) => {
  return await axios.put(`/api/Lecture/${id}/${lecture.groupId}`, lecture);
};
export const deleteLecture = async (id: number) => {
  return await axios.delete(`/api/Lecture/${id}`);
};
