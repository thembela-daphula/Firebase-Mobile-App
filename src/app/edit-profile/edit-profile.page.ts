import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
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
  res: any;

    email: any;
    name: string;
    surname: string;
    careerLevel: string;
    mobile: string;

  // tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;

  @ViewChild('fileBtn') fileBtn: {
    nativeElement: HTMLInputElement
  };
  username: any;
  profilePic: any;


  constructor(
    private users: UsersService,
    private http: Http,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UserService,
    public alertCtrl: AlertController) {

      this.mainuser = afs.doc(`users/${this.users.getUID()}`);
      this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.profilePic = event.profilePic;
      this.email = event.email;
      this.name = event.name;
      this.surname = event.surname;
      this.careerLevel = event.careerLevel;
      this.mobile = event.mobile;
});

  }


  ngOnInit() {
    this.users.getDatas(this.users.getUID()).subscribe((res) => {
      this.res = res;
      console.log(this.res);
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
            this.afs.doc(`users/${this.users.getUID()}`).update({
           name : this.name,
            surname: this.surname,
          careerLevel: this.careerLevel,
           email: this.email,
           mobile: this.mobile,
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

    if (this.username !== this.users.getUsername()) {
      await this.users.updateEmail(this.username);
      this.mainuser.update({
        username: this.username,
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







