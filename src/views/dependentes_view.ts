import Dependente from '../models/Dependente';
import fotos_dependenteView from './fotos_dependente_view';

export default {
  render(dependente: Dependente) {
    return {
      id: dependente.id,
      name: dependente.name,
      data_nascimento: dependente.data_nascimento,
      grau_parentesco: dependente.grau_parentesco,
      funcionario_id: dependente.funcionario_id,
      fotos_dependentes: fotos_dependenteView.renderMany(dependente.fotos_dependente)
    };
  },

  renderMany(dependentes: Dependente[]) {
    return dependentes.map(dependente => this.render(dependente))
  }
}