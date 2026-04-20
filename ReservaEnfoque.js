import axios from "axios";
import { login } from "./middlewares/login.js";
import { activityCategory } from "./middlewares/activityCategory.js";
import { activityTime } from "./middlewares/activityTime.js";
import { scheduleActivity } from "./middlewares/scheduleActivity.js";
import { getUser } from "./utils/exportUsers.js";

import dotenv from "dotenv";
dotenv.config();

const user = await getUser("LUZ");

const { id, token } = await login(user);

const activityCatId = await activityCategory(token);

const date = new Date();
const dow = date.getDay();

const activityId = await activityTime(token, id, activityCatId, dow);

const body = {
  usr: id,
  at: activityId,
  day: 0,
  description: "",
};

const INTERVAL_MS = 2000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let intento = 0;

while (true) {
  try {
    intento++;
    console.log(`Intento #${intento}`);

    const schedule = await scheduleActivity(body, token);
    if (schedule >= 200 && schedule < 300) {
      console.log("✅ Reserva OK para el dia: ", dow);
      break;
    }
  } catch (err) {
    console.error("❌ Error de red:", err.message);
  }
  await sleep(INTERVAL_MS);
}
