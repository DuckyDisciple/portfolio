/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from 'styled-components';

import Header from "./header"
import "./layout.css"
import hero from '../images/hero.jpg';

const Footer = styled.footer`
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  color: #ffffffdd;
  font-size: 0.5rem;

  a {
    color: #ffffffaa;
    text-decoration: none;

    &:hover {
      color: #ffffffdd;
    }
  }
`;

const Page = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #00000066;

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
    z-index: -1;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Page>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          <main>{children}</main>
          <Footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Footer>
        </div>
      </Page>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
