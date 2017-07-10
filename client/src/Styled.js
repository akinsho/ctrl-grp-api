//Styled components
import styled, { css } from 'styled-components';

export const flex = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  width: 60%;
  height: auto;
  background-color: grey;
  margin: 1em;
  ${flex}
`;

export const Button = styled.button`
  width: 10em;
  height: 3em;
  border-radius: 4px;
  border: none;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  margin: 1em;
`;
