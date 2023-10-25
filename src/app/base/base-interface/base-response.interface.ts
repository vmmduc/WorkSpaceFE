export default interface BaseResponse<T> {
  rtResult?: T;
  rtList: any[] | []
  rtTotal?: number;
  rtMessage?: string;
  rtStatus?: boolean;
  rtCode?: number;
}
