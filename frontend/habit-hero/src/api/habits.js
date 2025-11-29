import API from "./api";

export const getHabit = (id) => API.get(`habits/${id}/`);
export const updateHabit = (id, data) => API.put(`habits/${id}/`, data);
export const deleteHabit = (id) => API.delete(`habits/${id}/`);
export const createHabit = (data) => API.post(`habits/`, data);
export const getAllHabits = () => API.get(`habits/`);
