import styled from "styled-components"

interface ButtonProps {
  variant?: 0 | 1
}

const variants = ["#8338EC", "#ff006e"]

export const Button = styled.button<ButtonProps>`
  border: none;

  font-size: 0.9rem;
  font-family: sans-serif;

  padding: 1em;

  display: flex;
  flex-direction: row;
  gap: 1ch;

  align-items: center;
  justify-content: center;
  vertical-align: center;

  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  color: ${({ variant }) => variants[variant || 0]};
  background: white;

  &:hover {
    box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.15);
    background: ${({ variant }) => variants[variant || 0]};
    color: white;
  }
`
