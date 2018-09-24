import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular-highcharts';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ComponentsRoutingModule } from './components-routing.module';
import { ServersidepaginationComponent } from './server-pagination/serversidepagination.component';
import { ClientPaginationComponent } from './client-pagination/client-pagination.component';
import { ChartComponent } from './chart/chart.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { CommunicationComponent } from './communication/communication.component';
import { ChildComponent } from './communication/child/child.component';
import { ChildSecondComponent } from './communication/child-second/child-second.component';
import { ChildThirdComponent } from './communication/child-third/child-third.component';
import { ComponentOneComponent } from './communication/component-one/component-one.component';
import { ComponentTwoComponent } from './communication/component-two/component-two.component';
import { CustomDirectiveComponent } from './custom-directive/custom-directive.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { CcLogoDirective, NumberOnlyDirective } from './directives/cc-logo.directive';
import { CcLogoDirective2 } from './directives/cc-logo.directive';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { CustomPipePipe, DefaultImagePipe, MultiplyPipe, 
  FirstcharcateruppercasePipe, TruncatePipe, FilterPipe } from './custom-pipes/custom-pipe.pipe';
import { PileComponentComponent } from './pile-component/pile-component.component';
import { SearchComponent } from './search/search.component';
import { AjaxComponent } from './ajax/ajax.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouteParameterComponent } from './route-parameter/route-parameter.component';
import { PlayerdetailsComponent } from './playerdetails/playerdetails.component';
import { MaincompholderComponent } from './maincompholder.component';

@NgModule({
  imports: [
    FormsModule,
    ComponentsRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    GridModule,
    ChartsModule,
    ChartModule,
    NgxSpinnerModule
  ],
  declarations: [ 
    ServersidepaginationComponent, 
    ClientPaginationComponent, 
    ChartComponent, 
    HighchartsComponent, 
    CommunicationComponent, 
    ChildComponent, 
    ChildSecondComponent, 
    ChildThirdComponent, 
    ComponentOneComponent, 
    ComponentTwoComponent, 
    CustomDirectiveComponent, 
    GooglePlacesDirective, 
    CcLogoDirective,
    CcLogoDirective2,
    NumberOnlyDirective,
    ConfirmEqualValidatorDirective,
    CustomPipePipe,
    DefaultImagePipe,
    PileComponentComponent,
    FirstcharcateruppercasePipe,
    TruncatePipe,
    MultiplyPipe,
    FilterPipe,
    SearchComponent,
    AjaxComponent,
    RxjsComponent,
    RouteParameterComponent,
    PlayerdetailsComponent,
    MaincompholderComponent
  ]
})
export class ComponentsModule { }
