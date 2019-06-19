import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { SkillsComponent } from '../Skills/skills.component';
import { IonicModule } from '@ionic/angular';
import { SkilldataComponent } from '../skilldata/skilldata.component';

@NgModule({
<<<<<<< HEAD
  declarations: [ SkilldataComponent],
=======
  declarations: [ProductComponent, SkillsComponent ],
>>>>>>> 4ecaa3f01ba036b76572122823561f91a8c0dba4
  imports: [
    CommonModule,
    IonicModule
  ],
<<<<<<< HEAD
  exports: [SkilldataComponent]
=======
  exports: [ProductComponent, SkillsComponent]
>>>>>>> 4ecaa3f01ba036b76572122823561f91a8c0dba4
})
export class SharedComponentsModule { }
