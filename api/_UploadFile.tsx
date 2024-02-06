import axios from "axios";

const uploadFile = async (data: any) => {
  try {
    let result = await axios.post(`http://127.0.0.1:8000/api/uploadfile`, data);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export default uploadFile;
