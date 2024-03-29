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
import {Administrador, Credenciales} from '../models';
import {AdministradorRepository} from '../repositories';
import { AdministradorService } from '../services';
import { AutenticacionService } from '../services/autenticacion.service';

//@authenticate("admin")
export class AdministradorController {
  constructor(
    @repository(AdministradorRepository) 
    public administradorRepository : AdministradorRepository,
    @service(AutenticacionService) 
    public autenticationService: AutenticacionService,
    @service(AdministradorService)
    public administradorService: AdministradorService,
  ) {}

  @post('/validar-acceso')
  @response (200, {
    description: 'Validar las credenciales de acceso del administrador'
  })
  async validarAccesovalidarAccesoAdmin(
    @requestBody() credenciales: Credenciales
  ){
    let admin = await this.autenticationService.validarAccesoAdmin(credenciales.usuario, credenciales.clave);
    if (admin){
      let token = this.autenticationService.generarTokenJWTAdmin(admin);
      return {
        datos:{
          nombre: `${admin.primerNombre} ${admin.primerApellido}`,
          email: admin.email,
          id: admin.id
        },
        token: token
      }
    }
  }

  @post('/administradores')
  @response(200, {
    description: 'Administrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministrador',
            exclude: ['id'],
          }),
        },
      },
    })
    administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    administrador.clave = this.autenticationService.CifrarClave(administrador.clave);
    let admin = await this.administradorRepository.create(administrador);

    let destino = administrador.email;
    let asunto = 'Registro exitoso'
    let contenido = `Hola ${administrador.primerNombre} ${administrador.primerApellido}, su usuario es: ${administrador.email}, su contraseña es:${administrador.clave} `;

    fetch(`http://localhost:5000/enviar-correo?correo=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data) => {
        console.log(`Esta es la respuesta del servicio ${data}`);
      })
    return admin;
  }

  @get('/administradores/count')
  @response(200, {
    description: 'Administrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradores')
  @response(200, {
    description: 'Array of Administrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradores')
  @response(200, {
    description: 'Administrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradores/{id}')
  @response(200, {
    description: 'Administrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Administrador>
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @get('/administrador-plan/{numeroDocumento}')
  @response(200, {
  description: 'Consulta de administrador con planes',
  content: {
      'application/json': {
      schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async AdministradorDisponible(
  @param.path.string('numeroDocumento') numeroDocumento: string
  ): Promise<Administrador[]> {
    return this.administradorService.getAdministradorPlan(numeroDocumento);
  }

  @patch('/administradores/{id}')
  @response(204, {
    description: 'Administrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradores/{id}')
  @response(204, {
    description: 'Administrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradores/{id}')
  @response(204, {
    description: 'Administrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }
}
