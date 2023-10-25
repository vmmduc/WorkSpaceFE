import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() sendataToParent = new EventEmitter<string>();
  lsNavs: any[] = [
    {
      id: "idxChats",
      title: 'Chats',
      icon: 'ri-chat-3-line',
      name: 'Tin nhắn',
      default: ''
    },
    {
      id: "idxSearchs",
      title: 'Searchs',
      icon: 'ri-search-line',
      name: 'Tìm kiếm',
      default: ''
    },
    {
      id: "idxSettings",
      title: 'Settings',
      icon: 'ri-settings-4-line',
      name: 'Cài đặt',
      default: ''
    }
  ];
  constructor() { }

  ngOnInit() {
    this.lsNavs[0].default = 'active';
    this.sendataToParent.emit(this.lsNavs[0]);
  }

  sendDataToParent(nav: any) {
    this.sendataToParent.emit(nav);
  }
}
