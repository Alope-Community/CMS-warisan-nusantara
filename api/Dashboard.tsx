import axios from "axios";

export const getDashboard = async () => {
  try {
    let result = await axios.get(`http://127.0.0.1:8000/api/dashboard`);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};
