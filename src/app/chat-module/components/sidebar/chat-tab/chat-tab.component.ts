import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationObj } from '../../../models/object/Conversations/conversation.interface';
import { ConversationService } from '../../../services/Conversation.Service';
import { OpenMessageDto } from '../../../models/dtos/open-message.interface';
import { FriendService } from '../../../services/Friend.Service';
import { FriendObj } from '../../../models/object/Friends/friend.interface';
import { SignalRService } from '../../../services/SignalR.Service';
import { DataLocal } from '../../../../base/DataLocal.Service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.css'],
})
export class ChatTabComponent implements OnInit {
  @Output() getConversation = new EventEmitter<any>();
  lsFriend: FriendObj[] = [];
  lsConversation: ConversationObj[] = [];
  flag: boolean = true;

  constructor(
    private dataLocal: DataLocal,
    private friendService: FriendService,
    private signalrService: SignalRService,
    private conversationService: ConversationService
  ) {}

  async ngOnInit(): Promise<void> {
    // !Lấy danh sách tin nhắn
    let response = await this.conversationService.GetListConversation();
    this.lsConversation = response.rtList;

    // !Nếu có tin nhắn thì mở tin nhắn đầu tiên
    if (this.lsConversation.length > 0) {
      let firstConversation = this.lsConversation[0];
      this.openMessage(
        firstConversation.conversationId || 0,
        firstConversation.displayName || ''
      );
    }

    this.listenNewMessage();
  }

  // !Lắng nghe xem có tin nhắn mới nào gửi đến không
  listenNewMessage() {
    this.signalrService.onListenReceive('ReceiveMessage', (response) => {
      let res = JSON.parse(response) as ConversationObj;

      let index = this.lsConversation.findIndex((elem) => {
        return elem.conversationId == res.conversationId;
      });

      // !Set tin nhắn chưa đọc
      let currentMember = res.conversationMembers.find(
        (x) => x.userId === this.dataLocal.getId()
      );
      res.unreadMessageCount = currentMember?.unreadMessageCount;

      // !Nếu chưa có cuộc trò chuyện thì set tên hiển thị
      if (index === -1) {
        let displayName = '';
        if (res.isGroup) {
          displayName = res.displayName;
        } else {
          let item = res.conversationMembers.find(
            (x) => x.userId !== this.dataLocal.getId()
          );
          if (item !== undefined)
            displayName =
              item.pseudonym !== '' ? item.pseudonym : item.fullName;
        }
        res.displayName = displayName;
        this.lsConversation.push(res);
      } else {
        // ! Nếu đã có cuộc trò chuyện thì đẩy cuộc trò chuyện đó lên đầu
        this.lsConversation.splice(index, 1);
        this.lsConversation.unshift(res);
      }
    });
  }

  // Gọi api lấy danh sách bạn bè rồi trả về cho friend-tab
  async showFriendsTab() {
    if (this.flag) {
      let responseData = await this.friendService.GetListFriends();
      if (responseData.rtStatus) this.lsFriend = responseData.rtList || [];
      this.flag = false; // chặn không cho gọi api liên tục
    }
  }

  openMessage(conversationId: number, displayName: string) {
    let getConversationObj: OpenMessageDto = {
      conversationId: conversationId,
      displayName: displayName,
      openMessage: true,
    };
    this.getConversation.emit(getConversationObj);
  }
}
