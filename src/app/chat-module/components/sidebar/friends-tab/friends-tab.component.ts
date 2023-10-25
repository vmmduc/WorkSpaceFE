import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FriendObj } from '../../../models/object/Friends/friend.interface';
import { FriendService } from '../../../services/Friend.Service'
import { Action, State } from '../../../constants/constant';
import { ConfirmFriendDto } from '../../../models/dtos/accept-friend.interface';

@Component({
  selector: 'app-friends-tab',
  templateUrl: './friends-tab.component.html',
  styleUrls: ['./friends-tab.component.css']
})
export class FriendsTabComponent {
  @Input() lsFriend: FriendObj[] = [];
  state: any = State;
  action: any = Action;

  constructor(private friendService: FriendService) { }

  async ManageFriendship(item_index: number, FriendId: number, actionId: number) {
    let Param: ConfirmFriendDto = { PK_FRIEND_SHIP: FriendId, friendAction: actionId };
    let response = await this.friendService.ManageFriendship(Param);
    if (response.rtStatus) {
      if (response.rtResult?.StateCode === this.state.Accept) {
        this.lsFriend[item_index].StateCode = response.rtResult?.StateCode;
        this.lsFriend[item_index].IsSendRequest = response.rtResult?.IsSendRequest;
      }
      else this.lsFriend.splice(item_index, 1);
    }
  }
}
