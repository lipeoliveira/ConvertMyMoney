const axios = require('axios')

const getURL = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const addZero = (value) => {
    return value <= 9 ? `0${value}` : value
}

const getToday = () => {
    const today = new Date()
    return `${addZero(today.getDate())}-${addZero(today.getMonth() + 1)}-${today.getFullYear()}`
}

const getCotacaoAPI = url => axios.get(url)

const extractCotacao = resp => resp.data.value[0].cotacaoCompra

const getCotacao = async () => {
    try {
        const today = getToday()
        const url = getURL(today)
        const resp = await getCotacaoAPI(url)
        const cotacao = extractCotacao(resp)
        return cotacao

    } catch(e) {
        return ''
    } 
}

console.log(getToday());
