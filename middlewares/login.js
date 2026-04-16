import axios from "axios";

export async function login(user) {
  try {
    const payload = {
      user: user.email,
      password: user.password,
    };

    const res = await axios.put(`${process.env.URL_BASE}/signin`, payload);
    const data = res.data;

    const token = data.token;
    const id = data.description.id;

    return { id, token };
  } catch (err) {
    console.error("Error al hacer signin:", err.message);
  }
}
