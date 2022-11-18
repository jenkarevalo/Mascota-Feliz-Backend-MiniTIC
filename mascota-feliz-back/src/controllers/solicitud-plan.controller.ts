import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Plan,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPlanController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Plan> {
    return this.solicitudRepository.plan(id);
  }
}
