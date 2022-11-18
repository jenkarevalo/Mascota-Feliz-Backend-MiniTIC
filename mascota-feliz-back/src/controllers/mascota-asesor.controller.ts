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
  Asesor,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaAsesorController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Asesor> {
    return this.mascotaRepository.asesor(id);
  }
}
