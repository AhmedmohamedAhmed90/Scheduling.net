import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import {
  getCoursesByFacultyID,
  getCoursesByUniversityID,
} from "../services/courseService";
import { useContext } from "react";
import { Store } from "../Store";

export default function TablePage() {
  const store = useContext(Store);
  const { data: courses } = useQuery({
    queryKey: ["All courses By Univertyu ", store.state.universityID!],
    queryFn: () =>
      store.state.role === "Admin"
        ? getCoursesByUniversityID(store.state.universityID!)
        : getCoursesByFacultyID(store.state.facultyID!),
  });
  if (!courses) {
    return "Loading";
  }

  return (
    <>
      <Table courses={courses.data}></Table>
    </>
  );
}
