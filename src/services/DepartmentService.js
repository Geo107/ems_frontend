import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/departments";

export const  listDepartment = () =>  axios.get(REST_API_BASE_URL);

export const  deleteDepartment = (id) =>  axios.get(REST_API_BASE_URL+ '/' +id);

export const createDepartment = (department) => axios.post(REST_API_BASE_URL, department);

export const getDepartment = (departmentId) => axios.get(REST_API_BASE_URL + '/' + departmentId);

export const updateDepartment = (departmentId, department) => axios.put(REST_API_BASE_URL + '/' + departmentId, department);