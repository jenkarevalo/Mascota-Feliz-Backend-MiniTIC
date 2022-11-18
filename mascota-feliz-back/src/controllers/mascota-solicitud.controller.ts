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
  Solicitud,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaSolicitudController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Solicitud> {
    return this.mascotaRepository.solicitud(id);
  }
}
