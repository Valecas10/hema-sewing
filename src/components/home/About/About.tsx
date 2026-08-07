import Container from "../../ui/Container";
import Section from "../../ui/Section";

import { about } from "../../../data";

import "./About.css";

function About() {
    return (
        <Section>
            <Container>

                <div className="about">

                    <div className="about__image">
                        <img
                            src={about.image}
                            alt={about.imageAlt}
                        />
                    </div>

                    <div className="about__content">

                        <span className="about__subtitle">
                            {about.subtitle}
                        </span>

                        <h2 className="about__title">
                            {about.title}
                        </h2>

                        {about.paragraphs.map((paragraph, index) => (
                            <p key={index}>
                                {paragraph}
                            </p>
                        ))}

                    </div>

                </div>

            </Container>
        </Section>
    );
}

export default About;