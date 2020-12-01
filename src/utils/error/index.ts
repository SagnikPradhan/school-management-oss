import type {
  OAuthLinkAccountsError,
  OAuthUnknownError,
} from "u/firebase/auth/oauth"
import type { EmailError } from "u/firebase/auth/email"

export interface Errors {
  OAUTH_LINK_ACCOUNT: OAuthLinkAccountsError
  OAUTH_UNKNOWN: OAuthUnknownError
  EMAIL_ERROR: EmailError
}

export class AppError<T extends keyof Errors> extends Error {
  public readonly name: T
  public readonly props: Errors[T]

  constructor(name: T, props: Errors[T]) {
    super(name)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.props = props

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
