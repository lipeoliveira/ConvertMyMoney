const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const { convert, toMoney } = require('./lib/convert')

app.set('view engine', 'ejs')
app.set('vews', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    const conv = convert(cotacao, quantidade)
    if (cotacao && quantidade) {
        res.render('cotacao', {
            cotacao: toMoney(cotacao),
            quantidade: toMoney(quantidade),
            conv: toMoney(conv), 
            error: false 
        })
    } else {
        res.render('cotacao', {
           error: 'Valores inválidos' 
        })
    }
})

app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log('ConvertMyMoney está online')
})
