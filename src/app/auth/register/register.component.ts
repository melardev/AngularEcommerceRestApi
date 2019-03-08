import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {catchError, map} from 'rxjs/operators';

import {NotificationService} from '../../shared/services/notification.service';
import {BaseAppDtoResponse} from '../../shared/dtos/responses/shared/base.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private alertService: AlertService,
    private auth: UsersService,
    // private loadingService: LoadingService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private submit(): void {
    if (this.registerForm.valid) {
      this.notificationService.dispatchSuccessMessage('submitting register Form');
      const {firstName, lastName, email, password, username} = this.registerForm.value;

      // TODO call the auth service

      this.auth.register({firstName, lastName, email, password, username}).pipe(map(res => {
        if (res && res.success) {
          this.notificationService.dispatchSuccessMessage('register successful');
          console.log(res);
          if (res.full_messages) {
            alert(res.full_messages[0]);
            this.notificationService.dispatchSuccessMessage(res.full_messages[0]);
          }
          this.router.navigate(['/auth/login']);
        } else {
          this.notificationService.dispatchErrorMessage('Failed registration process');
        }
        // this.loadingService.isLoading.next(false);
      }), catchError(err => {
        if (err.error) {
          const error = err.error as BaseAppDtoResponse;
          error.full_messages = err.error.full_messages;
          this.notificationService.dispatchErrorMessage(error.full_messages[0]);
        }
        return [err];
      })).subscribe(res => {
        console.log(res);
      });

    } else {
      alert('Invalid form');
    }
  }
}
