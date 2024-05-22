import "../table.css";
import { Course } from "../services/courseService";
interface Lecture {
  id: number;
  course_name: string;
  instructor: string;
  room: string;
}
function Table({ courses }: { courses: Course[] }) {
  const getLectures = (day: string, start_time: string, end_time: string) => {
    const lectures: Lecture[] = [];
    courses.forEach((course) => {
      course.groups!.forEach((group) => {
        group.lectures!.forEach((lecture) => {
          if (
            lecture.day.trim() === day &&
            lecture.startTime.trim() === start_time &&
            lecture.endTime.trim() === end_time
          ) {
            lectures.push({
              id: lecture.id!,
              course_name: course.title,
              instructor: group.instructor!.name,
              room: lecture.room,
            });
          }
        });
      });
    });
    return lectures;
  };

  return (
    <div className="table-wrapper mr-4 ml-4 mt-8 mb-5 d-flex justify-space-between align-center scrollable-horizontal">
      <table className="courses-table">
        <thead>
          <tr>
            <th>Day \ Time</th>
            {[
              "8:00 - 9:30",
              "9:30 - 11:00",
              "11:00 - 12:30",
              "12:30 - 2:00",
              "2:00 - 3:30",
              "3:30 - 5:00",
            ].map((time) => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ].map((day) => (
            <tr key={day}>
              <th>{day}</th>
              {[
                "8:00 - 9:30",
                "9:30 - 11:00",
                "11:00 - 12:30",
                "12:30 - 2:00",
                "2:00 - 3:30",
                "3:30 - 5:00",
              ].map((time) => (
                <td key={time}>
                  {getLectures(
                    day,
                    time.split(" - ")[0],
                    time.split(" - ")[1]
                  ).map((lecture) => (
                    <div className="info" key={lecture.id}>
                      <p className="main-info">{lecture.course_name}</p>
                      <div className="sub-info">
                        <p>{lecture.instructor}</p>
                        <p>{lecture.room}</p>
                      </div>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
