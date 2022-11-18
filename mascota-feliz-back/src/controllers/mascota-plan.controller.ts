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
  Plan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPlanController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Plan> {
    return this.mascotaRepository.plan(id);
  }
}
