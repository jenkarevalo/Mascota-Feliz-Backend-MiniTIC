import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistoriaClinica,
  Mascota,
} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

export class HistoriaClinicaMascotaController {
  constructor(
    @repository(HistoriaClinicaRepository)
    public historiaClinicaRepository: HistoriaClinicaRepository,
  ) { }

  @get('/historia-clinicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof HistoriaClinica.prototype.id,
  ): Promise<Mascota> {
    return this.historiaClinicaRepository.mascota(id);
  }
}
