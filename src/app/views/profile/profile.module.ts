import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    FormsModule,
    ProfileRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }
