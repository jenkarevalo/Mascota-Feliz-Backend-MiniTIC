import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotaFelizMongoDbDatasourceDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Plan, Asesor} from '../models';
import {PlanRepository} from './plan.repository';
import {AsesorRepository} from './asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly planes: HasManyRepositoryFactory<Plan, typeof Administrador.prototype.id>;

  public readonly asesores: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mascotaFelizMongoDBDatasource') dataSource: MascotaFelizMongoDbDatasourceDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.asesores = this.createHasManyRepositoryFactoryFor('asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesores', this.asesores.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
