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
import {Contacto} from '../models';
import {ContactoRepository} from '../repositories';

export class ContactoController {
  constructor(
    @repository(ContactoRepository)
    public contactoRepository : ContactoRepository,
  ) {}

  @post('/contactos')
  @response(200, {
    description: 'Contacto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contacto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contacto, {
            title: 'NewContacto',
            exclude: ['id'],
          }),
        },
      },
    })
    contacto: Omit<Contacto, 'id'>,
  ): Promise<Contacto> {
    return this.contactoRepository.create(contacto);
  }

  @get('/contactos/count')
  @response(200, {
    description: 'Contacto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contacto) where?: Where<Contacto>,
  ): Promise<Count> {
    return this.contactoRepository.count(where);
  }

  @get('/contactos')
  @response(200, {
    description: 'Array of Contacto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contacto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contacto) filter?: Filter<Contacto>,
  ): Promise<Contacto[]> {
    return this.contactoRepository.find(filter);
  }

  @patch('/contactos')
  @response(200, {
    description: 'Contacto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contacto, {partial: true}),
        },
      },
    })
    contacto: Contacto,
    @param.where(Contacto) where?: Where<Contacto>,
  ): Promise<Count> {
    return this.contactoRepository.updateAll(contacto, where);
  }

  @get('/contactos/{id}')
  @response(200, {
    description: 'Contacto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contacto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contacto, {exclude: 'where'}) filter?: FilterExcludingWhere<Contacto>
  ): Promise<Contacto> {
    return this.contactoRepository.findById(id, filter);
  }

  @patch('/contactos/{id}')
  @response(204, {
    description: 'Contacto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contacto, {partial: true}),
        },
      },
    })
    contacto: Contacto,
  ): Promise<void> {
    await this.contactoRepository.updateById(id, contacto);
  }

  @put('/contactos/{id}')
  @response(204, {
    description: 'Contacto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contacto: Contacto,
  ): Promise<void> {
    await this.contactoRepository.replaceById(id, contacto);
  }

  @del('/contactos/{id}')
  @response(204, {
    description: 'Contacto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactoRepository.deleteById(id);
  }
}
