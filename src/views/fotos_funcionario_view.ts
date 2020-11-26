import Fotos_funcionario from '../models/Fotos_funcionario';

export default {
  render(fotos_funcionario: Fotos_funcionario) {
    return {
      id: fotos_funcionario.id,
      url: `http://localhost:3333/uploads/${fotos_funcionario.path}`,
  
    };
  },

  renderMany(fotos_funcionarios: Fotos_funcionario[]) {
    return fotos_funcionarios.map(fotos_funcionario => this.render(fotos_funcionario))
  }
}