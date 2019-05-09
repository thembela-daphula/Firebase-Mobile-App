import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { MemberinfoComponent } from './memberinfo/memberinfo.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    public popoverController: PopoverController) { }

  ngOnInit() {
  }

  async notifications(ev: any) {
    const popover = await this.popoverController.create({
        component: MemberinfoComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
}

async DismissClick() {
  await this.popoverController.dismiss();
    }

}
