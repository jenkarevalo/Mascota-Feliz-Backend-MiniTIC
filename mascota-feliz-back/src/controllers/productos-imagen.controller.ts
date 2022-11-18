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
  Productos,
  Imagen,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosImagenController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Array of Productos has many Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.productosRepository.imagenes(id).find(filter);
  }

  @post('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagenInProductos',
            exclude: ['id'],
            optional: ['productosId']
          }),
        },
      },
    }) imagen: Omit<Imagen, 'id'>,
  ): Promise<Imagen> {
    return this.productosRepository.imagenes(id).create(imagen);
  }

  @patch('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Productos.Imagen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Partial<Imagen>,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.productosRepository.imagenes(id).patch(imagen, where);
  }

  @del('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Productos.Imagen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.productosRepository.imagenes(id).delete(where);
  }
}
