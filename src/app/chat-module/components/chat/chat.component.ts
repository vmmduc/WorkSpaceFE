import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ConversationService } from '../../services/Conversation.Service';
import { SignalRService } from '../../services/SignalR.Service';
import { SendMessageObj } from '../../models/object/Conversations/send-message.interface';
import { ConversationObj } from '../../models/object/Conversations/conversation.interface';
import { OpenMessageDto } from '../../models/dtos/open-message.interface';
import { DataLocal } from '../../../base/DataLocal.Service';
import { PreparingMessageObj } from '../../models/object/Conversations/preparing-message.interface';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnChanges, OnInit, AfterViewInit {
  // * Biến lưu trữ sự kiện
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef | undefined;
  @ViewChildren('item') itemElements: QueryList<any> | undefined;
  private scrollContainer: any;
  isLoading: boolean = false;
  scrollToBottom: boolean = true;

  // * Biến lưu dùng dể biding
  @Input() conversationId: number = 0;
  @Input() inputConv: OpenMessageDto = {
    conversationId: 0,
    displayName: '',
    openMessage: false
  };
  messageContent: string = '';
  conversation: ConversationObj;
  prepareMessage: boolean = false;
  displayName: string = '';

  // Lấy data
  tmpConversationId: number = this.conversationId;
  pageIndex: number = 1;
  pageSize: number = 20;
  currentUserId: number = this.dataLocal.getId();

  constructor(private conversationService: ConversationService,
              private signalrService: SignalRService,
              private dataLocal: DataLocal) {
    this.conversation = {
      conversationId: 0,
      isGroup: false,
      displayName: '',
      lsMessage: [],
      conversationMembers: []
    }
  }

  // OnInit
  async ngOnInit() {
    // * Lắng nghe tin nhắn phản hồi
    this.signalrService.onListenReceive('ReceiveMessage', (response) => {
      let conversation = JSON.parse(response) as ConversationObj
      this.conversation.lsMessage.push(conversation.message!);
    })

    this.signalrService.onListenReceive('ReceivePreparingMessage' , (status) => {
      this.prepareMessage = status
    })
  }

  // AfterViewInit
  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame?.nativeElement;
    this.itemElements?.changes.subscribe(_ => {
      if (this.scrollToBottom) {
        this.scroll();
      }
    });

  }

  // OnChanges
  async ngOnChanges(): Promise<void> {
    if (this.tmpConversationId !== this.conversationId) {
      let Param: any = {
        conversationId: this.conversationId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      let response = await this.conversationService.GetConversationById(Param);
      if (response.rtStatus) {
        this.conversation.lsMessage = response.rtResult?.lsMessage || [];
        this.displayName = this.conversation.displayName || '';
      }
    }
  }

  async sendMessage() {
    if (this.messageContent !== '') {
      var lastMessage = this.conversation.lsMessage[this.conversation.lsMessage.length - 1];
      let lastDateMsg = new Date(lastMessage.createdDate)
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - lastDateMsg.getTime();
      let groupId = 0;
      /*
          * mặc định sẽ không có nhóm nào
          ?? nếu tin nhắn cuối cùng so với thời gian hiện tại mà nhỏ hơn 15p thì thêm vào nhóm với tin nhắn cuối cùng
      */
      if (this.isToday(lastMessage.createdDate) && timeDifference / (60 * 1000) < 15 && lastMessage.senderId === this.currentUserId)
        groupId = lastMessage.groupId != 0 ? lastMessage.groupId : lastMessage.messageId;

      let request: SendMessageObj = {
        conversationId: this.conversationId,
        messageContent: this.messageContent,
        groupId: groupId,
        senderId: this.currentUserId,
      }
      await this.signalrService.SendMessageToConversationId(request)
      this.messageContent = '';
    }
  }

  scroll() {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'auto'
    });
    this.scrollToBottom = false;
  }

  async onScrollUp() {
    this.pageIndex += 1;

    let Param: any = {
      conversationId: this.conversationId,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    let response = await this.conversationService.GetConversationById(Param);
    if (response.rtStatus)
      this.conversation.lsMessage?.unshift(...response.rtResult?.lsMessage || [])
  }

  async onFocus(data: boolean) {
    let request: PreparingMessageObj = {
      conversationId: this.conversationId,
      senderId: this.currentUserId,
      status: data
    }
    await this.signalrService.PreparingMessage(request)
  }

  isToday(date: Date): boolean {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear();
  }

  compareDate(date1: Date, date2: Date) {
    const inputDate1 = new Date(date1);
    const inputDate2 = new Date(date2);
    return inputDate1.getUTCDate() === inputDate2.getUTCDate();
  }
}
