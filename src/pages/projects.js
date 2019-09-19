import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Project from '../components/project';
import SEO from '../components/seo';

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

const ProjectsPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO title="projects" />
      <ProjectSection>
        <h2>Projects</h2>
        <ProjectWrapper>
          {projects && projects
            .filter(p => p.node.frontmatter.type === 'project')
            .map(project => (<Project data={project} />)
            )}
        </ProjectWrapper>
      </ProjectSection>
    </Layout>
  )
}

export default ProjectsPage;

export const projectQuery = graphql`
  query ProjectQuery {
    allMarkdownRemark(sort: {
      fields: frontmatter___order
    }) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            type
            thumbnail 
          }
        }
      }
    }
  }
`