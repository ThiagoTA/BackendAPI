import Fotos_dependente from '../models/Fotos_dependente';

export default {
  render(fotos_dependente: Fotos_dependente) {
    return {
      id: fotos_dependente.id,
      url: `http://localhost:3333/uploads/${fotos_dependente.path}`,
  
    };
  },

  renderMany(fotos_dependentes: Fotos_dependente[]) {
    return fotos_dependentes.map(fotos_dependente => this.render(fotos_dependente))
  }
}