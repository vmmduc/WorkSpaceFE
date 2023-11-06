import {Component, Input } from '@angular/core';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-contents.component.html',
  styleUrls: ['./chat-contents.component.css'],
})
export class ChatContentCompontent {
  @Input() conversation: any;
  @Input() currentUserId = 0;
  utils = Utils;
}
