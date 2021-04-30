using System;
using System.Collections.Generic;

namespace WaProject_React.Models
{

    public class Pedido
    {

        public int Id { get; set; }
        public DateTime DataDeCriacao { get; set; }
        public DateTime DataDaEntregaRealizada { get; set; }
        public string EnderecoEntregaRealizada { get; set; }
        public IEnumerable<Produto> Produtos { get; set; }
        public Equipe Equipe { get; set; }
    }
}
