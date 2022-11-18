import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Productos,
  Pedidos,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosPedidosController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Pedidos belonging to Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async getPedidos(
    @param.path.string('id') id: typeof Productos.prototype.id,
  ): Promise<Pedidos> {
    return this.productosRepository.pedidos(id);
  }
}
