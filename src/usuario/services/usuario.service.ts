import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { usuario } });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const usuarioBusca = await this.findByUsuario(usuario.usuario);

    if (!usuario.peso || !usuario.altura || usuario.altura <= 0) {
      throw new HttpException(
        'Peso e altura devem ser informados corretamente!',
        HttpStatus.BAD_REQUEST,
      );
    }

    usuario.imc = +(usuario.peso / (usuario.altura * usuario.altura)).toFixed(2);

    if (!usuarioBusca) {
      return await this.usuarioRepository.save(usuario);
    }

    throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    const usuarioUpdate = await this.findById(usuario.id);
    const usuarioBusca = await this.findByUsuario(usuario.usuario);

    usuario.peso = usuario.peso ?? usuarioUpdate.peso;
    usuario.altura = usuario.altura ?? usuarioUpdate.altura;

    if (!usuario.peso || !usuario.altura || usuario.altura <= 0) {
      throw new HttpException(
        'Peso e altura devem ser informados corretamente!',
        HttpStatus.BAD_REQUEST,
      );
    }

    usuario.imc = +(usuario.peso / (usuario.altura * usuario.altura)).toFixed(2);

    if (!usuarioUpdate) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (usuarioBusca && usuarioBusca.id !== usuario.id) {
      throw new HttpException(
        'Usuário (e-mail) já cadastrado, digite outro!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.usuarioRepository.delete(id);
  }
}

