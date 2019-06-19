import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { IonicModule } from '@ionic/angular';
import { SkilldataComponent } from '../skilldata/skilldata.component';

@NgModule({
  declarations: [ SkilldataComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SkilldataComponent]
})
export class SharedComponentsModule { }
