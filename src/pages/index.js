import React from "react"
import Layout from "../components/layout"

import SEO from "../components/seo"
import styled from 'styled-components';

const Hero = styled.section`
  width: 100%;
  min-height: 30rem;
  padding: 3rem;
  position: relative;
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
  </Layout >
)

export default IndexPage
