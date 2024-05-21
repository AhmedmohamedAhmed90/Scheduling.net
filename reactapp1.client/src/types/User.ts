export interface User {
  userName: string;
  id: string;
  address: string;
  email: string;
  token: string;
  role: string;
  isAdmin: boolean;
  universityID: number;
}
export interface Admin extends User {}
export interface Student extends User {
  facultyID: number;
  year: string;
  age: number;
}
export interface userReturn {
  userName: string;
  email: string;
  role: string;
  isAdmin: boolean;
  id: string;
  token: string;
  universityID: number;
}

// facultyID: number;
// {
//   "userName": null,
//   "email": "user@ex222ample.com",
//   "role": "Admin",
//   "isAdmin": true,
//   "id": "e34eb309-d2ac-4f7e-97e9-eeedada02d0d",
// }
