/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { API_v1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'


const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.use('/v1', API_v1)

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello world</h1>')
  })

  app.use(errorHandlingMiddleware)
  
  app.listen(env.APP_PORT, env.APP_HOST,() => {
    // eslint-disable-next-line no-console
    console.log('Hello Trung Quan Dev, I am running at http://localhost:3000/')
  })


}

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB Cloud Atlas'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
})

