const API_URL = "http://localhost:3000/api";

interface AdminLoginData {
    email: string;
    password: string;
}

interface AdminLoginResponse {
    token: string;
    admin: {
        id: number;
        email: string;
    };
}

export async function loginAdmin(
    data: AdminLoginData
): Promise<AdminLoginResponse> {
    const response = await fetch(
        `${API_URL}/admin/login`,
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
                "No se pudo iniciar sesión"
        );
    }

    return result;
}

export interface AdminDashboardData {
    productsCount: number;
    ordersCount: number;

    lowStockProducts: {
        id: number;
        name: string;
        stock: number;
    }[];

    recentOrders: {
        id: number;
        firstName: string;
        lastName: string;
        total: number;
        createdAt: string;
    }[];
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo cargar el dashboard"
        );
    }

    return result;
}

export interface AdminProduct {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    featured: boolean;
    embroidery: boolean;

    category: {
        id: number;
        name: string;
        slug: string;
    };

    fabric: {
        id: number;
        name: string;
        slug: string;
    };

    images: {
        id: number;
        url: string;
        alt: string | null;
        order: number;
    }[];
}

export async function getAdminProducts(): Promise<
    AdminProduct[]
> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/products`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudieron cargar los productos"
        );
    }

    return result;
}

export interface AdminCategory {
    id: number;
    name: string;
    slug: string;
}

export interface AdminFabric {
    id: number;
    name: string;
    slug: string;
}

export interface CreateAdminProductData {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    featured: boolean;
    embroidery: boolean;
    categoryId: number;
    fabricId: number;
    images: {
        url: string;
        alt?: string;
        order: number;
    }[];
}

export async function createAdminProduct(
    data: CreateAdminProductData
) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/products`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo crear el producto"
        );
    }

    return result;
}

export async function getAdminProduct(
    id: number
): Promise<AdminProduct> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo cargar el producto"
        );
    }

    return result;
}

export async function updateAdminProduct(
    id: number,
    data: {
        name: string;
        slug: string;
        description: string;
        price: number;
        stock: number;
        featured: boolean;
        embroidery: boolean;
        categoryId: number;
        fabricId: number;
        images: {
            url: string;
            alt?: string;
            order: number;
        }[];
    }
) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/products/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo actualizar el producto"
        );
    }

    return result;
}

export interface AdminCategory {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

export async function getAdminCategories(): Promise<
    AdminCategory[]
> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/categories`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudieron cargar las categorías"
        );
    }

    return result;
}

export async function createAdminCategory(data: {
    name: string;
    slug: string;
    image?: string;
    description?: string;
}) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/categories`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo crear la categoría"
        );
    }

    return result;
}

export async function getAdminCategory(
    id: number
): Promise<AdminCategory> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/categories/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo cargar la categoría"
        );
    }

    return result;
}

export async function updateAdminCategory(
    id: number,
    data: {
        name: string;
        slug: string;
        image?: string;
        description?: string;
    }
) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/categories/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo actualizar la categoría"
        );
    }

    return result;
}

export interface AdminFabric {
    id: number;
    name: string;
    slug: string;
}

export async function getAdminFabrics(): Promise<
    AdminFabric[]
> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/fabrics`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudieron cargar las telas"
        );
    }

    return result;
}

export async function getAdminFabric(
    id: number
): Promise<AdminFabric> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/fabrics/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo cargar la tela"
        );
    }

    return result;
}

export async function createAdminFabric(data: {
    name: string;
    slug: string;
}) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/fabrics`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo crear la tela"
        );
    }

    return result;
}

export async function updateAdminFabric(
    id: number,
    data: {
        name: string;
        slug: string;
    }
) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/fabrics/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo actualizar la tela"
        );
    }

    return result;
}

export async function deleteAdminFabric(
    id: number
) {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/fabrics/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const result = await response.json();

        throw new Error(
            result.message ||
                "No se pudo eliminar la tela"
        );
    }
}

export interface AdminOrderItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface AdminOrder {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    address: string | null;
    city: string | null;
    postalCode: string | null;
    total: number;
    status: string;
    createdAt: string;
    items: AdminOrderItem[];
}

export async function getAdminOrders(): Promise<
    AdminOrder[]
> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/orders`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudieron cargar los pedidos"
        );
    }

    return result;
}

export async function getAdminOrder(
    id: number
): Promise<AdminOrder> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/orders/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo cargar el pedido"
        );
    }

    return result;
}

export async function updateAdminOrderStatus(
    id: number,
    status: string
): Promise<AdminOrder> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/admin/orders/${id}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                status,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo actualizar el estado"
        );
    }

    return result;
}