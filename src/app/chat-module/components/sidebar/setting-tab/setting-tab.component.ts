import { Component, OnInit } from '@angular/core';
import { DataLocal } from 'src/app/base/DataLocal.Service';
import { UserObj } from 'src/app/chat-module/models/object/Auths/user.interface';

@Component({
  selector: 'app-setting-tab',
  templateUrl: './setting-tab.component.html',
  styleUrls: ['./setting-tab.component.css']
})
export class SettingTabComponent implements OnInit{
  currentUser: UserObj = {};

  constructor(private dataLocal: DataLocal) {}
  ngOnInit(): void {
    this.currentUser = {
      fullName: this.dataLocal.getFullName(),
      email: this.dataLocal.getEmail(),
      phoneNumber: ''
    };
  }
}
