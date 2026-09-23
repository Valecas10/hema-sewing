import {
    useEffect,
    useState,
} from "react";

import Container from "../../ui/Container";
import Section from "../../ui/Section";

import hero1 from "../../../assets/images/hero/hero-1.webp";
import hero2 from "../../../assets/images/hero/hero-2.webp";
import hero3 from "../../../assets/images/hero/hero-3.webp";

import {
    getGallery,
    type GalleryImage,
} from "../../../services/galleryService";

import "./Hero.css";

const fallbackImages: GalleryImage[] = [
    {
        id: 1,
        url: hero1,
        alt: "Hema Sewing",
        order: 0,
        active: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: 2,
        url: hero2,
        alt: "Hema Sewing",
        order: 1,
        active: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: 3,
        url: hero3,
        alt: "Hema Sewing",
        order: 2,
        active: true,
        createdAt: "",
        updatedAt: "",
    },
];

function Hero() {
    const [images, setImages] =
        useState<GalleryImage[]>(
            fallbackImages
        );

    const [currentIndex, setCurrentIndex] =
        useState(0);

    useEffect(() => {
        async function loadGallery() {
            try {
                const gallery =
                    await getGallery();

                const activeImages =
                    gallery
                        .filter(
                            (image) =>
                                image.active
                        )
                        .sort(
                            (a, b) =>
                                a.order -
                                b.order
                        );

                if (
                    activeImages.length > 0
                ) {
                    setImages(
                        activeImages
                    );
                }
            } catch (error) {
                console.error(
                    "Error al cargar la galería:",
                    error
                );
            }
        }

        loadGallery();
    }, []);

    useEffect(() => {
        if (images.length <= 1) {
            return;
        }

        const interval =
            window.setInterval(() => {
                setCurrentIndex(
                    (current) =>
                        (current + 1) %
                        images.length
                );
            }, 4000);

        return () => {
            window.clearInterval(
                interval
            );
        };
    }, [images.length]);

    function getImage(
        position: number
    ) {
        if (images.length === 0) {
            return null;
        }

        const index =
            (currentIndex +
                position) %
            images.length;

        return images[index];
    }

    const firstImage =
        getImage(0);

    const secondImage =
        getImage(1);

    const thirdImage =
        getImage(2);

    return (
        <Section>
            <Container>
                <div className="hero">

                    <div className="hero__content">

                        <span className="hero__subtitle">
                            Handmade with love
                        </span>

                        <h1 className="hero__title">
                            HEMA SEWING
                        </h1>

                        <p className="hero__description">
                            Productos textiles
                            confeccionados
                            artesanalmente.
                            Diseños únicos,
                            realizados con
                            dedicación para
                            acompañarte todos
                            los días.
                        </p>

                    </div>

                    <div className="hero__gallery">

                        {firstImage && (
                            <div className="hero__card">
                                <img
                                    key={`first-${firstImage.id}`}
                                    src={
                                        firstImage.url
                                    }
                                    alt={
                                        firstImage.alt ||
                                        "Hema Sewing"
                                    }
                                />
                            </div>
                        )}

                        {secondImage && (
                            <div className="hero__card">
                                <img
                                    key={`second-${secondImage.id}`}
                                    src={
                                        secondImage.url
                                    }
                                    alt={
                                        secondImage.alt ||
                                        "Hema Sewing"
                                    }
                                />
                            </div>
                        )}

                        {thirdImage && (
                            <div className="hero__card">
                                <img
                                    key={`third-${thirdImage.id}`}
                                    src={
                                        thirdImage.url
                                    }
                                    alt={
                                        thirdImage.alt ||
                                        "Hema Sewing"
                                    }
                                />
                            </div>
                        )}

                    </div>

                </div>
            </Container>
        </Section>
    );
}

export default Hero;