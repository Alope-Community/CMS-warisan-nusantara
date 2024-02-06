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

export const insertEvent = async (data: any, fileName: String) => {
  try {
    let result = await axios.post(`http://127.0.0.1:8000/api/event`, {
      title: data.title,
      description: data.description,
      banner: fileName,
      startedDate: data.startedDate,
      startedTime: data.startedTime,
      endedDate: data.endedDate,
      endedTime: data.endedTime,
      fee: data.fee,
      location: data.location,
      for: data.for,
    });
    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const updateEvent = async (data: any, id: Number, fileName: String) => {
  try {
    let result = await axios.patch(`http://127.0.0.1:8000/api/event/${id}`, {
      title: data.title,
      description: data.description,
      banner: fileName,
      startedDate: data.startedDate,
      startedTime: data.startedTime,
      endedDate: data.endedDate,
      endedTime: data.endedTime,
      fee: data.fee,
      location: data.location,
      for: data.for,
    });

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
