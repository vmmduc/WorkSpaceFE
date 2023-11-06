export class Utils {
  static isToday(date: Date): boolean {
    const today = new Date();
    const inputDate = new Date(date);
    return (
      inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()
    );
  }

  static compareDate(date1: Date, date2: Date) {
    const inputDate1 = new Date(date1);
    const inputDate2 = new Date(date2);
    return inputDate1.getUTCDate() === inputDate2.getUTCDate();
  }
}
