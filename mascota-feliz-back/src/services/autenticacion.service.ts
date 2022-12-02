import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import generador from "password-generator";
import { llaves } from '../config/llaves';
import { Administrador, Asesor, Cliente } from '../models';
import { AdministradorRepository, AsesorRepository, ClienteRepository } from '../repositories';
const cryptoJS = require ("crypto-js");
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) {}

  CifrarClave(clave: string): string {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
  
  GenerarClave() {
    let clave = generador(8, false);
    return this.CifrarClave(clave);
  }

  validarAcceso(usuario: string, contrasenia: string) {
    try {
      let clie = this.clienteRepository.findOne({
        where: {
          email: usuario,
          clave: contrasenia
        }
      });
      if (clie)
        return clie;

      return false;
    } catch (error) {
      return false;
    };
  };

  generarTokenJWT(cliente: Cliente) {
    let token = jwt.sign({
      date: {
        id: cliente.id,
        correo: cliente.email,
        nombre: `${cliente.primerNombre} ${cliente.primerApellido}`
      }
    },
      llaves.claveJWT
    );
    return token;
  };

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  };
  
  validarAccesoAsesor(usuario: string, contrasenia: string) {
    try {
      let ase = this.asesorRepository.findOne({
        where: {
          email: usuario,
          clave: contrasenia
        }
      });
      if (ase)
        return ase;

      return false;
    } catch (error) {
      return false;
    };
  };

  generarTokenJWTAsesor(asesor: Asesor) {
    let token = jwt.sign({
      date: {
        id: asesor.id,
        correo: asesor.email,
        nombre: `${asesor.primerNombre} ${asesor.primerApellido}`
      }
    },
      llaves.claveJWT
    );
    return token;
  };

  validarTokenJWTAAsesor(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  };

  validarAccesoAdmin(usuario: string, contrasenia: string) {
    try {
      let admin = this.administradorRepository.findOne({
        where: {
          email: usuario,
          clave: contrasenia
        }
      });
      if (admin)
        return admin;

      return false;
    } catch (error) {
      return false;
    };
  };

  generarTokenJWTAdmin(admin: Administrador) {
    let token = jwt.sign({
      date: {
        id: admin.id,
        correo: admin.email,
        nombre: `${admin.primerNombre} ${admin.primerApellido}`
      }
    },
      llaves.claveJWT
    );
    return token;
  };

  validarTokenJWTAdmin(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  };
}
