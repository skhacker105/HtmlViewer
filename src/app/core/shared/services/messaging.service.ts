import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "@core/components/snack-bar/snack-bar.component";
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
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: result,
      panelClass: [messageClass]
    });
  }
}
