import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { Keyboard } from '@ionic-native/keyboard/ngx';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
  providers: [Keyboard]
})
export class SkillsPage implements OnInit {

  mainuser: AngularFirestoreDocument;
  skill: string;
  level: string;
  last_used: string;
  origin: string;
  months_active: string;
  developing: string;

  skills;
  sub;
// tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

// tslint:disable-next-line: max-line-length
  constructor(public router: Router, private afs: AngularFirestore, private user: UserService,  private alertCtrl: AlertController, private keyboard: Keyboard) {
      this.mainuser = afs.doc(`members/${user.getUID()}`);
      this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.skills = event.skills;
      });
    }

    async createPost() {
      this.busy = true;
      const skill = this.skill;
      const level = this.level;
      const last_used = this.last_used;
      const origin = this.origin;
      const months_active = this.months_active;
      const developing = this.developing;

      this.afs.doc(`members/${this.user.getUID()}`).update({
        skills: firestore.FieldValue.arrayUnion({
          skill,
          level,
          last_used,
          origin,
          months_active,
          developing
        })
        });

      this.router.navigate(['/tabs/info']);
      }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Logout?',
      message: 'Are you sure you would like to logout',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ?');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
  // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }

  openkeypad() {
    this.keyboard.show();
  }


}
