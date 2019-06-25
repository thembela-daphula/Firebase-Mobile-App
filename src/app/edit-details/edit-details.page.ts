import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Skills } from '../services/skills';
import { UsersService } from '../services/users.service';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {

  mainuser: AngularFirestoreDocument;
  sub;
  // tslint:disable-next-line:no-inferrable-types
  busy: boolean = false;

  level: string;
  lastUsed: string;
  activeExperience: string;
  active: string;
  id: string;

  constructor(
    private users: UsersService,
    private http: Http,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UserService,
    public alertCtrl: AlertController
  ) {
    this.mainuser = afs.collection(`users`).doc(`/${this.users.getUID()}`).collection(`skills`).doc(`/${this.id}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
    this.lastUsed = event.lastUsed;
    this.level = event.level;
    this.activeExperience = event.activeExperience;
    this.active = event.active;
});
   }

  ngOnInit() {
  }

  async UpdateSkills() {

    this.busy = true;
          this.afs.collection(`users`).doc(`/${this.users.getUID()}`).collection(`skills`).doc(`/${this.id}`).update({
          level : this.level,
          lastUsed: this.lastUsed,
          activeExperience: this.activeExperience,
          active: this.active,
    });

    this.router.navigate(['/tabs/info']);
  }

}

