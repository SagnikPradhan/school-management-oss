import { NextApiHandler } from "next"
import { handleErrorPlease } from "./error"
import { makeSureServerIsFine, initialiseServer } from "./helpers"

let firstRun = true

/**
 * Wrap an api handler with helpers
 * @param handler - api handler
 */
export function wrapHandler<A extends NextApiHandler>( 
  handler: A 
): NextApiHandler {
  return function ( req, res ) {
    return new Promise(
      ( resolve ) => {
        try {
          if ( firstRun ) {
            firstRun = false
            initialiseServer()
          } else {
            makeSureServerIsFine()
              .then( () => handler( req, res ) )
              .then( resolve )
          }
        } catch ( error ) {
          res
            .status( 500 )
            .send( "Internal Server Error" )
          handleErrorPlease( error )
          resolve()
        }
      } 
    )
  }
}
