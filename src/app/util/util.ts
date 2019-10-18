
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
}