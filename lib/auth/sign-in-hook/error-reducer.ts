export function errorReducer(firebaseErrorCode: string) {
  switch (firebaseErrorCode) {
    case "auth/account-exists-with-different-credential":
      return (
        "This provider is not linked with your account," +
        " please use the other providers"
      );

    case "auth/auth-domain-config-required":
      return "Internal Error - Auth domain config required";

    case "auth/cancelled-popup-request":
      // Multiple popup requests cause it but the last one works
      return undefined;

    case "auth/operation-not-allowed":
      return "Internal Error - Enable the account type";

    case "auth/operation-not-supported-in-this-environment":
      return "Internal Error - Invalid environement";

    case "auth/popup-blocked":
      return "Popup request was blocked, please enable popups";

    case "auth/popup-closed-by-user":
      // User closed the popup
      return undefined;

    case "auth/unauthorized-domain":
      return "Internal Error - Unauthorized domain";

    default:
      return "Unknown Error";
  }
}
