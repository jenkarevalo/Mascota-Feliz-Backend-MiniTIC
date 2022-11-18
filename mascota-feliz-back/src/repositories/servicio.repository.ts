import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MascotaFelizMongoDbDatasourceDataSource} from '../datasources';
import {Servicio, ServicioRelations, Plan} from '../models';
import {PlanRepository} from './plan.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.mascotaFelizMongoDBDatasource') dataSource: MascotaFelizMongoDbDatasourceDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Servicio, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
