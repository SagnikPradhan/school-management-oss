import styled from "styled-components"

export const Input = styled.input`
  border: none;

  font-family: ${( props ) => props.theme.fonts[2]};
  font-size: 0.9rem;
  padding: 0.85em;
  background: ${({ theme: { palette } }) => palette[3]};

  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
  border-radius: 1px solid rgba(0, 0, 0, 0.5);
  margin: 0;
`

export default Input
