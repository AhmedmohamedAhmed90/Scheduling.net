import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { StoreProvider } from "./Store.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import CreateUniversity from "./pages/CreateUniversity.tsx";
import CreateInstructor from "./pages/CreateInstructor.tsx";
import CreateFaculty from "./pages/CreateFaculty.tsx";
import CreateCourse from "./pages/CreateCourse.tsx";
import SendException from "./components/SendException.tsx";
import ExceptionList from "./components/ExceptionList.tsx";
import CreateGroup from "./pages/CreateGroup.tsx";
import CreateLecture from "./pages/CreateLecture.tsx";
import TablePage from "./pages/TablePage.tsx";
import SuggestCoures from "./pages/SuggestCoures.tsx";
import SuggestedTablePage from "./pages/SuggestedTablePage.tsx";
import FacultyPage from "./pages/FacultyPage.tsx";
import InstructorPage from "./pages/InstructorPage.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import CourseEdit from "./pages/CourseEdit.tsx";
import LectureEdit from "./pages/LectureEdit.tsx";
axios.defaults.baseURL = "http://localhost:5261";
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/suggest" element={<SuggestCoures />} />
      <Route path="/suggestedtable" element={<SuggestedTablePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/university/create" element={<CreateUniversity />} />
      <Route path="/admin/faculty" element={<FacultyPage />} />
      <Route path="/admin/faculty/create" element={<CreateFaculty />} />
      <Route path="/admin/instructor" element={<InstructorPage />} />
      <Route path="/admin/instructor/create" element={<CreateInstructor />} />
      <Route path="/admin/course/create" element={<CreateCourse />} />
      <Route path="/admin/course/edit/:id" element={<CourseEdit />} />
      <Route path="/admin/course" element={<CoursePage />} />
      <Route path="/admin/group/bycourse/:courseID" element={<GroupPage />} />
      <Route path="/admin/group/create" element={<CreateGroup />} />
      <Route path="/admin/lecture/edit/:id" element={<LectureEdit />} />
      <Route path="/admin/lecture/create" element={<CreateLecture />} />
      <Route path="/sendexception" element={<SendException />} />
      <Route path="/adminexceptionspanel" element={<ExceptionList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
