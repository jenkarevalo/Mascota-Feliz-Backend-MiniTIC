import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Solicitud} from './solicitud.model';
import {Mascota} from './mascota.model';
import {Servicio} from './servicio.model';

@model()
export class Plan extends Entity {
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
  nombrePlan: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionPlan: string;

  @property({
    type: 'number',
    required: true,
  })
  precioPlan: number;

  @belongsTo(() => Administrador)
  administradorId: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => Servicio)
  servicios: Servicio[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
