import {
    useEffect,
    useRef,
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


interface HeroFrame {
    current: GalleryImage;
    incoming: GalleryImage | null;
}


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


function getImageUrl(url: string) {

    /*
     * Imágenes externas
     */
    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }


    /*
     * Imágenes subidas al backend
     */
    if (url.startsWith("/uploads/")) {
        return `http://localhost:3000${url}`;
    }


    /*
     * Imágenes locales importadas por Vite
     */
    return url;
}


function Hero() {

    const [images, setImages] =
        useState<GalleryImage[]>(
            fallbackImages
        );


    const [frames, setFrames] =
        useState<HeroFrame[]>([
            {
                current: fallbackImages[0],
                incoming: null,
            },
            {
                current: fallbackImages[1],
                incoming: null,
            },
            {
                current: fallbackImages[2],
                incoming: null,
            },
        ]);


    /*
     * Imágenes que todavía no están visibles.
     */
    const availableImages =
        useRef<GalleryImage[]>([]);


    /*
     * Referencia de los frames actuales.
     *
     * Esto evita depender del updater de React
     * para modificar la cola de imágenes.
     */
    const framesRef =
        useRef<HeroFrame[]>([
            {
                current: fallbackImages[0],
                incoming: null,
            },
            {
                current: fallbackImages[1],
                incoming: null,
            },
            {
                current: fallbackImages[2],
                incoming: null,
            },
        ]);


    /*
     * 0 → izquierda
     * 1 → centro
     * 2 → derecha
     */
    const frameIndex =
        useRef(0);


    /*
     * Evita iniciar una nueva transición
     * mientras todavía está terminando
     * la anterior.
     */
    const transitioning =
        useRef(false);


    const transitionTimeout =
        useRef<number | null>(null);


    /*
     * ==================================================
     * MANTENER EL REF SINCRONIZADO
     * ==================================================
     */

    useEffect(() => {

        framesRef.current = frames;

    }, [frames]);


    /*
     * ==================================================
     * CARGAR GALERÍA DESDE EL BACKEND
     * ==================================================
     */

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


                /*
                 * Necesitamos al menos
                 * tres imágenes para el Hero.
                 */
                if (
                    activeImages.length >= 3
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


    /*
     * ==================================================
     * PRECARGAR IMÁGENES
     * ==================================================
     */

    useEffect(() => {

        images.forEach((image) => {

            const img =
                new Image();

            img.src =
                getImageUrl(
                    image.url
                );

        });

    }, [images]);


    /*
     * ==================================================
     * INICIALIZAR / REINICIAR CARRUSEL
     * ==================================================
     */

    useEffect(() => {

        if (images.length < 3) {
            return;
        }


        const initialFrames: HeroFrame[] = [
            {
                current: images[0],
                incoming: null,
            },
            {
                current: images[1],
                incoming: null,
            },
            {
                current: images[2],
                incoming: null,
            },
        ];


        setFrames(initialFrames);


        /*
         * IMPORTANTE:
         *
         * El resto de las imágenes
         * queda en la cola.
         */
        availableImages.current =
            images.slice(3);


        frameIndex.current = 0;

        transitioning.current = false;


        /*
         * Sincronizamos inmediatamente
         * el ref con el nuevo estado.
         */
        framesRef.current =
            initialFrames;


        return () => {

            if (
                transitionTimeout.current !== null
            ) {

                window.clearTimeout(
                    transitionTimeout.current
                );

                transitionTimeout.current =
                    null;
            }

        };

    }, [images]);


    /*
     * ==================================================
     * CARRUSEL AUTOMÁTICO
     * ==================================================
     *
     * Cada 4 segundos cambia solamente
     * una de las tres tarjetas.
     */

    useEffect(() => {

        if (images.length < 4) {
            return;
        }


        const interval =
            window.setInterval(() => {

                rotateFrame();

            }, 4000);


        return () => {

            window.clearInterval(
                interval
            );


            if (
                transitionTimeout.current !== null
            ) {

                window.clearTimeout(
                    transitionTimeout.current
                );

                transitionTimeout.current =
                    null;
            }

        };

    }, [images]);


    /*
     * ==================================================
     * CAMBIAR UNA TARJETA
     * ==================================================
     */

    function rotateFrame() {

        /*
         * No empezamos una transición
         * si todavía hay otra en curso.
         */
        if (transitioning.current) {
            return;
        }


        /*
         * No hacemos nada si no hay
         * imágenes esperando.
         */
        if (
            availableImages.current.length === 0
        ) {
            return;
        }


        /*
         * Qué tarjeta toca cambiar:
         *
         * 0 → izquierda
         * 1 → centro
         * 2 → derecha
         */
        const currentFrame =
            frameIndex.current;


        /*
         * Obtenemos el frame directamente
         * desde el ref.
         */
        const frame =
            framesRef.current[
                currentFrame
            ];


        if (!frame) {
            return;
        }


        /*
         * Sacamos UNA imagen de la cola.
         */
        const nextImage =
            availableImages.current.shift();


        if (!nextImage) {
            return;
        }


        /*
         * La imagen que estaba visible
         * vuelve al FINAL de la cola.
         *
         * Esto ocurre solamente una vez.
         */
        availableImages.current.push(
            frame.current
        );


        /*
         * Marcamos la transición como activa.
         */
        transitioning.current = true;


        /*
         * La próxima tarjeta:
         *
         * 0 → 1 → 2 → 0...
         */
        frameIndex.current =
            (frameIndex.current + 1) % 3;


        /*
         * Ponemos la nueva imagen
         * como incoming.
         */
        const updatedFrames =
            framesRef.current.map(
                (item, index) => {

                    if (
                        index !== currentFrame
                    ) {
                        return item;
                    }


                    return {
                        current:
                            item.current,

                        incoming:
                            nextImage,
                    };

                }
            );


        /*
         * Actualizamos el ref
         * inmediatamente.
         */
        framesRef.current =
            updatedFrames;


        /*
         * Actualizamos React.
         */
        setFrames(
            updatedFrames
        );


        /*
         * ==================================================
         * TERMINAR CROSSFADE
         * ==================================================
         *
         * El CSS dura 1.5 segundos.
         */

        transitionTimeout.current =
            window.setTimeout(() => {

                const completedFrames =
                    framesRef.current.map(
                        (item, index) => {

                            if (
                                index !==
                                currentFrame
                            ) {
                                return item;
                            }


                            if (
                                !item.incoming
                            ) {
                                return item;
                            }


                            return {

                                current:
                                    item.incoming,

                                incoming:
                                    null,

                            };

                        }
                    );


                /*
                 * Actualizamos primero
                 * el ref.
                 */
                framesRef.current =
                    completedFrames;


                /*
                 * Después React.
                 */
                setFrames(
                    completedFrames
                );


                /*
                 * Ya terminó la transición.
                 */
                transitioning.current =
                    false;


                transitionTimeout.current =
                    null;

            }, 1500);

    }


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

                        {frames.map(
                            (
                                frame,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="hero__card"
                                >

                                    {/*
                                     * IMAGEN ACTUAL
                                     *
                                     * Es la imagen
                                     * que estaba visible.
                                     */}

                                    <img
                                        className="hero__image hero__image--current"
                                        src={getImageUrl(
                                            frame.current.url
                                        )}
                                        alt={
                                            frame.current.alt ||
                                            "Hema Sewing"
                                        }
                                    />


                                    {/*
                                     * IMAGEN NUEVA
                                     *
                                     * Aparece durante
                                     * el crossfade.
                                     */}

                                    {frame.incoming && (

                                        <img
                                            className="hero__image hero__image--incoming"
                                            src={getImageUrl(
                                                frame.incoming.url
                                            )}
                                            alt={
                                                frame.incoming.alt ||
                                                "Hema Sewing"
                                            }
                                        />

                                    )}

                                </div>

                            )
                        )}

                    </div>

                </div>

            </Container>

        </Section>
    );
}


export default Hero;