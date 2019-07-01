import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  userID: any;
  mainuser: AngularFirestoreDocument;
  sub;
  user: any;

  constructor(
    private route: ActivatedRoute, private users: UsersService,
  ) { }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log(this.userID);
    this.users.getMember(this.userID).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
  }



}
