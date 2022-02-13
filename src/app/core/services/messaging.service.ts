import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IActionResult } from "../interfaces/ActionResult";
import { CoreResources } from "../utilities/resources";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(result?: IActionResult) {
    let messageClass: string;
    if (result?.completed) {
      messageClass = CoreResources.SnackBarSuccessClass;
    } else if (!result?.completed) {
      messageClass = CoreResources.SnackBarErrorClass;
    }
    this._snackBar.open(result.message, 'X', {
      panelClass: messageClass,
      duration: 10000
    });
  }

  showError(errorMessage: string) {
    this._snackBar.open(errorMessage, 'X', {
      panelClass: CoreResources.SnackBarErrorClass,
      duration: 10000
    });
  }

  hideError() {
    this._snackBar.dismiss();
  }
}
