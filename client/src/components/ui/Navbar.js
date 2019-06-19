import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import NavbarLogo from '../../assets/img/NavbarLogo.svg';
import SearchIcon from '../../assets/img/SearchIcon.svg';

const Wrapper = styled.section`
  display: flex;
  padding-left: 32px;
  padding-right: 32px;
  height: 48px;
  background: #ffffff;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
`;

const One = styled(NavContainer)``;

const Two = styled(NavContainer)`
  margin-left: 32px;
  margin-right: 16px;
`;

const DisplayButtons = styled(Link)`
  display: flex;
  width: 96px;
  height: 32px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
`;

const SkillsButtonActive = styled(DisplayButtons)`
  background: #00a3ff;
  color: #ffffff;
  border: 1px solid #008ede;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const SkillsButtonInactive = styled(DisplayButtons)`
  background: #f4f4f4;
  color: #00a3ff;
  border: 1px solid #cccccc;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const ForumsButtonActive = styled(DisplayButtons)`
  background: #00a3ff;
  color: #ffffff;
  border: 1px solid #008ede;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

const ForumsButtonInactive = styled(DisplayButtons)`
  background: #f4f4f4;
  color: #00a3ff;
  border: 1px solid #cccccc;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

const Three = styled(NavContainer)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  background: #f4f4f4;
  height: 40px;
  border: 0.5px solid #c4c4c4;
  border-radius: 5px;
  :hover,
  :focus {
    background: #ffffff;
    border-color: #00a3ff;
  }
`;

const SearchIconStyled = styled.img`
  margin-left: 16px;
  margin-right: 8px;
`;

const SearchBar = styled.input`
  flex: 1;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 16px;
  border: none;
  :focus {
    outline: none;
  }
`;

const Four = styled(NavContainer)`
  justify-content: flex-end;
  margin-left: 32px;
`;

const AuthButtons = styled(Link)`
  width: 120px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  border: 2px solid #00a3ff;
  :hover {
    opacity: 0.8;
  }
`;

const SignUpButton = styled(AuthButtons)`
  color: #ffffff;
  background: #00a3ff;
  margin-left: 16px;
`;

const LoginButton = styled(AuthButtons)`
  color: #00a3ff;
`;

const LogoutLink = styled.a`
  text-decoration: none;
`;

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [skillsPage, setSkillsPage] = useState(true);

  const authLinks = (
    <Four>
      <LogoutLink onClick={logout} href="#!">
        Logout
      </LogoutLink>
    </Four>
  );

  const guestLinks = (
    <Four>
      <LoginButton to="/login">Login</LoginButton>
      <SignUpButton to="/register">Sign Up</SignUpButton>
    </Four>
  );

  return (
    <Wrapper>
      <One>
        <Link to="/">
          <img src={NavbarLogo} alt="Logo" />
        </Link>
      </One>
      {skillsPage ? (
        <Two>
          <SkillsButtonActive to="/Skills">Skills</SkillsButtonActive>
          <ForumsButtonInactive
            onClick={() => setSkillsPage(false)}
            to="/Forums"
          >
            Forum
          </ForumsButtonInactive>
        </Two>
      ) : (
        <Two>
          <SkillsButtonInactive
            onClick={() => setSkillsPage(true)}
            to="/Skills"
          >
            Skills
          </SkillsButtonInactive>
          <ForumsButtonActive to="/Forums">Forum</ForumsButtonActive>
        </Two>
      )}
      <Three>
        <SearchBarContainer>
          <SearchIconStyled src={SearchIcon} alt="Logo" />
          <SearchBar type="text" placeholder="Search" />
        </SearchBarContainer>
      </Three>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Wrapper>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
