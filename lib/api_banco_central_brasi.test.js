const axios = require('axios')
const { getURL,  addZero, getToday, getCotacaoAPI, extractCotacao, pure } = require('./api_banco_central_brasil')

jest.mock('axios')

test('getURL ', () => {
    const url = getURL('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('addZero ', () => {
    const value = addZero(9)
    expect(value).toBe('09')
})

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2020-02-01T19:00:00z')
        expect(getToday()).toBe('01-02-2020')
    })
})

test('getCotacaoAPI ', () => {
    const res = {
        data: [
            {
                'cotacaoCompra': 3.90
            }
        ]
    }

    axios.get.mockResolvedValue(res)
    getCotacaoAPI('url')
    .then(res => {
        expect(res).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('extractCotacao ', () => {
    const resp = {
        data: {
            value: [
                {
                    'cotacaoCompra': 3.90
                }
            ]
        } 
    }
    expect(extractCotacao(resp)).toEqual(3.90)
})

test('getCotacao ', () => {
    const res = {
        data: [
            {
                'cotacaoCompra': 3.90
            }
        ]
    }

    const getURL = jest.fn()
    getURL.mockReturnValue('url')

    const addZero = jest.fn()
    addZero.mockReturnValue(8)

    const getToday = jest.fn()
    getToday.mockReturnValue('01-02-2020')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)

    const  extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90) 
    
    pure.getCotacao({
        getToday, getURL, getCotacaoAPI, extractCotacao
    })().then(resp => {
        expect(resp).toBe(3.90)
    })
})

test('getCotacao ', () => {
    const res = { }

    const getURL = jest.fn()
    getURL.mockReturnValue('url')

    const addZero = jest.fn()
    addZero.mockReturnValue(8)

    const getToday = jest.fn()
    getToday.mockReturnValue('01-02-2020')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(Promise.reject('err'))

    const  extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90) 
    
    pure.getCotacao({
        getToday, getURL, getCotacaoAPI, extractCotacao
    })().then(resp => {
        expect(resp).toBe('')
    }).catch(resp => {
        expect(resp).toBe('')
    })
})



