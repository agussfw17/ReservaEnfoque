import axios from "axios";
import { login } from "./middlewares/login.js";
import { activityCategory } from "./middlewares/activityCategory.js";
import { activityTime } from "./middlewares/activityTime.js";
import { scheduleActivity } from "./middlewares/scheduleActivity.js";

import { weekUsers } from "./utils/exportWeekUsers.js";

import dotenv from "dotenv";
dotenv.config();

for (const user of weekUsers) {
	console.log("Inicio reserva para: ", user.name);

	const { id, token } = await login(user);

	console.log('id', id);
	console.log('token', token);

	const activityCatId = await activityCategory(token);

	console.log('activityCatId', activityCatId);

	const dow = [1,3,5]; /*Lunes, Miércoles y Viernes*/

	for (const day of dow) {
		const activityId = await activityTime(token, id, activityCatId, dow);

		const body = {
			usr: id,
			at: activityId,
			day: 0,
			description: "",
		};

		const schedule = await scheduleActivity(body, token);
		if ( schedule >= 200 && schedule < 300) {
			console.log('✅ Reserva OK para el dia: ', day);
		}
	}
}
