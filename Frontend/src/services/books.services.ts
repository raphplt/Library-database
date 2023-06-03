import { api } from "./index";

export const fetchBooks = async () => {
  return await api.get(`/books`).then((response) => response.data);
};

export const searchBooks = async (query: any) => {
  return await api
    .get(`/books/search?query=${query}`)
    .then((response) => response.data);
};

export const fetchBook = async (query: any) => {
  return await api
    .get(`/books/searchOne?query=${query}`)
    .then((response) => response.data);
};

export const updateBook = async (query: any) => {
  return await api.put(`/books/${query.id}`, { data: query.data });
};

export const createBook = async (query: any) => {
  query = query.data;
  return await api.post(`/books`, { query });
};

export const deleteBook = async (query: any) => {
  return await api.delete(`/books/${query}`);
};

export const searchByUser = async (query: any) => {
  return await api
    .get(`/books/searchByUser?query=${query}`)
    .then((response) => response.data);
};