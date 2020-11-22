import React from "react"
import styled from "styled-components"
import { lighten } from "polished"

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type: "button" | "submit" | "reset" | undefined
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{ children }</button>
}

export default styled( Button )`
  font-weight: 500;
  font-family: ${( props ) => props.theme.fonts[1]};
  font-size: 1rem;
  text-transform: capitalize;

  padding: 0.65em 1em;

  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);

  background: ${({ theme: { palette } }) => palette[0]};
  color: white;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    background: ${({ theme: { palette } }) => lighten( 0.1, palette[0] )};
  }
`
