const API_URL = "http://localhost:3000/api";

export async function getProducts() {
    const response = await fetch(
        `${API_URL}/products`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener los productos"
        );
    }

    return response.json();
}

export async function getProductBySlug(
    slug: string
) {
    const response = await fetch(
        `${API_URL}/products/${slug}`
    );

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }

        throw new Error(
            "Error al obtener el producto"
        );
    }

    return response.json();
}

export async function getCategories() {
    const response = await fetch(
        `${API_URL}/categories`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener las categorías"
        );
    }

    return response.json();
}

export async function getFabrics() {
    const response = await fetch(
        `${API_URL}/fabrics`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener las telas"
        );
    }

    return response.json();
}