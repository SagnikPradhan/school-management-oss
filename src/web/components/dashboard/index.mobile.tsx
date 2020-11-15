import React from "react"

import { ParsedUserDocument } from "../../helpers/parseUserDocument"
import { Profile } from "./profile"

export const dashboard: React.FC<{ user: ParsedUserDocument }> = ({ user }) => {
  return (
    <div className="dashboard">
      <Profile user={user} />

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 2rem;

          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

export default dashboard
