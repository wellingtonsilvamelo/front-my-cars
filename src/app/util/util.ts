
export class Util {

    static getErrorMessage(res): string {
        let message: string = '<ul class="list-errors">';
        if (res.error.errors) {
          if (res.error.errors.length > 1) {
            res.error.errors.forEach((item) => {
              message += `<li>${item}</li>`
            });
          } else if (res.error.errors.length == 1) {
            message = res.error.errors[0];
          }
        } else if(res.error.error_description){
            message = res.error.error_description;
        }else {
            message = res.message;
        }
        return `${message}</ul>`;
      }
}