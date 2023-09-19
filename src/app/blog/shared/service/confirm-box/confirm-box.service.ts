import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponent } from '../../components/confirm-box/confirm-box.component';
import { LoginPromptComponent } from '../../components/login-prompt/login-prompt.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmBoxService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialogue(messageFromComponent: string) {
    return this.dialog.open(ConfirmBoxComponent, {
      width: '30%',
      disableClose: true,
      data: {
        message: messageFromComponent,
      },
    });
  }

  openAuthDialogue(messageFromComponent: string) {
    return this.dialog.open(LoginPromptComponent, {
      width: '30%',
      disableClose: true,
      data: {
        message: messageFromComponent,
      },
    });
  }
}
