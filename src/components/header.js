import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #37474F;
  padding: 0rem;
  color: #fff;
`;

const HeaderLogo = styled.h1`
  font-size: 3rem;
  border: solid 3px white;
  padding: 0.1rem 0.5rem 0.5rem 0.3rem;
  width: 4.2rem;
  height: 4.2rem;
  position: relative;
  background: linear-gradient(to top left, #fff, #fff, #33333300);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-position: 0 0;
  transition: 0.5s ease-out all;

  span {
    position: absolute;
    right: 0.4rem;
    bottom: 0rem;
    background: linear-gradient(to bottom right, #fff, #fff, #33333300);
    background-position: 0 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: 0.5s ease-out all;
  }

  &:hover {
    background-position: -60px -60px;
    border-color: #ffffff99;

    span {
      background-position: 32px 49px;
    }
  }
`;


const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <HeaderLogo style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >D<span>S</span></Link>
      </HeaderLogo>
    </div>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
