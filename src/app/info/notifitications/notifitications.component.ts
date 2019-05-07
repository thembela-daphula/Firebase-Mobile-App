import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../user.service';
import { Http } from '@angular/http';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-notifitications',
  templateUrl: './notifitications.component.html',
  styleUrls: ['./notifitications.component.scss'],
})
export class NotifiticationsComponent implements OnInit {

mainuser: AngularFirestoreDocument;
skills;
sub;

  constructor(
    private popoverController: PopoverController,
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

   async DismissClick() {
    await this.popoverController.dismiss();
      }

  ngOnInit() {}

}
