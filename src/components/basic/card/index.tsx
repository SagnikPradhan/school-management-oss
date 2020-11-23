import styled from "styled-components"

export const Card = styled.div`
  display: flex;
  padding: 2rem;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  background: #ffbe0b;
  color: black;

  &:hover {
    box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.15);
  }
`
