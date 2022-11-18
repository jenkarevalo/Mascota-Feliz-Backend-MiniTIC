import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Imagen,
  Productos,
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenProductosController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) { }

  @get('/imagens/{id}/productos', {
    responses: {
      '200': {
        description: 'Productos belonging to Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async getProductos(
    @param.path.string('id') id: typeof Imagen.prototype.id,
  ): Promise<Productos> {
    return this.imagenRepository.productos(id);
  }
}
