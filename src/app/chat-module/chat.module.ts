import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatTabComponent } from './components/sidebar/chat-tab/chat-tab.component';
import { FriendsTabComponent } from './components/sidebar/friends-tab/friends-tab.component';
import { SearchTabComponent } from './components/sidebar/search-tab/search-tab.component';
import { SettingTabComponent } from './components/sidebar/setting-tab/setting-tab.component';
import { FormsModule } from '@angular/forms';
import { SignalRService } from './services/SignalR.Service';
import { FriendService } from './services/Friend.Service';
import { UserService } from './services/User.Service';
import { ChatComponent } from './components/chat/chat.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Toast, ToastrService } from 'ngx-toastr';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent,
    SidebarComponent,
    ChatComponent,
    ChatTabComponent,
    FriendsTabComponent,
    SearchTabComponent,
    SettingTabComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
  ],
  exports: [RouterModule],
  providers: [SignalRService, FriendService, UserService],
})
export class ChatModule {}
