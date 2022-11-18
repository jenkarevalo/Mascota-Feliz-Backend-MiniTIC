import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  Administrador,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanAdministradorController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Administrador> {
    return this.planRepository.administrador(id);
  }
}
