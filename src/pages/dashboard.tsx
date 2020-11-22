import React from "react"
import styled from "styled-components"
import { useCalendar } from "workspace/web/components/calendar"

const Grid = styled.div`
  height: 100vh;
  display: grid;

  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(10, 1fr);

  font-family: sans-serif;

  background: #1B2021;
`

const TopNavbar = styled.nav`
  display: flex;
  flex-direction: row;

  grid-row: 1 / span 1;
  grid-column:  1 / span all;
  border-bottom: 1px solid #292929;
`

const SideNavbar = styled.nav`
  display: flex;
  flex-direction: column;

  grid-row: 1 / span all;
  grid-column: 1 / span 1;
  border-right: 1px solid #292929;
`

export default function Dashboard(): React.ReactChild {
  const [ Calendar ] = useCalendar()

  return (
    <Grid>
      <TopNavbar></TopNavbar>
      <SideNavbar></SideNavbar>

      { Calendar }
    </Grid>
  )
}
