import Fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = Fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions').select('*')
  // const transaction = await knex('transactions').insert({
  //   id: crypto.randomUUID(),
  //   title: 'Transação de teste',
  //   amount: 1000,
  // }).returning('*')

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running')
  })
