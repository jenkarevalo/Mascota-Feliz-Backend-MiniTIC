import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';
import {Asesor} from './asesor.model';

@model()
export class Solicitud extends Entity {
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
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
