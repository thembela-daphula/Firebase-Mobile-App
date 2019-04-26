import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-about-skill',
  templateUrl: './about-skill.page.html',
  styleUrls: ['./about-skill.page.scss'],
})
export class AboutSkillPage implements OnInit {

mainuser: AngularFirestoreDocument;
skills;
sub;

// tslint:disable-next-line: no-inferrable-types
busy: boolean = false;

  constructor(
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

}
