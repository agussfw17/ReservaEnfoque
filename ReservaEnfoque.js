import { login } from "./middlewares/login.js";
import { activityCategory } from "./middlewares/activityCategory.js";
import { activityTime } from "./middlewares/activityTime.js";

import {
  YO,
  PABLO_BOLLA,
  FARTO,
  LODEIRO,
  DELFI,
  ANA,
  JP,
  FIO,
  LUCAS,
} from "./utils/exportUsers.js";

import dotenv from "dotenv";
dotenv.config();

const { id, token } = await login(LUCAS);

console.log("id: ", id);
console.log("token: ", token);

const actividadCatId = await activityCategory(token);

console.log("actividadCatId: ", actividadCatId);

const actividadId = await activityTime(token, id, actividadCatId);
console.log("actividadId: ", actividadId);

const body = {
  usr: id,
  at: actividadId,
  day: 0,
  description: "",
};

console.log("body", body);

const INTERVAL_MS = 2000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function intentarReserva() {
  let intento = 0;

  while (true) {
    intento++;
    console.log(`Intento #${intento}`);

    try {
      const resp = await fetch(process.env.URL_RESERVA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const text = await resp.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      console.log("Status:", resp.status);
      console.log("Respuesta:", data);

      if (resp.ok) {
        console.log("✅ Request OK, corto el loop");
        break;
      }
    } catch (err) {
      console.error("❌ Error de red:", err.message);
    }

    await sleep(INTERVAL_MS);
  }
}

intentarReserva();
