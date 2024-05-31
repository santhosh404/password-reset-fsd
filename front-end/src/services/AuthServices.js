import axios from 'axios';

const BASE_URL = "https://password-reset-fsd.onrender.com/api/v1/auth";


export const signUp = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/sign-up`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const signIn = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/sign-in`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const forgotPassword = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/forgot-password`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const resetPassword = async (payload, id, token) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/reset-password/${id}/${token}`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 