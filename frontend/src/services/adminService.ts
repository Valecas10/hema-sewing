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

export async function getAdminCategories(): Promise<
    AdminCategory[]
> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/categories`,
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

export async function getAdminFabrics(): Promise<
    AdminFabric[]
> {
    const token =
        localStorage.getItem("adminToken");

    const response = await fetch(
        `${API_URL}/fabrics`,
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