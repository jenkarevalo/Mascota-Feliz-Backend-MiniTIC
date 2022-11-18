import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MascotaFelizMongoDbDatasourceDataSource} from '../datasources';
import {Contacto, ContactoRelations} from '../models';

export class ContactoRepository extends DefaultCrudRepository<
  Contacto,
  typeof Contacto.prototype.id,
  ContactoRelations
> {
  constructor(
    @inject('datasources.mascotaFelizMongoDBDatasource') dataSource: MascotaFelizMongoDbDatasourceDataSource,
  ) {
    super(Contacto, dataSource);
  }
}
