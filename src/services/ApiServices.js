import axios from "axios";

const API_BASE_URL = "http://localhost:7000/";

export const getAllStudents = () => {
    return axios.get(`${API_BASE_URL}students`)
}

export const getStudent = (id) => {
    return axios.get(`${API_BASE_URL}student/${id}`)
}

export const deleteStudent = (id) => {
    return axios.delete(`${API_BASE_URL}student/${id}`)
}

export const updateStudent = (student) => {
    return axios.put(`${API_BASE_URL}student`, student)
}

export const saveStudent = (student) => {
    return axios.post(`${API_BASE_URL}student`, student)
}

export const getAllCourses = () => {
    return axios.get(`${API_BASE_URL}courses`)
}

export const getCourse = (id) => {
    return axios.get(`${API_BASE_URL}course/${id}`)
}

export const deleteCourse = (id) => {
    return axios.delete(`${API_BASE_URL}course/${id}`)
}

export const updateCourse = (student) => {
    return axios.put(`${API_BASE_URL}course`, student)
}

export const saveCourse = (student) => {
    return axios.post(`${API_BASE_URL}course`, student)
}

export const getAllResults = () => {
    return axios.get(`${API_BASE_URL}results`)
}

export const getResult = (id) => {
    return axios.get(`${API_BASE_URL}result/${id}`)
}

export const deleteResult = (id) => {
    return axios.delete(`${API_BASE_URL}result/${id}`)
}

export const updateResult = (student) => {
    return axios.put(`${API_BASE_URL}result`, student)
}

export const saveResult = (student) => {
    return axios.post(`${API_BASE_URL}result`, student)
}