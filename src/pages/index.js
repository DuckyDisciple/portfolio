import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import styled from 'styled-components';

import hero from '../images/hero.jpg';

//SAMPLE DATA
const projects = [
  { name: "Test 1" },
  { name: "Test 2" },
  { name: "Test 3" },
  { name: "Test 4" },
  { name: "Test 5" }
];

const Hero = styled.section`
  background-color: #000;
  width: 100%;
  min-height: 30rem;
  padding: 3rem;
  position: relative;

  &::before {
    background-image: url(${hero});
    background-size: cover;
    background-position: right bottom;
    filter: grayscale(70%);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    content: '';
    opacity: 0.6;
  }
`;

const ProjectSection = styled.section`
  background: #fff;
  width: 100%;
  padding: 3rem;
  text-align: center;
`;

const ProjectWrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(10rem, 1fr);
  grid-gap: 1rem;
  justify-content: center;
  justify-items: center;
`;

const HeroTitle = styled.h1`
  text-transform: uppercase;
  color: white;
  opacity: 0.99;
`;

const HeroText = styled.p`
  color: white;
  width: 50%;
  opacity: 0.99;
`;

const getTimeOfDay = () => {
  const now = new Date();
  if (now.getHours() < 12) {
    return 'morning';
  } else if (now.getHours() < 20) {
    return 'afternoon';
  }
  return 'evening';
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero>
      <HeroTitle>Good {getTimeOfDay()}!</HeroTitle>
      <HeroText>I'm Drew! I've been writing code for the past 15 years. While the content
        and quality have changed, my passion has never died down. My newest ventures
        have led me into web development, with a focus on using some of the latest
        technologies to make sites fast, responsive, and pleasing to use.</HeroText>
      <HeroText>If you're curious what type of work I've done, check out the projects
        below. These are just some samples to show variety in the different types
        of apps and sites I have made. If you have a project in mind, feel free
        to reach out and we can talk about options for your development needs!</HeroText>
    </Hero>
    <ProjectSection>
      <h2>Projects</h2>
      <ProjectWrapper>
        {projects.map(project => {
          return <Project>{project.name}</Project>
        })}
      </ProjectWrapper>
    </ProjectSection>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout >
)

export default IndexPage
