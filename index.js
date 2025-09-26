// =================================================================
// 1. IMPORTAÇÕES (todas as dependências juntas no topo)
// =================================================================
const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcrypt');

// =================================================================
// 2. INICIALIZAÇÃO E CONFIGURAÇÃO DO APP (Middlewares)
// =================================================================
const app = express();
const port = 3000;

// Middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

// =================================================================
// 3. DEFINIÇÃO DAS ROTAS
// =================================================================

// Rota principal de teste
app.get('/', (req, res) => {
  res.send('Servidor no ar e banco de dados sincronizado!');
});

// Rota de cadastro de usuário
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

// =================================================================
// 4. SINCRONIZAÇÃO COM BANCO E INICIALIZAÇÃO DO SERVIDOR
// =================================================================

// Função para sincronizar os models com o banco de dados
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

// Inicializa o servidor e sincroniza o banco de dados
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  syncDatabase();
});