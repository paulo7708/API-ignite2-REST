import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionsParamsSchema.parse(request.params)

    const transactions = await knex('transactions').where('id', id).first()

    return { transactions }
  })

  //somando os valores de amount
  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount', { as: 'amount'}).first()

    return { summary }
  })

  app.post('/', async (request, response) => {

    //criando o Schema para validar os dados e adicionar intelisense com zod
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    //declarando variaveis e verificando com parse se as informaçoes estao vindo na request body
    const { title, amount, type } = createTransactionBodySchema.parse(request.body)

    //em rostas de crição n retornamos nada, insert=insere no BD, retornou só 201
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return response.status(201).send()
  })
}