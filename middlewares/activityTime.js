import axios from "axios";

export async function activityTime(token, userId, activityId, dow) {
  try {
    const res = await axios.get(`${process.env.URL_BASE}/activitytime/?id=${activityId}&dow=${dow}&userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = res.data;
   
    const volley = data.description.find(
        d => d.name === 'Volley Intermedio/Avanzado'
      );
      return volley.id || null;

  } catch (err) {
    console.error('Error en getActivityTime:', err.message);
    throw err;
  }
}