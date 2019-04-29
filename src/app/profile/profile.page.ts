import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
mainuser: AngularFirestoreDocument;
userPosts;
sub;
username: string;
profilePic: string;
name: string;
cellnumber: string;
email: string;
phone: string;
data;


  constructor(
    public router: Router,
    private afs: AngularFirestore,
    private user: UserService,

    private alertCtrl: AlertController) {
this.mainuser = afs.doc(`members/${user.getUID()}`);
this.sub = this.mainuser.valueChanges().subscribe(event => {
this.username = event.username;
this.profilePic = event.profilePic;
this.data = event.data;
});
}

  ngOnInit() {
  }

  edit() {
    this.router.navigate(['/tabs/profile']);
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

      }

