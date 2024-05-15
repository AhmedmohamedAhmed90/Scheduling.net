import { Course } from "../services/courseService";

export const findNameOfCourse = (courseCode: string, courses: Course[]) => {
  const course = courses.find((course) => course.code === courseCode);
  return course?.title;
};
export const findOneGroupOfCourse = (
  courseCode: string,
  groupCode: string,
  courses: Course[],
  conflict_count: number
) => {
  const course = courses.find((course) => course.code === courseCode);
  return {
    ...course,
    conflict_count: conflict_count,
    groups: [course?.groups?.find((group) => group.code === groupCode)],
  };
};
export interface CourseMultiSelect {
  value: Course;
  label: string;
}
