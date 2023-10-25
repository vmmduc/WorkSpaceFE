

import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/SignalR.Service';
import { StorageKey } from '../../constants/constant';
import { Router } from '@angular/router';
import { OpenMessageDto } from '../../models/dtos/open-message.interface';
import { DataLocal } from '../../../base/DataLocal.Service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    receivedNavData: any;
    conversation: OpenMessageDto = {
        conversationId: 0,
        displayName: '',
        openMessage: false
    };
    openMessage: boolean = false;

    constructor(private router: Router, 
                private signalrService: SignalRService,
                private dataLocal: DataLocal) {
        const token = this.dataLocal.getToken();
        if (!token) this.router.navigate(['/']);
    }

    ngOnInit(): void {
        this.signalrService.getConnection();
    }
    handleData(data: any) {
        this.receivedNavData = data;
    }
    openConversation(data: OpenMessageDto) {
        this.conversation = data;
    }
}
