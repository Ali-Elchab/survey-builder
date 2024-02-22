import axios from "axios";

export const requestData = async (route, method, data, headers = {}) => {
  const res = await axios({
    method: method,
    url: `http://localhost:8000/${route}`,
    data: data,
    headers: { "Content-Type": "application/json", ...headers },
  });
  return res;
};
