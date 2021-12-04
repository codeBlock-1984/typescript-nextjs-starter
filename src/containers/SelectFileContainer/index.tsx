import React from 'react';
import styled from 'styled-components';

interface ISelectFileContainer {
  headline: string;
}

type IProps = ISelectFileContainer;

const StyledHeadline = styled.h1`
  font-size: 18px;
  color: #2d0d85;
  font-family: Arial;
`;

const StyledContainer = styled.div`
  width: 300px;
  padding: 20px 0px;
  margin: 20px;
`;

export const SelectFileContainer: React.FC<IProps> = ({
  children,
  headline,
}) => (
  <StyledContainer>
    <StyledHeadline>{headline}</StyledHeadline>
    {children}
  </StyledContainer>
);
