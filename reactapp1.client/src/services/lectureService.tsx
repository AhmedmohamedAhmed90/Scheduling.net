import axios from "axios";
export interface Lecture {
  id?: number;
  StartTime: string;
  EndTime: string;
  day: string;
  room: string;
  groupId: number;
}
export const addLecture = async (lecture: Lecture) => {
  return await axios.post(
    `/api/Lecture?startTime=${lecture.StartTime}
    &endTime=${lecture.EndTime}&day=${lecture.day}
    &room=${lecture.room}&groupId=${lecture.groupId}`
  );
};
export const getLectures = async () => {
  return await axios.get("/api/Lecture");
};
export const updateLecture = async (id: string, lecture: Lecture) => {
  return await axios.put(`/api/Lecture/${id}`, lecture);
};
export const deleteLecture = async (id: string) => {
  return await axios.delete(`/api/Lecture/${id}`);
};
