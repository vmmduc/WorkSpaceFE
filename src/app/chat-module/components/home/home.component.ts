import { AuthService } from '../../../base/Auth.Service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/SignalR.Service';
import { Router } from '@angular/router';
import { OpenMessageDto } from '../../models/dtos/open-message.interface';
import { DataLocal } from '../../../base/DataLocal.Service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  sendDataToChild: any;
  conversation: OpenMessageDto = {
    conversationId: 0,
    displayName: '',
    openMessage: false
  };
  openMessage: boolean = false;

  constructor(private router: Router,
    private authService: AuthService,
    private signalrService: SignalRService,
    private dataLocal: DataLocal) {
    const token = this.dataLocal.getToken();
    if (!token) this.router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    this.showChatBoxDOM(false);
    this.showNavigationBarDOM();
  }

  ngOnInit(): void {
    this.signalrService.getConnection();
  }

  handleNavigation(data: any) {
    this.sendDataToChild = data
  }

  Logout(){
    this.authService.Logout();
  }

  openConversation = (data: OpenMessageDto) => {
    let navigation_visited = document.getElementById('idNavigation')?.classList.contains('navigation-visible');
    if (!navigation_visited) {
      this.conversation = data;
      this.showChatBoxDOM(true);
    }
  }

  // Sử lý sự kiện
  showChatBoxDOM(flag: boolean) {
    if (!flag) {
      let btnHide = document.getElementById('btnHideChat');
      if (btnHide) {
        btnHide.addEventListener('click', (event) => {
          let mainContent = document.getElementById('idMainContent');
          if (mainContent && mainContent.classList.contains('main-visible'))
            mainContent.classList.remove('main-visible')
          event.stopPropagation();
        });
      }
    }
    else {
      let mainContent = document.getElementById('idMainContent');
      if (mainContent && !mainContent.classList.contains('main-visible'))
        mainContent.classList.add('main-visible')
    }
  }

  showNavigationBarDOM() {
    let btnToggle = document.getElementById('idToggle');
    let navigation = document.getElementById('idNavigation');
    if (btnToggle) {
      btnToggle.addEventListener('click', (event) => {
        if (navigation)
          navigation.classList.toggle('navigation-visible');
        event.stopPropagation();
      });
    }

    document.body.addEventListener('click', (event) => {
      if (navigation && navigation.classList.contains('navigation-visible'))
        navigation.classList.remove('navigation-visible');
      event.stopPropagation();
    })
  }
}
