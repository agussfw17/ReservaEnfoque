import axios from "axios";

export async function scheduleActivity(body, token) {
	try {
		const res = await axios.post(`${process.env.URL_BASE}/reservation`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		console.log("Status:", res.status);
		console.log("Respuesta:", res.data);

		return res.status;
	} catch (err) {
		console.error("❌ Error de red:", err.message);
	}
}