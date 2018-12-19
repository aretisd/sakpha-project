import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private db: AngularFireDatabase
    ) { }

  ngOnInit() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const daily = day + '/' + month;
    const monthly = month;
    const count = 0;

  }

}
