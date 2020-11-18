import styled from "styled-components"

interface LayoutProps {
  center?: boolean
  justify?: "space-evenly" | "space-around"
}

export const Layout = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;

  align-items: ${( props ) => props.center ? "center" : "flex-start"};
  justify-content: ${( props ) => props.center ? "center" : props.justify || "flex-start" };
`

export default Layout

export const FullPageLayout = styled( Layout )`
  height: 100vh;
  overflow: hidden;
`
