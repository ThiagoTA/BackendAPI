import { Router } from 'express';
import multer from 'multer';

import uploadconfig from '../config/upload';
import FuncionariosController from '../controllers/FuncionarioController';
import DependenteController from '../controllers/DependenteController'


const routes = Router();
const upload = multer(uploadconfig)

routes.get('/funcionarios', FuncionariosController.index);
routes.get('/funcionarios/:id', FuncionariosController.show);
routes.put('/funcionarios/:id/update', upload.array('fotos_funcionarios'), FuncionariosController.update);
routes.delete('/funcionarios/:id', FuncionariosController.delete);
routes.post('/funcionarios', upload.array('fotos_funcionarios'), FuncionariosController.create);
routes.put('/funcionarios/:id/curtir', upload.array('fotos_funcionarios'), FuncionariosController.curtir);
routes.put('/funcionarios/:id/descurtir', upload.array('fotos_funcionarios'), FuncionariosController.descurtir);

routes.get('/dependentes', DependenteController.index);
routes.get('/dependentes/:id', DependenteController.show);
routes.put('/dependentes/:id/update', upload.array('fotos_dependentes'), DependenteController.update);
routes.delete('/dependentes/:id', DependenteController.delete);
routes.post('/dependentes', upload.array('fotos_dependentes'), DependenteController.create);

export default routes;