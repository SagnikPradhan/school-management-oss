import React from "react"

export const Page: React.FC<{ children: React.ReactNode }> = ({
  children 
}) => (
  <div className="page">
    { children }

    <style jsx>{`
      .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }
    `}</style>
  </div>
)
