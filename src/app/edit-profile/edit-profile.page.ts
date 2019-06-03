import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
// import { timingSafeEqual } from 'crypto';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {


  mainuser: AngularFirestoreDocument;
  sub;

  data: any = {
    'username' : null,
    'name': null,
    'cellnumber': null,
    'email': null,
    'phone': null,
    'last_name': null,
    'surname': null,
    'level': null,
    'location': null,
  };

  // tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

  @ViewChild('fileBtn') fileBtn: {
    nativeElement: HTMLInputElement
  };
  username: any;
  profilePic: any;


  constructor(
    private http: Http,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UserService,

    public alertCtrl: AlertController) {


  }


  ngOnInit() {
    this.mainuser = this.afs.doc(`members/${this.user.getUID()}`);

    this.sub = this.mainuser.valueChanges().subscribe(event => {
      console.log(event);
      this.username = event.username;
      this.profilePic = event.profilePic;
      this.data = event.data;

    });
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
    const data = {
      'username' : this.data.username,
      'name': this.data.name,
      'cellnumber': this.data.cellnumber,
      'email': this.data.email,
      'phone': this.data.phone,
      'last_name': this.data.last_name,
      'surname': this.data.location,
      'level': this.data.level,
      'nick_name': this.data.nick_name,
      'b_day': this.data.b_day,
      'location': this.data.location
    };
    this.afs.doc(`members/${this.user.getUID()}`).update({
      data: data
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

    // await this.presentAlert('Update success', 'Your profile was updated');

    // this.router.navigate(['/tabs/profile']);
  }
  async presentAlertConfirm() {
  //   this.router.navigate(['/tabs/profile']);
  // }
    const alert = await this.alertCtrl.create({
      header: 'Update successful',
      message: 'Your profile has been updated',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs/profile']);
          }
        }
      ]
  // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }
}







