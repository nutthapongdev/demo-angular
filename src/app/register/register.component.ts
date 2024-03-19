import { Component } from '@angular/core';
import { UserForm } from '../models/user-form';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: UserForm = new UserForm();

  constructor(private authService: AuthService, private dialog: MatDialog, private storeageService: StorageService){
    
  }
  
  onSubmit() {
    const { username, email, password } = this.form;

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    this.storeageService.saveUser(this.form)

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.error(err);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.message }
        });
      }
    });
  }
}
