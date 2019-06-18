import React from 'react';
import styled from 'styled-components';

import SkillList from '../sections/SkillList';
import SkillDetails from '../sections/SkillDetails';

const Wrapper = styled.section`
  flex: 1;
  display: flex;
`;

const SkillsDisplay = () => {
  return (
    <Wrapper>
      <SkillList />
      <SkillDetails />
    </Wrapper>
  );
};

export default SkillsDisplay;
