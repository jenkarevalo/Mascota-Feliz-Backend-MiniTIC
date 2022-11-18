import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Plan,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioPlanController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<Plan> {
    return this.servicioRepository.plan(id);
  }
}
