import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProfileService } from './profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileArray: any;
  name: any;
  lastname: any;
  phone: any;
  dob: any;
  address: any;
  avatar: any;
  updateProfileForm: FormGroup;
  createProfileForm: FormGroup;
  firstname: any;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  profileContainer: boolean = true;
  profileNoRecord: boolean = false;
  selectedFile: File = null;
  @ViewChild('inputFile') fileInputVariable: ElementRef;
  alertsDismiss: any = [];
  productArray: any = [];

  constructor(private userProfileService: ProfileService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.updateProfileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])],
      dob: [''],
      address: ['', Validators.required]
    });

    this.createProfileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])],
      dob: [''],
      address: ['', Validators.required]
    });

    let userId = sessionStorage.getItem('userId');
    this.spinner.show();
    this.loadProfile();
  }

  loadProfile() {
    this.userProfileService.getProfile(sessionStorage.getItem('userId')).subscribe((res: any) => {
      this.spinner.hide();
      if(res.profiles.length == 0) {
        this.profileNoRecord = true;
        this.profileContainer = false;
      } else {
        this.profileNoRecord = false;
        this.profileContainer = true;

        this.profileArray = res.profiles[0];
        this.firstname = res.profiles[0].firstname;
        this.lastname = res.profiles[0].lastname;
        this.phone = res.profiles[0].phone;
        this.dob = res.profiles[0].dob;
        this.address = res.profiles[0].address;
        this.avatar = res.profiles[0].avatar;

        this.updateProfileForm.get('firstname').patchValue(this.firstname);
        this.updateProfileForm.get('lastname').patchValue(this.lastname);
        this.updateProfileForm.get('phone').patchValue(this.phone);
        this.updateProfileForm.get('dob').patchValue(this.dob);
        this.updateProfileForm.get('address').patchValue(this.address);
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

  onFileSeleected(event) {
    this.selectedFile = <File>event.target.files[0]; 
  }

  updateProfile() {
    this.spinner.show();
    const updatedBody = this.updateProfileForm.value;
    this.userProfileService.updateProfile(updatedBody, sessionStorage.getItem('userId')).subscribe((res: any) => {
      if(res.message == "Profile Updated") {
        this.primaryModal.hide();
        this.alertsDismiss.push({
          type: 'success',
          msg: `Profile updated Successfully :)`,
          timeout: 1500
        });
        this.loadProfile();
      }
    }, (error) => {
      this.spinner.hide();
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
    })
  }

  saveProfile() {
    const data = this.createProfileForm.value;
    const formData = new FormData();
    formData.append('avatar', this.selectedFile, this.selectedFile.name);
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('phone', data.phone);
    formData.append('dob', data.dob);
    formData.append('address', data.address);
    this.spinner.show();

    this.userProfileService.addProfile(formData, sessionStorage.getItem('userId')).subscribe((res: any) => {
      this.spinner.hide();
      if(res.message == "Profile Created") {
        this.alertsDismiss.push({
          type: 'success',
          msg: `Profile created Successfully :)`,
          timeout: 1500
        });
        this.loadProfile();
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
    })
  }

}
