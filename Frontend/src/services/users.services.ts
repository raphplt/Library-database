import { api } from "./index";

export const fetchUsers = async () => {
  return await api.get(`/users/getUsers`).then((response) => response.data);
};

export const fetchEmployees = async () => {
  return await api.get(`/users/getemployees`).then((response) => response.data);
};

export const searchUsers = async (query: any) => {
  return await api
    .get(`/users/search?query=${query}`)
    .then((response) => response.data);
};

export const searchOneUser = async (id: number) => {
  return await api
    .get(`/users/searchOne?query=${id}`)
    .then((response) => response.data);
};

export const fetchUser = async (query: any) => {
  return await api
    .get(`/users/searchOne?query=${query}`)
    .then((response) => response.data);
};

export const login = async (email: string, password: string) => {
  return await api
    .post(`/users/login`, {
      email: email,
      password: password,
    })
    .then((response) => response.data);
};

export const register = async (firstName:string, lastName:string, email:string, password:string, phone:string) => {
  return await api
    .post(`/users/register`, {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      password: password,
    })
    .then((response) => response.data);
};

export const updateUser = async (query: any) => {
  return await api.put(`/users/${query.id}`, { data: query.data });
};

export const deleteUser = async (query: any) => {
  return await api.delete(`/users/${query}`);
};
