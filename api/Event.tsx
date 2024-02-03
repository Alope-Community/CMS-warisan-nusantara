import axios from "axios";

export const getEvent = async () => {
  try {
    let result = await axios.get(`http://127.0.0.1:8000/api/event`);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const getEventById = async (id: Number) => {
  try {
    let result = await axios.get(`http://127.0.0.1:8000/api/event/${id}`);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const insertEvent = async (data: any) => {
  try {
    let result = await axios.post(`http://127.0.0.1:8000/api/event`, data);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const updateEvent = async (data: any, id: Number) => {
  try {
    let result = await axios.patch(
      `http://127.0.0.1:8000/api/event/${id}`,
      data
    );

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const deleteEvent = async (id: number) => {
  try {
    let result = await axios.delete(`http://127.0.0.1:8000/api/event/${id}`);

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};
