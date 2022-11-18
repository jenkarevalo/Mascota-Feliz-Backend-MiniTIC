import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Cliente,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosClienteController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
  ): Promise<Cliente> {
    return this.pedidosRepository.cliente(id);
  }
}
