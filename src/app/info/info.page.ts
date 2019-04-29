import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
mainuser: AngularFirestoreDocument;

skills;
sub;

// tslint:disable-next-line: no-inferrable-types
busy: boolean = false;

// tslint:disable-next-line: no-inferrable-types



// tslint:disable-next-line: max-line-length
  constructor (
    private http: Http,
    public router: Router,
    private afs: AngularFirestore,
    private user: UserService,
    private alertCtrl: AlertController,
        ) {
    this.mainuser = afs.doc(`members/${user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
    this.skills = event.skills;
    });
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

}
