// src/hooks/useAxios.js
import { useState, useEffect } from 'react';
import axios from 'axios';

// Create an axios instance with the base URL
export const axiosInstance = axios.create({
   baseURL: '/api', // Set your base URL here
  // baseURL:"http://192.168.1.57:8000/api"
});

const useAxios = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance({ url, method, data: body });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
};

export default useAxios;
