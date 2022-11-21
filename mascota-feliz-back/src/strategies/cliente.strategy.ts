import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core/dist/service";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

export class EstrategiaCliente implements AuthenticationStrategy{
    name: string ='cli';
   
    constructor(
       @service(AutenticacionService)
       public autenticacionService: AutenticacionService
    ){ }

    async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
        let token = parseBearerToken(request);
        if (token){
          let datos = this.autenticacionService.validarTokenJWTCliente(token);
           if (datos){ 
              let perfil: UserProfile = Object.assign({
                 nombre: datos.data.primerNombre
                }); 
                return perfil;
            }else{
                throw new HttpErrors [403] ('No tiene permiso para usar el servicio');
            }
        }  else{
            throw new HttpErrors [401]('No se ha detectado el token')
        }
    } 
}