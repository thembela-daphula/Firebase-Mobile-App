import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-memberinfo',
  templateUrl: './memberinfo.component.html',
  styleUrls: ['./memberinfo.component.scss'],
})
export class MemberinfoComponent implements OnInit {

  constructor(  private popoverController: PopoverController) { }

  ngOnInit() {}

  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
