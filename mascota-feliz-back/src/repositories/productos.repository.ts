import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotaFelizMongoDbDatasourceDataSource} from '../datasources';
import {Productos, ProductosRelations, Pedidos, Imagen} from '../models';
import {PedidosRepository} from './pedidos.repository';
import {ImagenRepository} from './imagen.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly pedidos: BelongsToAccessor<Pedidos, typeof Productos.prototype.id>;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.mascotaFelizMongoDBDatasource') dataSource: MascotaFelizMongoDbDatasourceDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Productos, dataSource);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.pedidos = this.createBelongsToAccessorFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
