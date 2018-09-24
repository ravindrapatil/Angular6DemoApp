import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../profile/profile.service';

@Component({
  selector: 'app-child-second',
  templateUrl: './child-second.component.html',
  styleUrls: ['./child-second.component.scss']
})
export class ChildSecondComponent implements OnInit {
  firstname: any;
  lastname: any;
  phone: any;
  address: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  private userProfile() {
    this.profileService.getProfile(sessionStorage.getItem('userId')).subscribe((res: any) => {
      if(res.profiles.length == 0) {
        return true;
      }
      console.log(res);
      this.firstname = res.profiles[0].firstname;
      this.lastname = res.profiles[0].lastname;
      this.phone = res.profiles[0].phone;
      this.address = res.profiles[0].address;
    })
  }

}
