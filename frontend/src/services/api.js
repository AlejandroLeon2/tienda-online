const BASE_URL = 'http://localhost:3000/api';


export const Auth = {
    getUsers: async () => {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);// Devuelve los datos en formato JSON

    },

    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },

    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    }
};



export async function getPedidos() {
    try {
        const response = await fetch(`${BASE_URL}/pedidos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching pedidos: ${response.statusText}`);
        }
        return await response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
        console.error('Error fetching pedidos:', error.message);
        throw error;
    }
}

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error en la solicitud');
    }
    return response.json();
};

export const Product = {
    getProductos: async () => {
        const response = await fetch(`${BASE_URL}/productos`);
        return handleResponse(response);
    },

    createProducto: async (productoData) => {
        const response = await fetch(`${BASE_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoData)
        });
        return handleResponse(response);
    },

    updateProducto: async (id, productoData) => {
        const response = await fetch(`${BASE_URL}/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoData)
        });
        return handleResponse(response);
    },

    deleteProducto: async (id) => {
        const response = await fetch(`${BASE_URL}/productos/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    }
};
