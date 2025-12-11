import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm/browser";
import { TipoTreinoService } from "../services/tipotreino.service";
import { TipoTreino } from "../entities/tipotreino.entity";

@Controller("/treinos") // Indica que a classe e uma controller
export class TipoTreinoController {

    constructor(private readonly tipoTreinoService: TipoTreinoService) { }

    @Get() 
    @HttpCode(HttpStatus.OK) 
    findAll(): Promise<TipoTreino[]> {
        return this.tipoTreinoService.findAll();

    }

    @Get("/:id_treino") 
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_treino', ParseIntPipe) id_treino: number): Promise<TipoTreino> {
        return this.tipoTreinoService.findById(id_treino);

    }
    
    @Get('/nivel/:nivel')
    @HttpCode(HttpStatus.OK) // resposta padrão será o código de status HTTP OK → 200
    findByNivel(@Param('nivel') nivel: string): Promise<TipoTreino[]> {
        return this.tipoTreinoService.findByNivel(nivel);

    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK) // resposta padrão será o código de status HTTP OK → 200
    findByDescricao(@Param('descricao') descricao: string): Promise<TipoTreino[]> {
        return this.tipoTreinoService.findByDescricao(descricao);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // resposta padrão será o código de status HTTP create 201
    create(@Body() tipoTreino: TipoTreino): Promise<TipoTreino> {
      return this.tipoTreinoService.create(tipoTreino);
    }

    @Put() // Mapeia todas as requisições do HTTP PUT
    @HttpCode(HttpStatus.OK)
    update(@Body() tipoTreino: TipoTreino): Promise<TipoTreino> {
        return this.tipoTreinoService.update(tipoTreino); // executa e retorna atualizando o DB
     }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) 
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.tipoTreinoService.delete(id); 
    }
    
}