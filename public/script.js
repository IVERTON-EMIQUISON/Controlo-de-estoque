// Array para armazenar os produtos
let estoque = [];

// Função para atualizar a tabela com os produtos no estoque
function atualizarTabela() {
    const tabela = document.getElementById("estoqueTabela");
    tabela.innerHTML = ""; // Limpa a tabela

    estoque.forEach(produto => {
        const row = document.createElement("tr");

        const nomeCell = document.createElement("td");
        nomeCell.textContent = produto.nome;
        row.appendChild(nomeCell);

        const quantidadeCell = document.createElement("td");
        quantidadeCell.textContent = produto.quantidade;
        row.appendChild(quantidadeCell);

        const tipoCell = document.createElement("td");
        tipoCell.textContent = produto.tipo;
        row.appendChild(tipoCell);

        tabela.appendChild(row);
    });
}

// Função para adicionar um produto ao estoque
function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const tipo = document.getElementById("tipo").value;

    if (nome && quantidade > 0 && tipo) {
        // Verifica se o produto já existe no estoque
        const produtoExistente = estoque.find(produto => produto.nome === nome);

        if (produtoExistente) {
            // Atualiza a quantidade do produto existente
            produtoExistente.quantidade += quantidade;
        } else {
            // Adiciona um novo produto ao estoque
            estoque.push({ nome, quantidade, tipo });
        }

        // Limpa os campos de entrada
        document.getElementById("nome").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("tipo").value = "";

        atualizarTabela();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para retirar uma quantidade de um produto do estoque
function retirarProduto() {
    const nome = document.getElementById("retirarNome").value;
    const quantidade = parseInt(document.getElementById("retirarQuantidade").value);

    if (nome && quantidade > 0) {
        const produto = estoque.find(produto => produto.nome === nome);

        if (produto) {
            if (produto.quantidade >= quantidade) {
                // Reduz a quantidade do produto
                produto.quantidade -= quantidade;

                // Remove o produto do estoque se a quantidade chegar a zero
                if (produto.quantidade === 0) {
                    estoque = estoque.filter(prod => prod.nome !== nome);
                }
            } else {
                alert("Quantidade insuficiente no estoque.");
            }

            atualizarTabela();
        } else {
            alert("Produto não encontrado no estoque.");
        }

        // Limpa os campos de entrada
        document.getElementById("retirarNome").value = "";
        document.getElementById("retirarQuantidade").value = "";
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Atualiza a tabela inicialmente
atualizarTabela();
