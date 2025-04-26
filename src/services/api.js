const BASE_URL = 'http://localhost:3000/api';

export async function getUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }
        return await response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
}

export async function getProductos() {
    try {
        const response = await fetch(`${BASE_URL}/productos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching productos: ${response.statusText}`);
        }
        return await response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error fetching productos:', error.message);
        throw error;
    }
}
