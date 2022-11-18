import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Pedidos} from './pedidos.model';
import {Imagen} from './imagen.model';

@model()
export class Productos extends Entity {
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
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Pedidos)
  pedidosId: string;

  @hasMany(() => Imagen)
  imagenes: Imagen[];

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
