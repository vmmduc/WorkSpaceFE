import { StorageKey } from "../chat-module/constants/constant";

export class DataLocal {
    userId: number;
    email: string;
    fullName: string;
    phoneNumber: string;
    token: string;

    constructor(){
        this.userId = 0;
        this.email = '';
        this.fullName = '';
        this.phoneNumber = '';
        this.token = '';
    }
    setId(userId?: number) : DataLocal {
        this.userId = userId || 0;
        return this;
    }
    setEmail(email?: string): DataLocal {
        this.email = email || '';
        return this;
    }
    setFullName(fullName?: string) : DataLocal {
        this.fullName = fullName || '';
        return this;
    }
    setPhoneNumber(phoneNumber?: string) : DataLocal {
        this.phoneNumber = phoneNumber || '';
        return this;
    }
    setToken(token?: string) : DataLocal {
        this.token = token || '';
        return this;
    }
    getId = () => parseInt(localStorage.getItem(StorageKey.PK_USER_ID) || '0');
    getEmail = () => localStorage.getItem(StorageKey.EMAIL);
    getFullName = () => localStorage.getItem(StorageKey.FULL_NAME);
    getPhoneNumber = () => localStorage.getItem(StorageKey.PHONE_NUMBER);
    getToken = () => localStorage.getItem(StorageKey.TOKEN);

    build() {
        localStorage.setItem(StorageKey.PK_USER_ID, String(this.userId));
        localStorage.setItem(StorageKey.EMAIL, this.email);
        localStorage.setItem(StorageKey.FULL_NAME, this.fullName);
        localStorage.setItem(StorageKey.PHONE_NUMBER, this.phoneNumber);
        localStorage.setItem(StorageKey.TOKEN, this.token);
    }

    clear = () => localStorage.clear() 
}