import { ConversationMemberObj } from './conversation-member.interface';
import { MessageObj } from './message.interface';

export interface ConversationObj {
  conversationId?: number;
  isGroup?: boolean;
  message?: MessageObj;
  displayName: string | '';
  unreadMessageCount?: number;
  lsMessage: MessageObj[];
  conversationMembers: ConversationMemberObj[];
}
