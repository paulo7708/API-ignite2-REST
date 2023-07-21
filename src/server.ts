import Fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = Fastify()

app.register(cookie)

//plugins do fastify precisa ser uma funcção async
app.register(transactionsRoutes, { prefix: 'transactions' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running')
  })
