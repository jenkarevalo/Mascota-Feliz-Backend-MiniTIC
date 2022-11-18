import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Solicitud} from './solicitud.model';
import {Plan} from './plan.model';
import {HistoriaClinica} from './historia-clinica.model';
import {Asesor} from './asesor.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  @belongsTo(() => Plan)
  planId: string;

  @hasMany(() => HistoriaClinica)
  historiasClinicas: HistoriaClinica[];

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
