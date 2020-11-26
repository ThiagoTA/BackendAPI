import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import dependenteView from '../views/dependentes_view';

import * as Yup from 'yup';

import Dependente from '../models/Dependente';



export default {

  async update(request: Request, response: Response){

    const { id } = request.params;

   const dependenteRepository = getRepository(Dependente);

   const {
     name,
     data_nascimento,
     grau_parentesco,
     funcionario_id,
   } = request.body
   
   let data = {
     name,
     data_nascimento,
     grau_parentesco,
     funcionario_id,
   }
let procura = await dependenteRepository.findOneOrFail(id)
 if(data.name == undefined){
   data.name = procura.name
}
if(data.data_nascimento == undefined) {
 data.data_nascimento = procura.data_nascimento
}
if(data.grau_parentesco == undefined) {
 data.grau_parentesco = procura.grau_parentesco
}
if(data.funcionario_id == undefined) {
 data.funcionario_id = procura.funcionario_id
}

  await getConnection() 
   .createQueryBuilder()
   .update(Dependente)
   .set({ 
     name: data.name,
     data_nascimento: data.data_nascimento,
     grau_parentesco: data.grau_parentesco,
     funcionario_id: data.funcionario_id,
   })
   .where(`id = ${id}`)
   .execute();  
   
   const dependentesUpdate = await dependenteRepository.findOneOrFail(id);
   return response.json(dependenteView.render(dependentesUpdate)); 
 }, 

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const dependenteRepository = getRepository(Dependente);

    await dependenteRepository.delete(id)
    
    return response.json('Dependente Excluído')
  },
  
  async index(request: Request, response: Response) {
    const dependenteRepository = getRepository(Dependente);

    const dependente = await dependenteRepository.find({
      relations: ['fotos_dependente']
    });
    
    return response.json(dependenteView.renderMany(dependente));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const dependenteRepository = getRepository(Dependente);

    const dependente = await dependenteRepository.findOneOrFail(id, {
      relations: ['fotos_dependente']
    });
    
    return response.json(dependenteView.render(dependente));
  },

  async create(request: Request, response: Response) {

    const {
      name,
      data_nascimento,
      grau_parentesco,
      funcionario_id

    } = request.body
  
    const dependenteRepository = getRepository(Dependente);

    const requestFotos_dependentes = request.files as Express.Multer.File[];

    const fotos_dependente = requestFotos_dependentes.map(fotos_dependente => {
      return { path: fotos_dependente.filename }
    })
  
    const data = {
      name,
      data_nascimento,
      grau_parentesco,
      funcionario_id,
      fotos_dependente
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatório'),
      data_nascimento: Yup.string().required('Data de Nascimento Obrigatório'),
      grau_parentesco: Yup.string().required('Grau Parentesco Obrigatório'),
      funcionario_id: Yup.string().required('ID do funcionário Obrigatório'),
      fotos_dependente: Yup.array(Yup.object().shape({
        path: Yup.string().required('Foto Obrigatório')
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const dependente = dependenteRepository.create(data);
  
    await dependenteRepository.save(dependente);
  
    return response.status(201).json(dependente);
  }
}