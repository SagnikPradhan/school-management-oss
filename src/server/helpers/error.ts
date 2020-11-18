/**
 * Handles errors
 * @param error - Error to be handled
 */
export function handleErrorPlease( error: Error ): void {
  console.error( error )

  if ( error instanceof ServerError && error.isOperational ) return

  else {
    console.log( "Making a clean exit" )
    process.exit( 1 )
  }
}

export class ServerError extends Error {
  public readonly name: string
  public readonly message: string
  public readonly isOperational: boolean

  constructor(
    name: string,
    message: string,
    isOperational = false
  ) {
 
    super( message )

    Object.setPrototypeOf( this, new.target.prototype )

    this.name = name
    this.message = message
    this.isOperational = isOperational

    Error.captureStackTrace( this )

  }
}
