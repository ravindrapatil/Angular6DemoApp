import { Component, Input, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { SbService } from '../../shared/services/subjectBehaviour/sb.service';
import { ProfileService } from '../../views/profile/profile.service';
import { Store, Select } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  alertsDismiss: any = [];
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  loggedUser: any;
  userInfo: any;
  username: any;
  userIdFromSubjBhavir: string;
  profilePic: any;
  userEmail: any;
  
  constructor(private router: Router, 
    private auth: AuthService, 
    private profileService: ProfileService,
    private subjectBhvr: SbService, private store: Store) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.loggedUser = this.auth.isLoggedIn();
    this.userInfo = JSON.parse(sessionStorage.getItem('user'));
    this.username = this.userInfo.username;
    this.store.select(state => state.users.loggedUserInfo.userInfo[0].username).subscribe(res => {
      this.username = res || this.username;
    });

    this.subjectBhvr.myUser.subscribe(res => {
      console.log(res);
    });

    this.profileService.getProfile(sessionStorage.getItem('userId'))
      .subscribe((res: any) => {
        if(res.profiles.length != 0) {
          this.profilePic = res.profiles[0].avatar;
          this.userEmail = res.profiles[0].user.email;
        }
      }, (error) => {
        if (error.statusCode == 404) {
          this.alertsDismiss.push({
            type: 'danger',
            msg: `Bad request, try after sometime :)`,
            timeout: 5000
          });
        }
        if (error.statusCode == 401) {
          this.alertsDismiss.push({
            type: 'danger',
            msg: `Authorization failed. Try with valid email and password`,
            timeout: 5000
          });
        }
      });

  }

  profile() {
    console.log(sessionStorage.getItem('userId'));
    this.router.navigate(['/profile']);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
