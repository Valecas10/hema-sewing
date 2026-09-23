const API_URL = "http://localhost:3000/api";

export interface GalleryImage {
    id: number;
    url: string;
    alt: string;
    order: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export async function getGallery(): Promise<
    GalleryImage[]
> {
    const response = await fetch(
        `${API_URL}/gallery`
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener la galería"
        );
    }

    return response.json();
}