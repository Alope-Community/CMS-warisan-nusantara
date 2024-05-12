import axios from "axios";

export const login = async (data: any) => {
  try {
    let result = await axios.post(`http://127.0.0.1:8000/api/login`, data);
    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};
