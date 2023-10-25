import { UserService } from './../../services/User.Service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OpenMessageDto } from '../../models/dtos/open-message.interface';
import { FriendObj } from '../../models/object/Friends/friend.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() dataFromParent: any;
  @Output() openConversation = new EventEmitter<any>();
  inputSearch: string = "";
  searchResult: any;
  constructor(private userService: UserService,) { }

  getConversation(data: OpenMessageDto) {
    this.openConversation.emit(data)
  }

  async search(id: string) {
    if (id === 'idxSearchs') {
      let response = await this.userService.FindUser(this.inputSearch);
      this.searchResult = response.rtList as FriendObj[];
    }
  }
}
