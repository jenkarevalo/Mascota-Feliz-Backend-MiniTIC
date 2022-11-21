import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Cliente } from '../models';
import { ClienteRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ClienteService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) {}

  getClienteMascota(numeroDocumento:string): Promise<Cliente[]> {
    let clientes = this.clienteRepository.find({
      include: ['mascota'],
      where:{
       numeroDocumento: numeroDocumento 
      }
     });
    return clientes;
   }
}