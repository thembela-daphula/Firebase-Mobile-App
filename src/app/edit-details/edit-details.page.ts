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
import { ActivatedRoute } from '@angular/router';

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

  level;
  lastUsed;
  activeExperience;
  active;
  id;
  skillID: string;

  constructor(
    private users: UsersService,
    private http: Http,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UserService,
    public alertCtrl: AlertController
  ) { }
    skill: any;
  ngOnInit() {
    this.skillID = this.route.snapshot.paramMap.get('id');
    this.mainuser = this.afs.doc(`users/${this.users.getUID()}/skills/${this.skillID}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
    this.level = event.level;
    this.active = event.active;
    this.lastUsed = event.lastUsed;
    this.activeExperience = event.activeExperience;
});
  }

  async UpdateSkills() {
    this.skillID = this.route.snapshot.paramMap.get('id');
    this.busy = true;
          this.afs.doc(`users/${this.users.getUID()}/skills/${this.skillID}`).update({
          level : this.level,
          lastUsed: this.lastUsed,
          activeExperience: this.activeExperience,
          active: this.active,
    });
    this.ngOnInit();
    this.router.navigate(['/tabs/info']);
  }

}

