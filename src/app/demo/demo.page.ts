import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatetimeChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {
imageURL: string;
desc: string;
name: string;
// tslint:disable-next-line: no-inferrable-types
noFace: boolean = false;

// tslint:disable-next-line: no-inferrable-types
scaleCrop: string = '-/scale_crop/200x200';

effects = {
effect1: '',
effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
effect3: '-/filter/vevera/150/',
effect4: '-/filter/carris/150/',
effect5: '-/filter/misiara/150/'
};

activeEffect: string = this.effects.effect1;
// tslint:disable-next-line: no-inferrable-types
busy: boolean = false;

@ViewChild('fileButton') fileButton;

constructor(
public http: Http,
public afstore: AngularFirestore,
public user: UserService,
private alertController: AlertController,
private router: Router) { }

ngOnInit() {
}

async createPost() {
this.busy = true;

const image = this.imageURL;
const desc = this.desc;
const name = this.name;

this.afstore.doc(`members/${this.user.getUID()}`).update({
posts: firestore.FieldValue.arrayUnion({
  image,
  desc,
  name
})
});

this.router.navigate(['/tabs/profile']);
}

setSelected(effect: string) {
    this.activeEffect = this.effects[effect];
  }

uploadFile() {
this.fileButton.nativeElement.click();
}

fileChanged(event) {

this.busy = true;

const files = event.target.files;

const data = new FormData();
data.append('file', files[0]);
data.append('UPLOADCARE_STORE', '1');
data.append('UPLOADCARE_PUB_KEY', 'ba1eb415661523be4eba');

this.http.post('https://upload.uploadcare.com/base/', data)
// tslint:disable-next-line: no-shadowed-variable
.subscribe(event => {
console.log(event);
this.imageURL = event.json().file;
this.busy = false;
this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`)
// tslint:disable-next-line: no-shadowed-variable
.subscribe(event => {
// tslint:disable-next-line: triple-equals
this.noFace = event.json().faces == 0;
});
});
}

}
