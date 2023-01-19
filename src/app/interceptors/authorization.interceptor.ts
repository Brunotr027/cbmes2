import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

import jwt_decode from 'jwt-decode';

export class AuthorizationInterceptor implements HttpInterceptor {

  // Cria uma variavel publica que vai receber as informacoes do token decodificado
  public decodedToken = this.getDecodedAccessToken(this.getCookie('JWT-TOKEN-CB'));

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // Observa��o: caso n�o tenha nada no sessionStorage, que �
        // o caso deste exemplo, o valor 'no_auth' ser� o default:
        const cookieValue = this.getCookie('JWT-TOKEN-CB');

        if (cookieValue === '') {
            console.log('go to portal');
            window.location.href = 'http://portal.cb.es.gov.br/portal-cbmes/#/login';
        }

        // Clona a requisi��o porque n�o podemos alterar
        // a inst�ncia do HttpHeaders, ela � imut�vel
        const authReq = req.clone({
            headers: req.headers.set('Authorization', cookieValue)
        });

        // Devolvemos a nova requisi��o com o header Authorization:
        return next.handle(authReq);
    }

    public getCookie(name: string) {
        const ca: Array<string> = document.cookie.split(';');
        // console.log(document.cookie);
        const caLen: number = ca.length;
        const cookieName = `${name}=`;
        let c: string;

        for (let i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            // tslint:disable-next-line:triple-equals
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    getDecodedAccessToken(token: string): any {
        try {
          // console.log(token);
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
