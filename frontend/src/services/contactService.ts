const API_URL = "http://localhost:3000/api";

export interface ContactInfo {
    email: string;
    phone: string;

    instagram: string | null;
    facebook: string | null;
    tiktok: string | null;
    whatsapp: string | null;

    instagramEnabled: boolean;
    facebookEnabled: boolean;
    tiktokEnabled: boolean;
    whatsappEnabled: boolean;
}

export async function getContactInfo(): Promise<ContactInfo> {
    const response = await fetch(
        `${API_URL}/contact`
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
                "No se pudo cargar la información de contacto"
        );
    }

    return result;
}