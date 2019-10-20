import { HttpHeaders } from '@angular/common/http';

export class Util {

    static getErrorMessage(res): string {
        let message: string = '<ul class="list-errors">';
        if (res.error.message) {
          message = res.error.message;
        } if (res.error.error) {
          message = res.error.error;
        }else if(res.error.error_description){
            message = res.error.error_description;
        }else {
            message = res.message;
        }
        return `${message}</ul>`;
      }
    
      static getHeader() {
        return new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic dG9td2VsbEFwcDowNm9HZyNLRmFCcjE0VE43QGVaTEJ5U3N0JEt1VUR4bQ=='
        });
      }
}