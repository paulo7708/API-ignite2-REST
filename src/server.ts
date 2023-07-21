import Fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = Fastify()


//plugins do fastify precisa ser uma funcção async
app.register(transactionsRoutes, { prefix: 'transactions' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running')
  })
