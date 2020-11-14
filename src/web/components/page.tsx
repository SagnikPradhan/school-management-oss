import React from "react"

export const Page: React.FC<{
  children: React.ReactNode
  header?: React.ReactNode 
}> = ({
  header,
  children 
}) => (
  <div className="page">
    <div className="header">
      { header }
    </div>

    <div className="content">
      { children ? children :  <LoadingComponent />}
    </div>

    <style jsx>{`
      .page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 0 10vw;
      }

      @media only screen and (max-width: 768px) {
        .page {
          padding: 0 5vw;
        }
      }

      .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }

      .content {
        flex-grow: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
)

export const LoadingComponent: React.FC = () => {
  const messages = [
    "Loading your page",
    "Please wait some time",
    "How you doing today?",
    "Warming up"
  ]

  return (
    <div className="loading-message">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>

      <p>
        { messages[ Math.floor( Math.random() * messages.length ) ] }
      </p>

      <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100px;
      }

      div.loading-message svg {
        animation: rotate 1s infinite cubic-bezier(.68,-0.55,.27,1.55);
        color: #623CEA;
      }

      div.loading-message p {
        margin-top: auto;
      }

      @keyframes rotate {
        0% {
          transform: rotate(360deg);
          height: 2rem;
        }

        50% {
          height: 1.7rem;
        }

        100% {
          transform: rotate(0deg);
          height: 2rem;
        }
      }
    `}</style>
    </div>
  )
}
