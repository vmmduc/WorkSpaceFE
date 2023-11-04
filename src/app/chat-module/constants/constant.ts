export const Constants = {
  apiUrl: 'http://localhost:5156'
}

export const StorageKey = {
  PK_USER_ID: 'PK_USER_ID',
  EMAIL: 'EMAIL',
  FULL_NAME: 'FULL_NAME',
  PHONE_NUMBER: 'PHONE_NUMBER',
  TOKEN: 'TOKEN'
}

export const State = {
  WaitingConfirm: 'WCF',
  Accept: 'ACP',
  Reject: 'REJ',
  Cancel: 'CAN'
}

export enum Action { ACCEPT, REJECT, CANCEL, ADD };
