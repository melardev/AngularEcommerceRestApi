import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../shared/models/user';
import {UsersService} from '../../shared/services/users.service';
import {NotificationService} from '../../shared/services/notification.service';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  private user: User;
  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private notificationService: NotificationService,
  ) {
    this.createForm();


  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.subscriptions.push(
      this.usersService.getUser().subscribe(user => {
        this.user = user;
        if (!!user) {
          this.router.navigateByUrl('/home');
        }
      })
    );
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, /* Validators.email*/]],
      password: ['', [Validators.required, /*Validators.minLength(8) */]]
    });
  }

  public submit(): void {

    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;

      this.subscriptions.push(this.usersService.login({
        username,
        password
      }).subscribe(result => { // in OnInit we are listening to user events, if the user logs in, we redirect to home
      }, err => {
        debugger;
      }));
    } else {
      this.notificationService.dispatchErrorMessage('Invalid form');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub =>
      sub.unsubscribe());
  }
}
