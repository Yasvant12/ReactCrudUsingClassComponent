import axios from 'axios';

const studentUrl = 'http://localhost:3004/students';


export const getStudent = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${studentUrl}/${id}`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}
export const getStudentAll = async () => {
    try {
        return await axios.get(`${studentUrl}`);
    } catch (error) {
        console.log('Error while calling getStudentAll api ', error);
    }
}

export const addStudents = async (user) => {
    return await axios.post(`${studentUrl}`, user);
}

export const deleteStudents = async (id) => {
   
    try {
        console.log("Delete",id)
        return await axios.delete(`${studentUrl}/${id}`);
    } catch (error) {
        console.log('Error while calling deleting the api ', error);
    }
}

export const editStudents = async (id, user) => {
    return await axios.put(`${studentUrl}/${id}`, user)
}
