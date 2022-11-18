import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Servicio} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository : ServicioRepository,
  ) {}

  @post('/servicios')
  @response(200, {
    description: 'Servicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.servicioRepository.create(servicio);
  }

  @get('/servicios/count')
  @response(200, {
    description: 'Servicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Servicio) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.servicioRepository.count(where);
  }

  @get('/servicios')
  @response(200, {
    description: 'Array of Servicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Servicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Servicio) filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.servicioRepository.find(filter);
  }

  @patch('/servicios')
  @response(200, {
    description: 'Servicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Servicio,
    @param.where(Servicio) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.servicioRepository.updateAll(servicio, where);
  }

  @get('/servicios/{id}')
  @response(200, {
    description: 'Servicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Servicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Servicio, {exclude: 'where'}) filter?: FilterExcludingWhere<Servicio>
  ): Promise<Servicio> {
    return this.servicioRepository.findById(id, filter);
  }

  @patch('/servicios/{id}')
  @response(204, {
    description: 'Servicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Servicio,
  ): Promise<void> {
    await this.servicioRepository.updateById(id, servicio);
  }

  @put('/servicios/{id}')
  @response(204, {
    description: 'Servicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() servicio: Servicio,
  ): Promise<void> {
    await this.servicioRepository.replaceById(id, servicio);
  }

  @del('/servicios/{id}')
  @response(204, {
    description: 'Servicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.servicioRepository.deleteById(id);
  }
}
