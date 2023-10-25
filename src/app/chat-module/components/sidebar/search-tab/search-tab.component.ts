import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/User.Service';
import { Action, State } from '../../../constants/constant';
import { FriendService } from '../../../services/Friend.Service';
import { FriendObj } from '../../../models/object/Friends/friend.interface';
import { ConfirmFriendDto } from '../../../models/dtos/accept-friend.interface';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.css']
})
export class SearchTabComponent {
  @Input() dataFromParent: any;
  @Input() searchResult!: FriendObj[];
  inputSerch: string = "";
  state: any = State;
  action: any = Action;

  constructor(private userService: UserService, private friendService: FriendService) { }

  async search() {
    let response = await this.userService.FindUser(this.inputSerch);
    this.searchResult = response.rtList || []
  }

  async MakeFriend(item_index: number, FriendId: number) {
    let Param: any = { FriendId };
    let response = await this.friendService.MakeFriend(Param);
    if (response.rtStatus) {
      if (response.rtResult != null) this.searchResult[item_index] = response.rtResult
    }
  }

  async ManageFriendship(item_index: number, FriendId: number, actionId: number) {
    let Param: ConfirmFriendDto = { PK_FRIEND_SHIP: FriendId, friendAction: actionId };
    let response = await this.friendService.ManageFriendship(Param);
    if (response.rtStatus) {
      this.searchResult[item_index].StateCode = response.rtResult?.StateCode;
      this.searchResult[item_index].IsSendRequest = response.rtResult?.IsSendRequest
    }
  }
}
