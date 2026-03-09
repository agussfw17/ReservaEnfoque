export async function activityCategory(token) {
    const res = await fetch(process.env.URL_CATEGORY, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const deporte = data.description.find(d => d.name === "Deportes");

    const deporteId = deporte ? deporte.id : null;
    return deporteId;
}