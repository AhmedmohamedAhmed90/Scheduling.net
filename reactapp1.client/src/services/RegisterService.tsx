import axios from "axios";

export interface Register {
    name: string;
    username: string;
    email: string;
    password: string;
    address: string;
    age: number;
    year: string;
    faculty: string;
    phoneNumbe: string;
}
export const addUser = async (Register: Register) => {
    return await axios.post("/api/account/register", Register);
  };