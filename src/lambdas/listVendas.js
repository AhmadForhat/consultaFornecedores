const rp = require('request-promise-native')
const arrayObject = require('@ziro/array-object')
const stringToDate = require('@ziro/string-to-date')
const optionsBatchGet = require('../apoio/googlesheets/optionsbatchGet')
const main = require('../templates/main')
require('dotenv').config()

const getEmployees = async (event) => {
    try {
        const results = await rp(optionsBatchGet(['Boletos!A:J']))
        const [dataBaseBoletos] = results.valueRanges 
        const baseBoletos = arrayObject(dataBaseBoletos)
        const {dataInicio, dataFim, fabricante, status} = event.queryStringParameters
        if(dataInicio || dataFim || fabricante || staus){
            const result = baseBoletos.filter((values) => {
                return values.status === status && values.fornecedor === fabricante && stringToDate(values.venda) >= stringToDate(dataInicio) && stringToDate(values.venda) <= stringToDate(dataFim)
            })
            return {
                statusCode: 200,
                body: JSON.stringify(result)
            }
        }else{
            return {
                statusCode: 200,
                body: JSON.stringify(baseBoletos)
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}

module.exports = { handler: main(getEmployees) }