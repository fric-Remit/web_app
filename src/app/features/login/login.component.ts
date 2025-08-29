import { Component } from '@angular/core';
import { LoginHeaderComponent } from '../../core/login/login-header/login-header.component';
import { LoginFormComponent } from '../../core/login/login-form/login-form.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginHeaderComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
