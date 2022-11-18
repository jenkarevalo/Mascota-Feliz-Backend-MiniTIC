import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotaFelizMongoDbDatasourceDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Solicitud, Plan, HistoriaClinica, Asesor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {SolicitudRepository} from './solicitud.repository';
import {PlanRepository} from './plan.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';
import {AsesorRepository} from './asesor.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Mascota.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof Mascota.prototype.id>;

  public readonly historiasClinicas: HasManyRepositoryFactory<HistoriaClinica, typeof Mascota.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mascotaFelizMongoDBDatasource') dataSource: MascotaFelizMongoDbDatasourceDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Mascota, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.historiasClinicas = this.createHasManyRepositoryFactoryFor('historiasClinicas', historiaClinicaRepositoryGetter,);
    this.registerInclusionResolver('historiasClinicas', this.historiasClinicas.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
