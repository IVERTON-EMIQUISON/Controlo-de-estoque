const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:'); // Banco de dados em memória (ideal para testes)

app.use(cors());
app.use(express.json());

// Criar a tabela de produtos
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            tipo TEXT
        )
    `);
});

// Rota para adicionar um produto
app.post('/api/produto', (req, res) => {
    const { nome, quantidade, tipo } = req.body;
    db.run(`INSERT INTO produtos (nome, quantidade, tipo) VALUES (?, ?, ?)`, [nome, quantidade, tipo], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Rota para listar todos os produtos
app.get('/api/produtos', (req, res) => {
    db.all(`SELECT * FROM produtos`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Rota para atualizar a quantidade de um produto
app.put('/api/produto/:id', (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;
    db.run(`UPDATE produtos SET quantidade = ? WHERE id = ?`, [quantidade, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Exporta o servidor como uma função serverless
module.exports = app;
