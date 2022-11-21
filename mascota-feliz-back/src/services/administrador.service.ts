import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Administrador } from '../models';
import { AdministradorRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository
  ) {}

  getAdministradorPlan(numeroDocumento:string): Promise<Administrador[]> {
    let administradores = this.administradorRepository.find({
      include: ['plan'],
      where:{
       numeroDocumento: numeroDocumento 
      }
     });
    return administradores;
   }
}