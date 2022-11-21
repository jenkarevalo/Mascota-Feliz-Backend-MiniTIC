import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Asesor } from '../models';
import { AsesorRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AsesorService {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository
  ) {}

  getAsesorSolicitud(numeroDocumento:string): Promise<Asesor[]> {
    let asesores = this.asesorRepository.find({
      include: ['solicitud'],
      where:{
       numeroDocumento: numeroDocumento
      }
     });
    return asesores;
   }
}