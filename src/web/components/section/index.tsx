import React from "react"

export const Field: React.FC<{
  title: string
  content: string
}> = ({ title, content }) => (
  <div className="field">
    <b className="title">{ title }</b>
    <p className="content">{ content }</p>

    <style jsx>{`
      .field {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .field .title {
        text-transform: capitalize;
      }
    `}</style>
  </div>
)
