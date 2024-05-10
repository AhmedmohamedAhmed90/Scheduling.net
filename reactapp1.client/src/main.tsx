import React from "react";
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
axios.defaults.baseURL = "http://localhost:5261";
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/university/create" element={<CreateUniversity />} />
      <Route path="/admin/faculty/create" element={<CreateFaculty />} />
      <Route path="/admin/instructor/create" element={<CreateInstructor />} />
      <Route path="/admin/course/create" element={<CreateCourse />} />
      <Route path="/admin/group/create" element={<CreateGroup />} />
      <Route path="/sendexception" element={<SendException />} />
      <Route path="/adminexceptionspanel" element={<ExceptionList />} />
      {/* <Route path="" element={<ProtectedRoute />}>
        <Route path="/payment" element={<PaymentMethodPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Route> */}
      {/* Admin Users */}
      {/* <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="user/:id" element={<UserEditPage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="product/:id" element={<ProductEditPage />} />
        <Route path="orders" element={<OrderListPage />} />
      </Route>*/}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
