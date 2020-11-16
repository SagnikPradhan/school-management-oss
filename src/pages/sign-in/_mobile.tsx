import React from "react"

export const MobileSignIn: React.FC = () => {
  return (
    <div className="page">
      <div className="greeting">
        <h1 className="greeting">Hello</h1>
        <p className="secondary-greeting">Sign in to your account</p>
      </div>

      <form className="sign-in-form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
      </form>

      <button className="submit">
        <span>Sign In</span>
      </button>

      <div className="background first"></div>
      <div className="background second"></div>
      <div className="background third"></div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Roboto+Condensed&family=Work+Sans:wght@500&display=swap');

        .page {
          width: 100vw;
          height: 100vh;

          background: #0C120C;
          color: white;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5.5vh;
        }

        div.greeting {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        div.greeting h1.greeting {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 72px;
          line-height: 84px;
          font-style: normal;
          font-weight: bold;

          display: flex;
          align-items: center;
          text-align: center;

          background: linear-gradient(86.19deg, #73C1C6 32.65%, #FFCBDD 71.25%);
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;

          margin: 18px;
        }

        div.greeting p.secondary-greeting {
          font-family: 'Montserrat', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          display: flex;
          align-items: center;
          text-align: center;
        }

        form.sign-in-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        form.sign-in-form label {
          font-family: 'Work Sans', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          display: flex;
          align-items: center;
        }

        form.sign-in-form input {
          font-family: 'Work Sans', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          padding: 0.5em;
          border-radius: 5px;
          border: none;
          margin: 10px 0;
          min-width: 70vw;
        }

        button.submit {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;

          border: none;
          z-index: 100;

          background: linear-gradient(95.68deg, #FFCBDD -20.47%, #73C1C6 62.22%);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
        }

        button.submit span {
          font-family: 'Work Sans', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          padding: 0.65em 5ch;
        }
        
        div.background {
          border-radius: 100%;
          background: linear-gradient(180deg, #FFCBDD 0%, #73C1C6 100%);
          position: fixed;
          z-index: 0;
        }

        div.background.first {
          width: 180px;
          height: 180px;
          left: 236px;
          top: -55px;
        }

        div.background.second {
          width: 210px;
          height: 210px;
          left: 221px;
          top: 676px;
        }

        div.background.third {
          width: 100px;
          height: 100px;
          left: -50px;
          top: 147px;
        }
      `}</style>
    </div>
  )
}

export default MobileSignIn
