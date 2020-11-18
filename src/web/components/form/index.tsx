import styled from "styled-components"


export const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 2rem;

  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);

  background: ${({ theme: { palette } }) => palette[4]};
`

export default Form
