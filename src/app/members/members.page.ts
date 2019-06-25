
import 'bootstrap';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController, PopoverController } from '@ionic/angular';
import {Users } from '../services/users.interface';
import { DataService } from '../services/data.service';
import { MemberinfoComponent } from './memberinfo/memberinfo.component';
import { User } from 'firebase';




@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

// tslint:disable-next-line: no-inferrable-types
  public searchTerm: string = '';
  public items: any;
// tslint:disable-next-line: no-inferrable-types
  private url: string = 'http://localhost:3000/users';
  mainuser: AngularFirestoreDocument;
profilePic: string;
sub;
data: any;
user: Users[];
UserID: Users;
queryText: string;
res: any;
uid: any;

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private users: UsersService,
    private http: HttpClient,
    private afs: AngularFirestore,
    public popoverController: PopoverController) {
      this.mainuser = afs.doc(`users/${this.users.getUID()}`);
      this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.profilePic = event.profilePic;
  });
      this.getMessage();
      this.getDp();
    }

  ngOnInit() {
    this.uid = this.users.getUID();
    this.users.getDatas(this.uid).subscribe((res: Users[]) => {
      this.user = res;
      console.log(res);
   });
  }
  getMessage() {
    this.users.getData().subscribe(data => this.data = data);
  }

  getDp() {
    this.users.getProfilePicture(this.users.getUID()).subscribe((res) => {
      this.data = res;
      console.log(res);
    });
  }

  async notifications() {
    const popover = await this.popoverController.create({
      component: MemberinfoComponent,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
  }
}
