import { css, CSSObject } from "styled-components"

type TypographyVariants = "heading-primary" | "default"

const styles: Record<TypographyVariants, CSSObject> = {
  "heading-primary": {
    fontSize: "2rem",
    fontWeight: 600,
  },

  default: {
    fontSize: "0.9rem",
    fontFamily: "'Open Sans', sans-serif",
    lineHeight: "1.2",
  },
}

export function fontStyles(...variants: TypographyVariants[]) {
  let combinedStyles: CSSObject = {}
  for (const variant of ["default" as TypographyVariants, ...variants])
    combinedStyles = { ...combinedStyles, ...styles[variant] }
  return css(combinedStyles)
}
