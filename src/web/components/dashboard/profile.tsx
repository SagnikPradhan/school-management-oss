import React from "react"

import Image from "next/image"

import { Field } from "../section"
import { ParsedUserDocument } from "../../helpers/parseUserDocument"

export const Profile: React.FC<{ user: ParsedUserDocument }> =
({ user: { image, ...details } }) => (
  <div className="profile-card">
    <h3 className="header">Profile</h3>

    <div className="content">
      <div className="avatar"><Image height="150" width="150" src={image as string} /></div>

      <div className="profile-details">{
        Object
          .entries( details )
          .map(
            ( [ title, content ], key ) =>
              <Field key={ key } title={ title } content={ content } />
          )
      }</div>
    </div>


    <style jsx>{`
      h3 {
        box-sizing: border-box;
      }

      .content {
        display: flex;
        flex-direction: row;
        gap: 2rem;
      }

      @media only screen and (max-width: 768px) {
        .content {
          flex-direction: column;
          align-items: center;
        }
      }
      
      .profile-details {
        flex-grow: 100;

        display: flex;
        flex-direction: row;
        gap: 2rem;
      }
    `}</style>
  </div>
)
