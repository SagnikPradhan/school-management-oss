import styled from "styled-components"
import React from "react"
import Input from "./input"

const FieldWrapper = styled.fieldset`
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: flex-start;
  border: none;

  font-family: ${( props ) => props.theme.fonts[0]};
  color: ${( props ) => props.theme.palette[4]};
`

type InputProps = React.HTMLProps<HTMLInputElement>

interface FieldProps {
  name: string
  type: string
  
  onSubmit?: InputProps["onSubmit"]
  onChange?: InputProps["onChange"]
}

export const Field: React.FC<FieldProps> = ({
  name, ...props
}) => {
  return (
    <FieldWrapper>
      <label htmlFor={ name }>{ name }</label>
      <Input { ...props } id={ name } />
    </FieldWrapper>
  )
}

export default Field
