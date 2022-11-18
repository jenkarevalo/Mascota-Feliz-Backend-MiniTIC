import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  HistoriaClinica,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaHistoriaClinicaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Array of Mascota has many HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaClinica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.mascotaRepository.historiasClinicas(id).find(filter);
  }

  @post('/mascotas/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinicaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.mascotaRepository.historiasClinicas(id).create(historiaClinica);
  }

  @patch('/mascotas/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Mascota.HistoriaClinica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: Partial<HistoriaClinica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.mascotaRepository.historiasClinicas(id).patch(historiaClinica, where);
  }

  @del('/mascotas/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Mascota.HistoriaClinica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.mascotaRepository.historiasClinicas(id).delete(where);
  }
}
