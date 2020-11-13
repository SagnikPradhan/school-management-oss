import assert from "assert"
import makeSureDBConnected from "./database"
import { ServerError } from "./error"

export async function makeSureServerIsFine(): Promise<void> {
  await makeSureDBConnected()
}

export function initialiseServer(): void {
  checkEnvironmentVariables()
}

function checkEnvironmentVariables() {
  const environmentVariables = [
    "MONGODB_USERNAME",
    "MONGODB_PASSWORD",
    "MONGODB_DBNAME",
    "JWT_SECRET"
  ] as const

  for ( const environmentVariable of environmentVariables ) {
    assert(
      typeof process.env[environmentVariable] === "string",
      new ServerError(
        'INVALID_CONFIGURATION',
        `Expected environment variable ${environmentVariable}`,
        false 
      )
    )
  }
}
