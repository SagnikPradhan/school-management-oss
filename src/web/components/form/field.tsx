import React from "react"

export const FormField: React.FC<{
  error: boolean
  type?: string
  name: string
  onChangeEvent: ( event: React.ChangeEvent<HTMLInputElement> ) => void
}> = ({
  error,
  type,
  name,
  onChangeEvent,
}) => (
  <div className="field">
    <label htmlFor={ name }>{ name }</label>
    <input
      id={ name }
      className={ error ?  "error" : "" } 
      type={ type }
      onChange={ onChangeEvent }
    />

    <style jsx>{`
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

      label {
        text-transform: capitalize;
      }

      input.error {
        border-color: #DE3C4B;
      }  
    `}</style>
  </div>
)
