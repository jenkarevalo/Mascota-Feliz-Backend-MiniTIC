import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotaFelizMongoDbDatasourceDataSource} from '../datasources';
import {Asesor, AsesorRelations, Administrador, Mascota, Solicitud} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {MascotaRepository} from './mascota.repository';
import {SolicitudRepository} from './solicitud.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Asesor.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mascotaFelizMongoDBDatasource') dataSource: MascotaFelizMongoDbDatasourceDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Asesor, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
