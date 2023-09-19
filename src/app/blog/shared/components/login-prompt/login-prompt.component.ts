import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.css'],
})
export class LoginPromptComponent implements OnInit {
  password!: string;
  authenticateForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoginPromptComponent>,
    private authService: AuthService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authenticateForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  authenticate(password: string) {
    this.authService.authorize(password).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.authService.setToken(res.data);
          this.dialogRef.close(true);
        } else {
          this.toaster.error(res.message);
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}
