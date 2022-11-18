import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model()
export class HistoriaClinica extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRealizacion: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  visitaDescripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  veterinario: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;
