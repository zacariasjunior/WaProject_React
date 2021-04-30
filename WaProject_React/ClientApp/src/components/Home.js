
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import BarChart from 'react-easy-bar-chart';
import Pagination from 'react-bootstrap-4-pagination';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";


export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { pedidos: [], pedidosPorDia: [], page: 1, totalDePedidos: 1, loading: true, loadingPedidos: true };
    }

    componentDidMount() {

        this.populateTotalDePedidos();

        this.populatepedidosPorDia();

        this.populatePedidos(1, 20);

    }
    someMethod() {
        this.setState({ state: this.state });
    }

    static renderGraph(pedidosPorDia) {
        return (
            <BarChart
                xAxis='Dias do mes'
                yAxis="Qt. Entregas"
                height={100}
                width={1200}
                data={pedidosPorDia}
            />
        );
    }


    render() {

        const { loadingPedidos } = this.state;

        const { page } = this.state

        const { pedidos } = this.state

        const { totalDePedidos } = this.state

        var pageSize = parseInt(20);

        var totalpages = parseInt(totalDePedidos / pageSize) + 1;

        let self = this;

        let paginationConfig = {
            totalPages: totalpages,
            currentPage: page,
            showMax: 5,
            size: "md",
            threeDots: true,
            prevNext: true,
            onClick: function (page) {

                self.setState({
                    loadingPedidos: true
                });
                fetch('ObterPedidos?pageNum=' + page + '&pageSize=' + pageSize)
                    .then((response) => response.json())
                    .then(result => {
                        //console.log(result);
                        self.setState({
                            pedidos: result,
                            page: page,
                            loadingPedidos: false
                        });
                    });

            }
        };

        let contentsGraph = this.state.loading
            ? <p><em>Carregando...</em></p>
            : Home.renderGraph(this.state.pedidosPorDia);

        return (
            <div>
                <h3>Desempenho diario</h3>
                {contentsGraph}
                <hr />
                <h3>Relatorio de pedidos</h3>
                <div className="App">
                    <Pagination {...paginationConfig} />
                </div>

                {loadingPedidos ? <p><em>Carregando...</em></p> :

                    <div className='table-responsive'>
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    
                                    <th>Identificacao</th>
                                    <th>Data de Criacao</th>
                                    <th>Data da Entrega</th>
                                    <th>Endereco</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map(pedido =>

                                    <>
                                        <tr key={pedido.id} data-toggle="collapse"
                                            data-target={".multicollapsetarget" + pedido.id}
                                            aria-controls={"multicollapsetargetcontrols" + pedido.id}
                                        >
                                           
                                            <td>#{pedido.id}</td>
                                            <td>{new Date(pedido.dataDeCriacao).toLocaleDateString()}</td>
                                            <td>{new Date(pedido.dataDaEntregaRealizada).toLocaleDateString()}</td>
                                            <td>{pedido.enderecoEntregaRealizada}</td>
                                            <td>+Detalhes</td>
                                        </tr>
                                        <tr className={"collapse multicollapsetarget" + pedido.id} id={"multicollapsetargetcontrols" + pedido.id}>
                                            <td colSpan={5} >
                                                <div >
                                                    <div>
                                                        Equipe - Nome:{pedido.equipe.nome}, Descricao : {pedido.equipe.descricao}, Placa do veiculo : {pedido.equipe.placaDoVeiculo}
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        Produtos
                                                    <hr />
                                                    </div>
                                                    {pedido.produtos.map((produto) => (
                                                        <div key={produto.id}>
                                                            - Nome: {produto.nome},  Descricao: {produto.descricao}, Valor: <NumberFormat value={produto.valor} displayType={'text'} thousandSeparator={true} prefix={'R$'} />

                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );



    }
    async populateTotalDePedidos() {
        try {
            const response = await fetch('totalDePedidos');
            const data = await response.json();
            this.setState({ totalDePedidos: data });
        } catch (e) {
            alert("Erro ao carregar conteudo");
        }
    }
    async populatepedidosPorDia() {
        try {
            const response = await fetch('ObterEntregasPorDia');
            const data = await response.json();
            console.log(data);
            this.setState({ pedidosPorDia: data });
        } catch (e) {
            alert("Erro ao carregar conteudo");
        }
    }
    async populatePedidos(pageNum, pageSize) {
        try {
            const response = await fetch('ObterPedidos?pageNum=' + pageNum + '&pageSize=' + pageSize);
            const data = await response.json();
            this.setState({ pedidos: data, loadingPedidos: false, loading: false });
        } catch (e) {
            alert("Erro ao carregar conteudo");
        }
    }



}
