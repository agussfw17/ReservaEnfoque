export async function activityTime(token, userId, activityId) {
  try {

    console.log('token',token);
    console.log('userId',userId);
    console.log('activityId',activityId);

    const now = new Date();
    const dow = now.getDay();

    const URL_TIME = process.env.URL_TIME
    console.log('URL_TIME',URL_TIME);

    const url = process.env.URL_TIME
      .replace('{id}', activityId)
      .replace('{dow}', dow)
      .replace('{userId}', userId);

    console.log('url',url);
    
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    
   
    const volley = data.description.find(
        d => d.name === 'Volley Intermedio/Avanzado'
      );
      return volley.id || null;

  } catch (err) {
    console.error('Error en getActivityTime:', err.message);
    throw err;
  }
}