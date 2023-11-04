import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'vnPhoneNumber'})
export class PhoneNumberPipe implements PipeTransform{
    transform(phoneNumber?: string) {
        if(phoneNumber === undefined)
            return null;
        else
            return `${phoneNumber.substring(0, 4)} ${phoneNumber.substring(4, 7)} ${phoneNumber.substring(7)}`;
    }
}