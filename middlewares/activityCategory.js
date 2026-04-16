import axios from "axios";

export async function activityCategory(token) {
    try {
        const res = await axios.get(`${process.env.URL_BASE}/activitycategory/?from=FRONTEND`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });
        
        const data = res.data;
        
        if (!data) {
            throw new Error(`HTTP error! status: ${data.status}`);
        }

        const deporte    = data.description.find(d => d.name === "Deportes");

        const deporteId = deporte ? deporte.id : null;
        return deporteId;
    }catch (err) {
        console.error('Error en getActivityCategory:', err.message);
        throw err;
    }   
}  