import axios from "axios";

export const requestData = async (route, method, data, headers = {}) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const res = await axios({
    method: method,
    url: `http://localhost:8000/${route}`,
    data: formData,
    headers: { "Content-Type": "application/json", ...headers },
  });
  return res;
};
