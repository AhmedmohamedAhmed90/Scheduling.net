import axios from "axios";
axios.defaults.baseURL = "http://localhost:5261";

interface Course {
  id?: number;
  code: string;
  title: string;
  description: string;
  departmeant: string;
  facultyid: number;
}
interface Group {
  id?: number;
  code: string;
  courseid: number;
  instructorid: number;
}
interface Lecture {
  id?: number;
  StartTime: string;
  EndTime: string;
  day: string;
  room: string;
  groupId: number;
}
const addCourse = async (course: Course) => {
  return await axios.post(`/api/Course/${course.facultyid}`, course);
};
const addGroup = async (group: Group) => {
  return await axios.post(
    `/api/Group?code=${group.code}&courseId=${group.courseid}&instructorId=${group.instructorid}`
  );
};
const addLecture = async (lecture: Lecture) => {
  return await axios.post(
    `/api/Lecture?startTime=${lecture.StartTime}
    &endTime=${lecture.EndTime}&day=${lecture.day}
    &room=${lecture.room}&groupId=${lecture.groupId}`
  );
};
interface Instructor {
  id?: number;
  name: string;
  facultyid: number;
}
const addInstructor = async (instructor: Instructor, facultyid: number) => {
  return await axios.post(`/api/Instructor/${facultyid}`, instructor);
};
const allSubjects = [
  {
    subject_id: 1,
    subject_name: "تصميم وإدارة الشبكات",
    subject_code: "ITNT412",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-23",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمود ميلود منصور",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 2,
    subject_name: "تصميم التفاعلي في الاجهزة  المتنقلة",
    subject_code: "ITMC321",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-24",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. ناهد فتحي فرح",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 3,
    subject_name: "مقدمة في الذكاء الاصطناعي",
    subject_code: "ITIS413",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-23",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أينور إدريس تربح",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 4,
    subject_name: "مقدمة في البرمجة",
    subject_code: "ITGS122",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-24",
      period: 3,
    },
    groups: [
      {
        group_code: "B",
        professor: "أ. احمد علي الهوني",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "د. عبدالسلام منصور الشريف",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 5,
    subject_name: "معمارية الحاسوب",
    subject_code: "ITGS223",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-20",
      period: 3,
    },
    groups: [
      {
        group_code: "B",
        professor: "ناجية خالد بن سعود",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "ناجية خالد بن سعود",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 6,
    subject_name: "جودة واختبار البرمجيات",
    subject_code: "ITSE421",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-23",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروى نوري صولة",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 7,
    subject_name: "مقدمة في قواعد البيانات",
    subject_code: "ITGS228",
    subject_department: "القسم العام",
    final: {
      date: "2024-08-01",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. فاطمه علي بن الاشهر",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. فاطمه علي بن الاشهر",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 8,
    subject_name: "قواعد البيانات المتنقلة وغير متجانسة",
    subject_code: "ITMC322",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-08-01",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. محمد على وهيبة",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 9,
    subject_name: "نظم التطوير المتكاملة ",
    subject_code: "ITWT415",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-08-01",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. احمد علي الهوني",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 10,
    subject_name: "تطوير التطبيقات",
    subject_code: "ITIS311",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-21",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. فاطمة بشير القاضي",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 11,
    subject_name: "مقدمة في هندسة البرمجيات",
    subject_code: "ITGS213",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-31",
      period: 2,
    },
    groups: [
      {
        group_code: "B",
        professor: "أينور إدريس تربح",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "أ. مروى نوري صولة",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 13,
    subject_name: "أنماط تصميم البرمجيات",
    subject_code: "ITSE424",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-28",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مي مفتاح البعباع",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Monday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 15,
    subject_name: "تصميم الدوائر المنطقية",
    subject_code: "ITGS126",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-22",
      period: 1,
    },
    groups: [
      {
        group_code: "B",
        professor: "أ. ريما الشيباني سعد",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "أ. مريم ابوعجيله مساعد",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 16,
    subject_name: "تصميم وهيكلة البرمجيات",
    subject_code: "ITSE411",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-20",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروى نوري صولة",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 17,
    subject_name: "لغة عربية 1",
    subject_code: "ITAR111",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-24",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "محمد سالم الفيتورى",
        lectures: [
          {
            day: "Saturday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 1 - مسجل الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 18,
    subject_name: "جودة خدمات الشبكات",
    subject_code: "ITNT421",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-29",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. ريما الشيباني سعد",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 19,
    subject_name: "أساسيات الحوسبة في كل مكان",
    subject_code: "ITMC421",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-30",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام نوري بريون",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 20,
    subject_name: "تطوير تطبيقات الإنترنت المتنقل",
    subject_code: "ITWT422",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-20",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. فرحات امحمد زرقون",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 21,
    subject_name: "أنظمة دعم القرار",
    subject_code: "ITIS406",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-29",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. فاطمة بشير القاضي",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 22,
    subject_name: "نظم الوسائط المتعددة",
    subject_code: "ITIS324",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-22",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أينور إدريس تربح",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 23,
    subject_name: "اساسيات الحوسبة فى كل مكان",
    subject_code: "ITNT403",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-30",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام نوري بريون",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 25,
    subject_name: "البرمجة الشيئية",
    subject_code: "ITGS211",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-25",
      period: 1,
    },
    groups: [
      {
        group_code: "B",
        professor: "أ. محمد على وهيبة",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
      {
        group_code: "C",
        professor: "أ. محمد على وهيبة",
        lectures: [
          {
            day: "Saturday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "د. محمد احمد مغيدر",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 26,
    subject_name: "تصميم وتحليل الخوارزميات",
    subject_code: "ITGS301",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-22",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مي مفتاح البعباع",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. مي مفتاح البعباع",
        lectures: [
          {
            day: "Saturday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 27,
    subject_name: "وسائط متعددة",
    subject_code: "ITSE404",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-22",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أينور إدريس تربح",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 28,
    subject_name: "تحليل متطلبات برمجيات",
    subject_code: "ITSE311",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-20",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. فاطمه علي بن الاشهر",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 29,
    subject_name: "مقدمة في تقنية المعلومات",
    subject_code: "ITGS111",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-23",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. رمزي حميد القانوني",
        lectures: [
          {
            day: "Saturday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - مسجل الكلية)",
          },
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - مسجل الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 30,
    subject_name: "الإتصالات الرقمية",
    subject_code: "ITNT323",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-28",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "ناجية خالد بن سعود",
        lectures: [
          {
            day: "Saturday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 31,
    subject_name: "شبكات المنطقة الشخصية",
    subject_code: "ITMC412",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-25",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام نوري بريون",
        lectures: [
          {
            day: "Saturday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 32,
    subject_name: "شبكات المنطقة الشخصية",
    subject_code: "ITNT401",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-25",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام نوري بريون",
        lectures: [
          {
            day: "Saturday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 35,
    subject_name: "البرمجة المرئية",
    subject_code: "ITSE423",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-25",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. فاطمه علي بن الاشهر",
        lectures: [
          {
            day: "Saturday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 36,
    subject_name: "الفيزياء الالكترونية والمغناطيسية",
    subject_code: "ITPH111",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-22",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. رمزي حميد القانوني",
        lectures: [
          {
            day: "Saturday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(قاعة 1 - مسجل الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 37,
    subject_name: "رياضة 1",
    subject_code: "ITMM111",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-20",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. وفاء  امحمد كشريو",
        lectures: [
          {
            day: "Saturday",
            start_time: "6:00",
            end_time: "8:00",
            room: "(قاعة 1 - مسجل الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 38,
    subject_name: "برمجة الشبكات",
    subject_code: "ITNT313",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-20",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروة ابراهيم  عبدالهادي",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 39,
    subject_name: "الشبكات الاجتماعية",
    subject_code: "ITMC413",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-23",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. منار سامي عريف",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 40,
    subject_name: "الأمن وإدارة المخاطر",
    subject_code: "ITIS412",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-27",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. حنان الطاهر الداقيز",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 41,
    subject_name: "إدارة البيانات والمعلومات",
    subject_code: "ITIS313",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-27",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد علي ابراهيم الطاهر",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 42,
    subject_name: "قواعد البيانات المتقدمة",
    subject_code: "ITWT313",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-21",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالناصر عبدالحميد ضياف",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 44,
    subject_name: "مقدمة في شبكات الحاسوب",
    subject_code: "ITGS215",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-29",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "احمد علي صمود",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "د. عبدالباسط الهادي التهامي",
        lectures: [
          {
            day: "Monday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 45,
    subject_name: "القرصنة الأخلاقية",
    subject_code: "ITWT420",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-22",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. احمد علي الهوني",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 46,
    subject_name: "التحليل العددي",
    subject_code: "ITGS219",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-21",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. زهرة عبدالله الاشعل",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. زهرة عبدالله الاشعل",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "D",
        professor: "د. عبدالسلام نوري بريون",
        lectures: [
          {
            day: "Tuesday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Thursday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
      {
        group_code: "C",
        professor: "د. عبدالسلام نوري بريون",
        lectures: [
          {
            day: "Tuesday",
            start_time: "6:00",
            end_time: "8:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Thursday",
            start_time: "6:00",
            end_time: "8:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 47,
    subject_name: "التراكيب المنفصلة",
    subject_code: "ITGS217",
    subject_department: "القسم العام",
    final: {
      date: "2024-08-01",
      period: 2,
    },
    groups: [
      {
        group_code: "B",
        professor: "رحاب  عبدالله  بن عبدالله",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "رحاب  عبدالله  بن عبدالله",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "C",
        professor: "أ. فاطمة بشير القاضي",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "D",
        professor: "أ. فاطمة بشير القاضي",
        lectures: [
          {
            day: "Monday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 48,
    subject_name: "برمجة المنطق",
    subject_code: "ITSE301",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-27",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. الحرمين محمد الحرمين",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 49,
    subject_name: "إدارة المشاريع",
    subject_code: "ITGS303",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-31",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. هديل رافت الجربي",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "C",
        professor: "أ. بيرم علي زرتي",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. هديل رافت الجربي",
        lectures: [
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 50,
    subject_name: "الشبكات الاجتماعية",
    subject_code: "ITSE409",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-23",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. منار سامي عريف",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 51,
    subject_name: "برمجة الشبكات",
    subject_code: "ITSE405",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-20",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروة ابراهيم  عبدالهادي",
        lectures: [
          {
            day: "Sunday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 52,
    subject_name: "خورازميات و بروتوكولات التشفير",
    subject_code: "ITNT314",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-27",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عمر عبدالمولى ابوسعدة",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 53,
    subject_name: "تطوير التطبيقات المتعددة المنصات",
    subject_code: "ITMC323",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-22",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد احمد مغيدر",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 54,
    subject_name: "برمجة الخادم والعميل ",
    subject_code: "ITWT320",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-20",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. يوسف محمد أبوستة",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 55,
    subject_name: "قواعد البيانات المتقدمة",
    subject_code: "ITIS325",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-08-01",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام منصور الشريف",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة (10) - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 56,
    subject_name: "خدمات الإنترنت ",
    subject_code: "ITWT411",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-21",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالناصر عبدالحميد ضياف",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل الشبكات - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل الشبكات - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 57,
    subject_name: "إدارة إستراتيجيات نظم المعلومات",
    subject_code: "ITIS422",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-21",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. هديل رافت الجربي",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 58,
    subject_name: "تحليل وتصميم نظم",
    subject_code: "ITGS124",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-20",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد علي ابراهيم الطاهر",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 61,
    subject_name: "مقدمة في رسوم الحاسب الآلي ",
    subject_code: "ITWT303",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-29",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. احمد علي الهوني",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 62,
    subject_name: "لغة برمجة الحديثة - جافا متقدمة",
    subject_code: "ITSE322",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-22",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. الحرمين محمد الحرمين",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 63,
    subject_name: "برمجة الانترنت المتقدمة",
    subject_code: "ITSE412",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-30",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام الفيتوري النويصري",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 64,
    subject_name: "كتابة التقارير العلمية - لغة انجليزية ",
    subject_code: "ITGS304",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-29",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروة مسعود خليفة",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. مروة مسعود خليفة",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 65,
    subject_name: "برمجة التطبيقات الجوالة",
    subject_code: "ITSE304",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-22",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد احمد مغيدر",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 66,
    subject_name: "التشفير وأمن المعلومات",
    subject_code: "ITSE306",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-27",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عمر عبدالمولى ابوسعدة",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 67,
    subject_name: "خدمات الإنترنت",
    subject_code: "ITSE407",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-21",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالناصر عبدالحميد ضياف",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل الشبكات - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل الشبكات - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 68,
    subject_name: "رياضة 2",
    subject_code: "ITMM122",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-21",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. وفاء  امحمد كشريو",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Monday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 69,
    subject_name: "الحلول التقنية",
    subject_code: "ITGS113",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-25",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. وفاء حسين المصباحي",
        lectures: [
          {
            day: "Sunday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل (10) - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل (10) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 70,
    subject_name: "الحوسبة السحابية",
    subject_code: "ITNT404",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-27",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عمر عبدالمولى ابوسعدة",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 71,
    subject_name: "الحوسبة السحابية",
    subject_code: "ITMC422",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-27",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عمر عبدالمولى ابوسعدة",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 72,
    subject_name: "نظم تشغيل الأجهزة  المتنقلة",
    subject_code: "ITMC313",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-20",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. محمد معتوق الكوم",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 73,
    subject_name: "تصميم واجهات المستخدم ",
    subject_code: "ITWT322",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-24",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. وفاء حسين المصباحي",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 74,
    subject_name: "تنقيب البيانات -  الذكاء التجاري",
    subject_code: "ITIS404",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-22",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد علي ابراهيم الطاهر",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 75,
    subject_name: "التنقيب في البيانات",
    subject_code: "ITWT301",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-22",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد علي ابراهيم الطاهر",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 76,
    subject_name: "الحوسبة السحابية",
    subject_code: "ITWT307",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-27",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عمر عبدالمولى ابوسعدة",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 77,
    subject_name: "أساسيات نظم المعلومات",
    subject_code: "ITGS222",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-27",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروة ابراهيم  عبدالهادي",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 79,
    subject_name: "مبادئ تطوير الألعاب",
    subject_code: "ITSE401",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-31",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمود غيث الجديد",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل (9)- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 80,
    subject_name: "قواعد البيانات المتقدمة",
    subject_code: "ITSE312",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-08-01",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالسلام الفيتوري النويصري",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 82,
    subject_name: "تنقيب البيانات",
    subject_code: "ITSE302",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-22",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد علي ابراهيم الطاهر",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 83,
    subject_name: "نظم تشغيل الأجهزة المتنقلة",
    subject_code: "ITSE308",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-20",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. محمد معتوق الكوم",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 84,
    subject_name: "الحوسبة السحابية",
    subject_code: "ITSE406",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-27",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عمر عبدالمولى ابوسعدة",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 85,
    subject_name: "تطوير الألعاب",
    subject_code: "ITWT305",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-31",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمود غيث الجديد",
        lectures: [
          {
            day: "Sunday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل (9)- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 86,
    subject_name: "الإتصالات اللاسلكية والمحمولة",
    subject_code: "ITNT324",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-31",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد مفتاح الرايس",
        lectures: [
          {
            day: "Sunday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 87,
    subject_name: "مبادئ  شبكات  اللاسلكية  المتنقلة",
    subject_code: "ITMC312",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-31",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد مفتاح الرايس",
        lectures: [
          {
            day: "Sunday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 88,
    subject_name: "الأمن في الحوسبة المتنقلة",
    subject_code: "ITMC411",
    subject_department: "قسم الحوسبة المتنقلة",
    groups: [
      {
        group_code: "A",
        professor: "أ. محمد معتوق الكوم",
        lectures: [
          {
            day: "Sunday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 89,
    subject_name: "البنيان المؤسساتي",
    subject_code: "ITIS411",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-28",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. ابتسام  عبدالسلام العاشوري",
        lectures: [
          {
            day: "Sunday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 90,
    subject_name: "لغة انجليزية 2",
    subject_code: "ITEL121",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-30",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروة مسعود خليفة",
        lectures: [
          {
            day: "Sunday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 91,
    subject_name: " مشروع  التخرج",
    subject_code: "ITMC500",
    subject_department: "قسم الحوسبة المتنقلة",
    groups: [
      {
        group_code: "A",
        professor: "أ. منار سامي عريف",
        lectures: [
          {
            day: "Sunday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 92,
    subject_name: "الحكومة الإلكترونية",
    subject_code: "ITIS408",
    subject_department: "قسم نظم المعلومات",
    groups: [
      {
        group_code: "A",
        professor: "أ. ابتسام  عبدالسلام العاشوري",
        lectures: [
          {
            day: "Sunday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 93,
    subject_name: "اتصال بيانات",
    subject_code: "ITNT311",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-30",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالباسط الهادي التهامي",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 94,
    subject_name: "السياسة الأمنية",
    subject_code: "ITNT304",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-08-01",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. إدريس عبدالهادي غميض",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 95,
    subject_name: "تطوير التطبيقات المتنقلة",
    subject_code: "ITMC311",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-25",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. خالد محمد بن حامد",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 96,
    subject_name: "رسومات ثلاثية الأبعاد المتنقلة",
    subject_code: "ITMC401",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-24",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "رحاب ابن عبدالله",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 97,
    subject_name: "البنية التحتية لنظم المعلومات",
    subject_code: "ITIS323",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-20",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد عبدالدائم محبوب",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 98,
    subject_name: "إجراءات ولوائح الأمان ",
    subject_code: "ITWT317",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-08-01",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. إدريس عبدالهادي غميض",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 99,
    subject_name: "تراكيب البيانات",
    subject_code: "ITGS220",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-23",
      period: 3,
    },
    groups: [
      {
        group_code: "D",
        professor: "أ. اريج سمير امبارك",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "C",
        professor: "أ. اريج سمير امبارك",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "أ. بيرم علي زرتي",
        lectures: [
          {
            day: "Monday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. بيرم علي زرتي",
        lectures: [
          {
            day: "Monday",
            start_time: "6:00",
            end_time: "8:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "6:00",
            end_time: "8:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 101,
    subject_name: "امن المعلومات",
    subject_code: "ITGS224",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-28",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد عبدالسلام عزاقة",
        lectures: [
          {
            day: "Monday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "د. محمد عبدالسلام عزاقة",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/15 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 105,
    subject_name: "الشبكات المحلية",
    subject_code: "ITNT312",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-23",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مريم ابوعجيله مساعد",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 106,
    subject_name: "بروتوكولات وبرمجيات الشبكات",
    subject_code: "ITNT322",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-24",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عزالدين محمد السلامي",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 107,
    subject_name: "الأنظمة الموزعة",
    subject_code: "ITNT411",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-20",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. إدريس عبدالهادي غميض",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 108,
    subject_name: "مواضيع مختارة",
    subject_code: "ITMC305",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-21",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. خالد محمد بن حامد",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 109,
    subject_name: "تطوير أنظمة الصوت والصورة ",
    subject_code: "ITWT324",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-23",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. رمزي حميد القانوني",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 110,
    subject_name: "تحليل وتصميم النظم 2",
    subject_code: "ITIS326",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-30",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. أحمد أبورودس الكيلاني",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة (10) - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة (10) - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 116,
    subject_name: "مبادئ الاحصاء والاحتمالات",
    subject_code: "ITST111",
    subject_department: "القسم العام",
    final: {
      date: "2024-08-01",
      period: 1,
    },
    groups: [
      {
        group_code: "B",
        professor: "د. عادل علي أوحيدة",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(مدرج الهوني - مبني الكلية)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "د. عادل علي أوحيدة",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 117,
    subject_name: "بناء البرمجيات",
    subject_code: "ITSE321",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-25",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. بيرم علي زرتي",
        lectures: [
          {
            day: "Monday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة  2 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(معمل 2 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 118,
    subject_name: "نمذجة وتقييم الاداء",
    subject_code: "ITNT301",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-25",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عزالدين محمد السلامي",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة ( 7 ) - مبني الكلية الجديد)",
          },
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 120,
    subject_name: "شبكات السرعات العالية - الألياف البصرية",
    subject_code: "ITNT422",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-30",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالباسط الهادي التهامي",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 121,
    subject_name: "برمجة الإنترنت المتقدمة ",
    subject_code: "ITWT311",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-30",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. يوسف محمد أبوستة",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 122,
    subject_name: "بحث واسترجاع المعلومات",
    subject_code: "ITIS401",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-25",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمد عبدالدائم محبوب",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 123,
    subject_name: "نماذج البرمجة",
    subject_code: "ITMC302",
    subject_department: "قسم الحوسبة المتنقلة",
    final: {
      date: "2024-07-29",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. اريج سمير امبارك",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(معمل سامسونق - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 126,
    subject_name: "مقدمة في برمجة الانترنت",
    subject_code: "ITGS226",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-30",
      period: 3,
    },
    groups: [
      {
        group_code: "B",
        professor: "أ. ابتسام  عبدالسلام العاشوري",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "A",
        professor: "أ. ابتسام  عبدالسلام العاشوري",
        lectures: [
          {
            day: "Monday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "C",
        professor: "أ. علياء مفتاح علي",
        lectures: [
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "D",
        professor: "أ. علياء مفتاح علي",
        lectures: [
          {
            day: "Wednesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(القاعة 2/10 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 129,
    subject_name: "لغة عربية 2",
    subject_code: "ITAR121",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-28",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "محمد سالم الفيتورى",
        lectures: [
          {
            day: "Monday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 131,
    subject_name: "الشبكات المترامية",
    subject_code: "ITNT321",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-22",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. حمدي أحمد جابر",
        lectures: [
          {
            day: "Monday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 132,
    subject_name: "الشبكات المترامية",
    subject_code: "ITWT309",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-22",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. حمدي أحمد جابر",
        lectures: [
          {
            day: "Monday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 138,
    subject_name: "التفاعل بين الإنسان والحاسوب",
    subject_code: "ITSE413",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-24",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مي مفتاح البعباع",
        lectures: [
          {
            day: "Monday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Wednesday",
            start_time: "4:00",
            end_time: "6:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 145,
    subject_name: "النظم المؤسساتية",
    subject_code: "ITIS421",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-31",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. هديل رافت الجربي",
        lectures: [
          {
            day: "Tuesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة  28 - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 157,
    subject_name: "تطوير تطبيقات الإنترنت ",
    subject_code: "ITWT413",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-30",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالناصر عبدالحميد ضياف",
        lectures: [
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 165,
    subject_name: "تطوير تطبيقات الإنترنت",
    subject_code: "ITSE408",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-30",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالناصر عبدالحميد ضياف",
        lectures: [
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 178,
    subject_name: "نظم التشغيل",
    subject_code: "ITGS302",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-25",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. حمدي أحمد جابر",
        lectures: [
          {
            day: "Tuesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
      {
        group_code: "B",
        professor: "أ. حمدي أحمد جابر",
        lectures: [
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
          {
            day: "Thursday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(القاعة 2/13 - الكيمياء)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 188,
    subject_name: "إعادة إستخدام البرمجيات",
    subject_code: "ITSE422",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-21",
      period: 3,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. عبدالحميد الفلاح الواعر",
        lectures: [
          {
            day: "Tuesday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 223,
    subject_name: "التفاعل بين الإنسان والحاسوب",
    subject_code: "ITWT315",
    subject_department: "لم يتم تحديد القسم",
    final: {
      date: "2024-07-24",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. وفاء حسين المصباحي",
        lectures: [
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 233,
    subject_name: "أخلاقيات هندسة البرمجيات",
    subject_code: "ITSE414",
    subject_department: "قسم هندسة البرمجيات",
    final: {
      date: "2024-07-29",
      period: 1,
    },
    groups: [
      {
        group_code: "A",
        professor: "عليا مفتاح علي",
        lectures: [
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(الزجاجية - مبني الكلية الجديد)",
          },
          {
            day: "Thursday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 235,
    subject_name: "التفاعل بين الإنسان والحاسوب",
    subject_code: "ITIS312",
    subject_department: "قسم نظم المعلومات",
    final: {
      date: "2024-07-24",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. وفاء حسين المصباحي",
        lectures: [
          {
            day: "Wednesday",
            start_time: "12:00",
            end_time: "2:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "12:00",
            room: "(قاعة 4 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
  {
    subject_id: 279,
    subject_name: "لغة انجليزية 1",
    subject_code: "ITEL111",
    subject_department: "القسم العام",
    final: {
      date: "2024-07-28",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "أ. مروة مسعود خليفة",
        lectures: [
          {
            day: "Thursday",
            start_time: "2:00",
            end_time: "4:00",
            room: "(قاعة 1 - الدرسات الكلية)",
          },
        ],
      },
    ],
  },
];
const subjects = [
  {
    subject_id: 1,
    subject_name: "تصميم وإدارة الشبكات",
    subject_code: "ITNT412",
    subject_department: "قسم شبكات الحاسوب",
    final: {
      date: "2024-07-23",
      period: 2,
    },
    groups: [
      {
        group_code: "A",
        professor: "د. محمود ميلود منصور",
        lectures: [
          {
            day: "Saturday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
          {
            day: "Wednesday",
            start_time: "8:00",
            end_time: "10:00",
            room: "(قاعة ((7))- الدرسات الكلية)",
          },
        ],
      },
    ],
  },
];
// const instructorsSet: Set<string> = new Set();
// allSubjects.forEach((subject) => {
//   subject.groups.forEach((group) => instructorsSet.add(group.professor));
// });
// const instructors = Array.from(instructorsSet);

// instructors.forEach(async (instructor) => {
//   await addInstructor(
//     {
//       name: instructor,
//       facultyid: 1,
//     } as Instructor,
//     1
//   );
// });
// const instructors = [
//   { id: 1, name: "رحاب ابن عبدالله" },
//   { id: 2, name: "أ. ناهد فتحي فرح" },
//   { id: 3, name: "د. عبدالسلام منصور الشريف" },
//   { id: 4, name: "د. محمود ميلود منصور" },
//   { id: 5, name: "أينور إدريس تربح" },
//   { id: 6, name: "أ. احمد علي الهوني" },
//   { id: 7, name: "د. عبدالحميد الفلاح الواعر" },
//   { id: 8, name: "أ. فاطمه علي بن الاشهر" },
//   { id: 9, name: "أ. مروى نوري صولة" },
//   { id: 10, name: "أ. مريم ابوعجيله مساعد" },
//   { id: 11, name: "أ. منار سامي عريف" },
//   { id: 12, name: "أ. ريما الشيباني سعد" },
//   { id: 13, name: "أ. مي مفتاح البعباع" },
//   { id: 14, name: "أ. زهرة عبدالله الاشعل" },
//   { id: 15, name: "أ. محمد على وهيبة" },
//   { id: 16, name: "احمد علي صمود" },
//   { id: 17, name: "أ. مروة ابراهيم  عبدالهادي" },
//   { id: 18, name: "د. عبدالسلام الفيتوري النويصري" },
//   { id: 19, name: "د. رمزي حميد القانوني" },
//   { id: 20, name: "د. محمد احمد مغيدر" },
//   { id: 21, name: "د. عبدالسلام نوري بريون" },
//   { id: 22, name: "د. خالد محمد بن حامد" },
//   { id: 23, name: "أ. هديل رافت الجربي" },
//   { id: 24, name: "أ. محمد معتوق الكوم" },
//   { id: 25, name: "أ. فاطمة بشير القاضي" },
//   { id: 26, name: "د. عزالدين محمد السلامي" },
//   { id: 27, name: "د. عبدالباسط الهادي التهامي" },
//   { id: 28, name: "أ. اريج سمير امبارك" },
//   { id: 29, name: "د. يوسف محمد أبوستة" },
//   { id: 30, name: "عليا مفتاح علي" },
//   { id: 31, name: "د. فرحات امحمد زرقون" },
//   { id: 32, name: "د. محمود غيث الجديد" },
//   { id: 33, name: "أ. وفاء  امحمد كشريو" },
//   { id: 34, name: "أ. وفاء حسين المصباحي" },
//   { id: 35, name: "د. عمر عبدالمولى ابوسعدة" },
//   { id: 36, name: "رحاب  عبدالله  بن عبدالله" },
//   { id: 37, name: "أ. ابتسام  عبدالسلام العاشوري" },
//   { id: 38, name: "محمد سالم الفيتورى" },
//   { id: 39, name: "أ. مروة مسعود خليفة" },
//   { id: 40, name: "د. عادل علي أوحيدة" },
//   { id: 41, name: "د. محمد علي ابراهيم الطاهر" },
//   { id: 42, name: "د. إدريس عبدالهادي غميض" },
//   { id: 43, name: "د. عبدالناصر عبدالحميد ضياف" },
//   { id: 44, name: "أ. علياء مفتاح علي" },
//   { id: 45, name: "د. محمد عبدالسلام عزاقة" },
//   { id: 46, name: "ناجية خالد بن سعود" },
//   { id: 47, name: "د. محمد عبدالدائم محبوب" },
//   { id: 48, name: "د. محمد مفتاح الرايس" },
//   { id: 49, name: "د. الحرمين محمد الحرمين" },
//   { id: 50, name: "د. حنان الطاهر الداقيز" },
//   { id: 51, name: "د. أحمد أبورودس الكيلاني" },
//   { id: 52, name: "أ. حمدي أحمد جابر" },
//   { id: 53, name: "أ. بيرم علي زرتي" },
// ];

// allSubjects.forEach(async (subject) => {
//   const courseData = await addCourse({
//     code: subject.subject_code,
//     description: subject.subject_name,
//     title: subject.subject_name,
//     departmeant: subject.subject_department,
//     facultyid: 1,
//   } as Course);
//   subject.groups.forEach(async (group) => {
//     const groupData = await addGroup({
//       code: group.group_code,
//       courseid: courseData.data.id!,
//       instructorid: instructors.find(
//         (instructor) => instructor.name === group.professor
//       )?.id,
//     } as Group);
//     group.lectures.forEach(async (lecture) => {
//       addLecture({
//         day: lecture.day,
//         StartTime: lecture.start_time,
//         EndTime: lecture.end_time,
//         room: lecture.room,
//         groupId: groupData.data.id!,
//       } as Lecture);
//     });
//   });
// });







// allSubjects.forEach(async (subject) => {
//   subject.groups.forEach(async (group) => {
//     group.lectures.forEach(async (lecture) => {
//       console.log(
//         `lessonRepository.save(new Lesson("${subject.subject_name}", "${
//           group.professor
//         }", "${`${subject.subject_code}${group.group_code}`}"));`
//       );
//     });
//   });
// });
// const arr = new Set();
// allSubjects.forEach(async (subject) => {
//   subject.groups.forEach(async (group) => {
//     group.lectures.forEach(async (lecture) => {
//       arr.add(lecture.room);
//     });
//   });
// });

// arr.forEach(async (room) => {
//   console.log(`roomRepository.save(new Room("${room}"));`);
// });
