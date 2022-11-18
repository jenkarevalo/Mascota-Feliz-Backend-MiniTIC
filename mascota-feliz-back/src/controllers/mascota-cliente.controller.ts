import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  Cliente,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaClienteController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Cliente> {
    return this.mascotaRepository.cliente(id);
  }
}
