import axios from "axios";

export default function axiosForUser(user = null) {
  let headers = {};

  if (user) {
    headers = { Authorization: `Bearer ${user.token}` };
  }

  return axios.create({
    headers
  });
}
