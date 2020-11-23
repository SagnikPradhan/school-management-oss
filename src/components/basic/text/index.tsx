import styled from "styled-components"

interface TextProps {
  pad?: boolean
  bold?: boolean
  size?: 1 | 2 | 3
}

export const Text = styled.p<TextProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  margin: 0;
  gap: 1ch;

  font-size: ${({ size }) =>
    size === 1 ? "4rem" : size === 2 ? "2.5rem" : "1rem"};

  padding: ${({ pad }) => (pad ? "1em 0" : "0")};

  font-weight: ${({ size, bold }) =>
    (size === 1 ? 700 : size === 2 ? 500 : 400) + (bold ? 200 : 0)};
`
