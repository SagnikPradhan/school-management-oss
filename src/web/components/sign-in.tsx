import React from "react"
import Image from "next/image"
import { useForm } from "../hooks/form"
import * as z from "zod"

export const SignIn: React.FC = () => {
  const { register, state, error } = useForm()
  const emailSchema = z.string().email( "Email is invalid" )
  const passwordSchema = z.string().nonempty( "Password is empty" )

  return (
    <div className="sign-in-card">
      <div className="picture">
        <Image src="/welcome_cats.svg" width="400" height="auto" />
      </div>

      <form
        className="sign-in-form"
      >
        <div className="email field">
          <label htmlFor="email-input">Email</label> 
          <input
            type="email" 
            id="email-input" 
            className={ state.email?.error ? "error" : "" }
            onChange={ register( "email", emailSchema ) } 
          />
        </div>

        <div className="password field">
          <label htmlFor="password-input">Password</label>
          <input
            type="password" 
            id="password-input"
            className={ state.password?.error ?  "error" : "" } 
            onChange={ register( "password", passwordSchema ) } 
          />
        </div>

        <div className="errors">
          <span>{ state.email?.error }</span>
          <span>{ state.password?.error }</span>
        </div>

        <button
          type="submit"
          disabled={
            error ||
            state.email?.value === undefined ||
            state.password?.value === undefined
          }
        >Sign In</button>
      </form>

      <style jsx>{`
      .sign-in-card {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      @media only screen and (max-width: 850px) {
        .sign-in-card {
          flex-direction: column;
        }
      }

      .sign-in-form {
        display: flex;
        flex-direction: column;
        justify-content: center;;
        gap: 1em;

        font-size: 0.85rem;

        padding: 1.5rem;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
      }

      input {
        background: white;

        padding: 0.5em;

        color: rgb(35, 35, 35);
        font-size: 0.85rem;
        font-family: 'Open Sans', sans-serif;

        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
      }

      .error {
        border-color: #DE3C4B;
      }

      .errors {
        display: flex;
        flex-direction: column;

        color: #DE3C4B;
        font-size: 0.8rem;
      }

      button {
        background: none;
        color: #623CEA;
        border: 1px solid #623CEA;

        font-size: 0.85rem;
        font-family: 'Open Sans', sans-serif;

        padding: 0.5em;
        border-radius: 5px;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
      }

      button:hover {
        color: white;
        background: #623CEA;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
      }

      button:disabled, button:disabled:hover {
        color: grey;
        border: grey;
        background: none;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        cursor: not-allowed;
      }
    `}</style>
    </div>
  )
}
