import { NextApiHandler } from "next"
import { handleErrorPlease } from "./error"
import { makeSureServerIsFine } from "./make-sure-server-is-fine"

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

        makeSureServerIsFine()
          .then( () => handler( req, res ) )
          .then( () => resolve() )
          .catch( ( error ) => {
            res
              .status( 500 )
              .send( "Internal Server Error" )
            handleErrorPlease( error )
            resolve()
          })

      } 
    )
  }
}
