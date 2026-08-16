import Container from "../../ui/Container";
import Section from "../../ui/Section";
import hero1 from "../../../assets/images/hero/hero-1.webp";
import hero2 from "../../../assets/images/hero/hero-2.webp";
import hero3 from "../../../assets/images/hero/hero-3.webp";

import "./Hero.css";

function Hero() {
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
                            Productos textiles confeccionados artesanalmente.
                            Diseños únicos, realizados con dedicación para acompañarte todos los días.
                        </p>

                    </div>

                    <div className="hero__gallery">

                        <div className="hero__card">
                            <img
                                src={hero1}
                                alt="Hero"
                            />
                        </div>

                        <div className="hero__card">
                            <img
                                src={hero2}
                                alt="Hero"
                            />
                        </div>

                        <div className="hero__card">
                            <img
                                src={hero3}
                                alt="Hero"
                            />
                        </div>

                    </div>

                </div>
            </Container>
        </Section>
    );
}

export default Hero;