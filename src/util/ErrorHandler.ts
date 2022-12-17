import { ErrorHandler as ReactShibaErrorHandler } from "react-shiba";
import type { Exception } from "react-shiba";

export class ErrorHandler extends ReactShibaErrorHandler {
    onError(exception: Exception): void {
        console.info(exception);
    }
}
