import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import fetch from 'cross-fetch';
import {Asesor, Credenciales} from '../models';
import {AsesorRepository} from '../repositories';
import { AutenticacionService } from '../services/autenticacion.service';
import { AsesorService } from '../services';

//@authenticate("ase")
export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository : AsesorRepository,
    @service(AutenticacionService)
    public autenticationService: AutenticacionService,
    @service(AsesorService)
    public asesorService: AsesorService,
  ) {}

  @post('/validar-acceso-ase')
  @response (200, {
    description: 'Validar las credenciales de acceso del asesor'
  })
  async validarAccesoAsesor(
    @requestBody() credenciales: Credenciales
  ){
    let ase = await this.autenticationService.validarAccesoAsesor(credenciales.usuario, credenciales.clave);
    if (ase){
      let token = this.autenticationService.generarTokenJWTAsesor(ase);
      return {
        datos:{
          nombre: `${ase.primerNombre} ${ase.primerApellido}`,
          email: ase.email,
          id: ase.id
        },
        token: token
      }
    }
  }

  @post('/asesores')
  @response(200, {
    description: 'Asesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    asesor.clave = this.autenticationService.CifrarClave(asesor.clave);
    let ase = await this.asesorRepository.create(asesor);

    let destino = asesor.email;
    let asunto = 'Registro exitoso'
    let contenido = `Hola ${asesor.primerNombre} ${asesor.primerApellido}, su usuario es: ${asesor.email}, su contraseña es:${asesor.clave} `;

    fetch(`http://localhost:5000/enviar-correo?correo=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data) => {
        console.log(`Esta es la respuesta del servicio ${data}`);
      })
    return ase;
  }

  @get('/asesores/count')
  @response(200, {
    description: 'Asesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/asesores')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesores')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesores/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @get('/asesor-solicitud/{numeroDocumento}')
  @response(200, {
  description: 'Consulta de asesor con las solicitudes',
  content: {
      'application/json': {
      schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async AsesorDisponible(
  @param.path.string('numeroDocumento') numeroDocumento: string
  ): Promise<Asesor[]> {
    return this.asesorService.getAsesorSolicitud(numeroDocumento);
  }

  @patch('/asesores/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesores/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesores/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
