// In api.js or your API utility file

import { axiosInstance } from '../hooks/useAxios';

export const fetchData = async (page, rowsPerPage) => {
    try {
        const response = await axiosInstance.get(`/dwm_form?page=${page}&limit=${rowsPerPage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
