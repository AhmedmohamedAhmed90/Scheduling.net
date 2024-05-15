import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
import { getCourses } from "../services/courseService";

export default function TablePage() {
  const { data: courses } = useQuery({
    queryKey: ["All courses"],
    queryFn: () => getCourses(),
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
