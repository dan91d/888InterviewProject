import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { IUser } from './user.model';
import { UserService } from './user.service';

@Component({
  templateUrl: './user.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px}
  `]
})

export class UserComponent implements OnInit {
  userForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  userName: FormControl;
  dateOfBirth: FormControl;
  displayWarning = false;
  displayError = false;
  warningMessage: string;
  errorMessage: string;
  userId: number;
  userDetails: IUser;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {

    // get user ID from querystring or url
    this.userId = this.route.snapshot.params['id'];
    if (!this.userId) {
      this.route.queryParams.subscribe(params => {
        this.userId = params['id'] || params['ID'] || params['Id'];
      });
    }

    // form init
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.userName = new FormControl('');
    this.dateOfBirth = new FormControl('');
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      dateOfBirth: this.dateOfBirth
    });

    // clear error & warning messages on form input
    this.userForm.valueChanges.subscribe(() => {
      this.displayError = false;
      this.displayWarning = false;
    });

    // get user personal details from backend API
    if (this.userId) {
      this.userService.getUser(+this.userId).subscribe(() => {
        if (this.userService.userDetails) {

          // set form controls values
          let birthDay = new Date(this.userService.userDetails.dateOfBirth)
          this.firstName.setValue(this.userService.userDetails.firstName);
          this.lastName.setValue(this.userService.userDetails.lastName);
          this.userName.setValue(this.userService.userDetails.userName);
          this.dateOfBirth.setValue({ year: birthDay.getFullYear(), month: birthDay.getMonth() + 1, day: birthDay.getDate() });
        }
        else {
          // user doesn't exist
          this.displayWarning = true;
          this.warningMessage = "No user found!";
        }
      }, error => console.error(error));
    }
  }

  // submit user personal details to backend API
  saveUser(formValues) {
    let user: IUser = {
      id: this.userId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      userName: formValues.userName,
      dateOfBirth: formValues.dateOfBirth
    }

    this.userService.saveUser(user).subscribe(result => {
      // console.log(result)
    }, error => {
      // console.log(error);
      this.displayError = true;
      this.errorMessage = error.error.detail;
    });
  }
}
