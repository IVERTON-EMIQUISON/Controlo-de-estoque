let estoque = [];

// Função para buscar todos os produtos do banco de dados e atualizar a tabela
async function buscarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/api/produtos');
        estoque = await response.json();
        atualizarTabela();
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

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

// Função para adicionar um produto ao banco de dados
async function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const tipo = document.getElementById("tipo").value;

    if (nome && quantidade > 0 && tipo) {
        try {
            const response = await fetch('http://localhost:3000/api/produto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, quantidade, tipo })
            });
            if (response.ok) {
                await buscarProdutos(); // Atualiza a tabela após adicionar o produto
                document.getElementById("nome").value = "";
                document.getElementById("quantidade").value = "";
                document.getElementById("tipo").value = "";
            } else {
                alert("Erro ao adicionar produto.");
            }
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para retirar uma quantidade de um produto do banco de dados
async function retirarProduto() {
    const nome = document.getElementById("retirarNome").value;
    const quantidade = parseInt(document.getElementById("retirarQuantidade").value);

    if (nome && quantidade > 0) {
        const produto = estoque.find(produto => produto.nome === nome);
        if (produto) {
            if (produto.quantidade >= quantidade) {
                const novaQuantidade = produto.quantidade - quantidade;
                try {
                    const response = await fetch(`http://localhost:3000/api/produto/${produto.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ quantidade: novaQuantidade })
                    });
                    if (response.ok) {
                        await buscarProdutos(); // Atualiza a tabela após atualizar o produto
                    } else {
                        alert("Erro ao atualizar produto.");
                    }
                } catch (error) {
                    console.error("Erro ao atualizar produto:", error);
                }
            } else {
                alert("Quantidade insuficiente no estoque.");
            }
        } else {
            alert("Produto não encontrado no estoque.");
        }

        document.getElementById("retirarNome").value = "";
        document.getElementById("retirarQuantidade").value = "";
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Carregar os produtos ao carregar a página
buscarProdutos();
