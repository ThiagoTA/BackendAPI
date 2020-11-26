import Funcionario from '../models/Funcionario';
import fotos_funcionarioView from './fotos_funcionario_view';

export default {
  render(funcionario: Funcionario) {
    return {
      id: funcionario.id,
      name: funcionario.name,
      funcao: funcionario.funcao,
      departamento: funcionario.departamento,
      email: funcionario.email,
      telefone: funcionario.telefone,
      curtir: funcionario.curtir,
      fotos_funcionario: fotos_funcionarioView.renderMany(funcionario.fotos_funcionario)
    };
  },

  renderMany(funcionarios: Funcionario[]) {
    return funcionarios.map(funcionario => this.render(funcionario))
  }
}