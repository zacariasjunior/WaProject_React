namespace WaProject_React.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public int PedidoId { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
    }
}
