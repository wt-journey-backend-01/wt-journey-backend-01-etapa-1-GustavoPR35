const express = require('express')

const app = express()
const PORT = 3000
const path = require('path')
const viewsPath = path.join(__dirname, 'views')
const lanches = require('./public/data/lanches.js')

app.use(express.static(viewsPath))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(viewsPath, 'index.html'))
})

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(viewsPath, 'contato.html'))
})

app.get('/sugestao', (req, res) => {
    const nome = req.query.nome
    const ingredientes = req.query.ingredientes
    res.status(200).send(`
        <head>
            <link rel="stylesheet" href="/css/style.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
        </head>
        <body>
            <main>
                <nav>
                    <div class="logo-container">
                        <img src="/image/devburger-logo.svg" alt="Logo da DevBurger" class="logo">
                        <a href="/">DevBurger</a>
                    </div>
                    <div class="nav-links">
                        <a href="/contato">CONTATO</a>
                        <a href="/api/lanches">LANCHES</a>
                    </div>
                </nav>
                <h1>Agradecemos pela sugestão de lanche!</h1>
                <p>Nome: ${nome}</p>
                <p>Ingredientes: ${ingredientes}</p>                
            </main>
        </body>
    `)
})

app.get('/api/lanches', (req, res) => {
    res.status(200).json(lanches)
})

app.post('/contato', (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const assunto = req.body.assunto
    const mensagem = req.body.mensagem
    res.status(200).send(`
        <head>
            <link rel="stylesheet" href="/css/style.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
        </head>
        <body>
            <main>
                <nav>
                    <div class="logo-container">
                        <img src="/image/devburger-logo.svg" alt="Logo da DevBurger" class="logo">
                        <a href="/">DevBurger</a>
                    </div>
                    <div class="nav-links">
                        <a href="/contato">CONTATO</a>
                        <a href="/api/lanches">LANCHES</a>
                    </div>
                </nav>
                <h1>Agradecemos pela mensagem!</h1>
                <p>Nome: ${nome}</p>
                <p>Email: ${email}</p>
                <p>Assunto: ${assunto}</p>
                <p>Mensagem: ${mensagem}</p>
            </main>
        </body>
    `)
})

// Trata rotas não existentes
app.use((req, res) => {
    res.status(404).sendFile(path.join(viewsPath, '404.html'))
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`)
})