import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const SkillsButton = styled(DisplayButtons)`
  background: #00a3ff;
  color: #ffffff;
  border: 1px solid #008ede;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const ForumsButton = styled(DisplayButtons)`
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
  :hover, :focus {
    background: #FFFFFF;
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
`;

const SignUpButton = styled(AuthButtons)`
  color: #ffffff;
  background: #00a3ff;
  margin-left: 16px;
`;

const LoginButton = styled(AuthButtons)`
  color: #00a3ff;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <One>
        <Link to="/">
          <img src={NavbarLogo} alt="Logo" />
        </Link>
      </One>
      <Two>
        <SkillsButton to="/Skills">Skills</SkillsButton>
        <ForumsButton to="/Forums">Forum</ForumsButton>
      </Two>
      <Three>
        <SearchBarContainer>
          <SearchIconStyled src={SearchIcon} alt="Logo" />
          <SearchBar type="text" placeholder="Search" />
        </SearchBarContainer>
      </Three>
      <Four>
        <LoginButton to="/login">Login</LoginButton>
        <SignUpButton to="/register">Sign Up</SignUpButton>
      </Four>
    </Wrapper>
  );
};

export default Navbar;
