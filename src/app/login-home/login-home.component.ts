import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent {

  constructor(private usersService: UsersService, private router: Router) {}

  login(form: NgForm): void {
    if (form.valid) {
      const { username, password } = form.value;
      this.usersService.authenticateUser(username, password)
        .subscribe((response: any) => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error de autenticación');
          }
        });
    } else {
      console.error('Formulario inválido');
    }
  }
}
