import { YO, PABLO_BOLLA } from "../utils/exportUsers.js";

export async function login(user) {
  const URL_LOGIN = process.env.URL_LOGIN;

  const payload = {
    user: user.email,
    password: user.password,
  };
  try {
    const res = await fetch(URL_LOGIN, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const token = data.token;
    const id = data.description.id;

    return { id, token };
  } catch (err) {
    console.error("Error al hacer signin:", err.message);
  }
}

login(FARTO);
