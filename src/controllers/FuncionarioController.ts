import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';

import * as Yup from 'yup';

import Funcionario from '../models/Funcionario';
import funcionarios_view from '../views/funcionarios_view';



export default {

  async create(request: Request, response: Response) {

    const {
      name,
      funcao,
      departamento,
      email,
      telefone,
      curtir
    } = request.body
  
    const funcionarioRepository = getRepository(Funcionario);

    const requestFotos_funcionarios = request.files as Express.Multer.File[];

    const fotos_funcionario = requestFotos_funcionarios.map(fotos_funcionario => {
      return { path: fotos_funcionario.filename }
    });

    const data = {
      name,
      funcao,
      departamento,
      email,
      telefone,
      curtir,
      fotos_funcionario
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatório'),
      funcao: Yup.string().required('Função Obrigatório'),
      departamento: Yup.string().required('Departamento Obrigatório'),
      email: Yup.string().required('Email Obrigatório').email(),
      telefone: Yup.string().required('Telefone Obrigatório').max(11, 'Máximo 11').min(10, 'Mínimo 10'),
      curtir: Yup.string(),
      fotos_funcionario: Yup.array(Yup.object().shape({
        path: Yup.string().required('Foto Obrigatório')
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const funcionario = funcionarioRepository.create(data);
  
    await funcionarioRepository.save(funcionario);
  
    return response.status(201).json(funcionario);
  },   

  async update(request: Request, response: Response){

    const { id } = request.params;

   const funcionarioRepository = getRepository(Funcionario);

   const {
     name,
     funcao,
     departamento,
     email,
     telefone,
   } = request.body
   
   let data = {
     name,
     funcao,
     departamento,
     email,
     telefone,
   }
let procura = await funcionarioRepository.findOneOrFail(id)
 if(data.name == undefined){
   data.name = procura.name
}
if(data.funcao == undefined) {
 data.funcao = procura.funcao
}
if(data.departamento == undefined) {
 data.departamento = procura.departamento
}
if(data.email == undefined) {
 data.email = procura.email
}
if(data.telefone == undefined) {
 data.telefone = procura.telefone
}

  await getConnection() 
   .createQueryBuilder()
   .update(Funcionario)
   .set({ 
     name: data.name,
     funcao: data.funcao,
     departamento: data.departamento,
     email: data.email,
     telefone: data.telefone,
   })
   .where(`id = ${id}`)
   .execute();  
   
   const funcionariosUpdate = await funcionarioRepository.findOneOrFail(id);
   return response.json(funcionarios_view.render(funcionariosUpdate) ); 
 },  

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const funcionarioRepository = getRepository(Funcionario);

    await funcionarioRepository.delete(id)
    
    return response.json('Funcionário Excluído')
  },
  
  async index(request: Request, response: Response) {
    const funcionarioRepository = getRepository(Funcionario);

    const funcionario = await funcionarioRepository.find({
      relations: ['fotos_funcionario']
    });
    
    return response.json(funcionarios_view.renderMany(funcionario));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const funcionarioRepository = getRepository(Funcionario);

    const funcionario = await funcionarioRepository.findOneOrFail(id, {
      relations: ['fotos_funcionario']
    });
    
    return response.json(funcionarios_view.render(funcionario));
  },

  async curtir(request: Request, response: Response) {
    const { id } = request.params
 
    const funcionariosRepository = getRepository(Funcionario);
 
    const procurar = await funcionariosRepository.findOneOrFail(id);
    
      procurar.curtir += 1
     
    await getConnection() 
    .createQueryBuilder()
    .update(Funcionario)
    .set({ 
      curtir: procurar.curtir
    })
    .where(`id = ${id}`)
    .execute();  
    
    const funcionarios = await funcionariosRepository.findOneOrFail(id);
 
    return response.json(funcionarios_view.render(funcionarios)); 
  },
  
  async descurtir(request: Request, response: Response) {
    const { id } = request.params
 
    const funcionariosRepository = getRepository(Funcionario);
 
    const procurar = await funcionariosRepository.findOneOrFail(id);
    
      procurar.curtir -= 1
     
    await getConnection() 
    .createQueryBuilder()
    .update(Funcionario)
    .set({ 
      curtir: procurar.curtir
    })
    .where(`id = ${id}`)
    .execute();  
    
    const funcionarios = await funcionariosRepository.findOneOrFail(id);
 
    return response.json(funcionarios_view.render(funcionarios)); 
  }
}