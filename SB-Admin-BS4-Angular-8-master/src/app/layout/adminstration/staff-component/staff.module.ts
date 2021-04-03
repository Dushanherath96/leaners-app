import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';

@NgModule({
    imports: [ReactiveFormsModule ,CommonModule ,StaffRoutingModule],
    declarations: [StaffComponent]
})
export class StaffModule {}
