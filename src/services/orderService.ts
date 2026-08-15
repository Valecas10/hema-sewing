const API_URL = "http://localhost:3000/api";

interface OrderItemInput {
    productId: number;
    quantity: number;
}

export interface CreateOrderData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: "pickup" | "shipping";
    address?: string;
    city?: string;
    postalCode?: string;
    items: OrderItemInput[];
}

export async function createOrder(
    data: CreateOrderData
) {
    const response = await fetch(
        `${API_URL}/orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "Error al crear la orden"
        );
    }

    return result;
}