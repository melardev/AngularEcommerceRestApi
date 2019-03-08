import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {UsersService} from '../../shared/services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: User;

  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

}
