import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';

const ProjectContainer = styled.header`
  background: #37474F;
  padding: 0rem;
  color: #fff;
`;

const Project = ({ data }) => (
  <ProjectContainer>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
    </div>
  </ProjectContainer>
)

Project.propTypes = {
  projectTitle: PropTypes.string,
}

Project.defaultProps = {
  projectTitle: ``,
}

export default Project
