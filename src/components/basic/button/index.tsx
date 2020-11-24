import styled from "styled-components"

interface ButtonProps {
  variant?: "primary" | "secondary"
}

const variants = {
  primary: "#8338EC",
  secondary: "#ff006e",
}

export const Button = styled.button<ButtonProps>`
  border: none;

  font-size: 0.9rem;
  font-family: "Open Sans", sans-serif;

  padding: 1em;

  display: flex;
  flex-direction: row;
  gap: 1ch;

  align-items: center;
  justify-content: center;
  vertical-align: center;

  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  color: ${({ variant }) => variants[variant || "primary"]};
  background: white;

  &:hover {
    box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.15);
    background: ${({ variant }) => variants[variant || "primary"]};
    color: white;
  }
`
