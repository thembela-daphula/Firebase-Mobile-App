import * as firebase from 'firebase';
import { firestore } from 'firebase/app';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


mainuser: AngularFirestoreDocument;
sub;
username: string;
profilePic: string;
cellNumber: string;
name: string;
surname: string;
email: string;
phone: string;
occupation: string;
location: string;
level: string;

// tslint:disable-next-line: no-inferrable-types
busy: boolean = false;

  @ViewChild('fileBtn') fileBtn: {
  nativeElement: HTMLInputElement
};


constructor(
private http: Http,
private afs: AngularFirestore,
private router: Router,
private alertController: AlertController,
private user: UserService,
public afstore: AngularFirestore,
  ) {
this.mainuser = afs.doc(`members/${user.getUID()}`);
this.sub = this.mainuser.valueChanges().subscribe(event => {
this.username = event.username;
this.profilePic = event.profilePic;
});

  }


  ngOnInit() {
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

updateProfilePic() {
this.fileBtn.nativeElement.click();
}

uploadPic(event) {
  const files = event.target.files;

  const data = new FormData();
  data.append('file', files[0]);
  data.append('UPLOADCARE_STORE', '1');
  data.append('UPLOADCARE_PUB_KEY', 'ba1eb415661523be4eba');
  this.http.post('https://upload.uploadcare.com/base/', data)
// tslint:disable-next-line: no-shadowed-variable
  .subscribe(event => {
    const uuid = event.json().file;
    this.mainuser.update({
      profilePic: uuid,
    });
  });
}

async createPost() {
  this.busy = true;

  const name = this.name;
  const cellnumber = this.cellNumber;
  const email = this.email;
  const phone = this.phone;
  const occupation = this.occupation;
  const location = this.location;
  const level = this.level;

  this.afs.doc(`members/${this.user.getUID()}`).update({
    data: { name,
    cellnumber,
    email,
    phone,
    occupation,
    location,
    level
}
  });

  this.router.navigate(['/tabs/profile']);
  }

async presentAlert(title: string, content: string) {
  const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
  });

  await alert.present();
}

async updateDetails() {

  if (this.username !== this.user.getUsername()) {
    await this.user.updateEmail(this.username);
    this.mainuser.update({
      username: this.username
    });
  }

  await this.presentAlert('Done!', 'Your profile was updated!');

  this.router.navigate(['/tabs/profile']);
}


}



