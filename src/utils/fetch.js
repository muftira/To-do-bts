import axios from 'axios';

const baseUrl = "http://94.74.86.174:8080/api/";

export async function fetchData(
  fetchType,
  constApiUrl,
  objData,
  formData
) {
  let header= {
    'Content-Type': formData ? 'multipart/form-data' : 'application/json',
  };
  const token = JSON.parse(localStorage.getItem('token') ?? '{}');

  if (token) {
    header = {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios({
      url: baseUrl + constApiUrl,
      method: fetchType.toUpperCase(),
      headers: header,
      data: objData,
    });

    return {
      success: true,
      message: 'Success',
      data: response,
    };
  } catch (e) {
    return {
      success: false,
      message:  e.message,
    };
  }
}