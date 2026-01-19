import { createServer } from 'node:http'
import Koa from 'koa'
import parseArgv from 'yargs-parser'

import dataRouter from './routes/data.js'
import gameRouter from './routes/game/index.js'

import './db/index.js'

global.argv = parseArgv(process.argv.slice(2))

const app = new Koa({
  proxy: !!global.argv.proxy,
  maxIpsCount: 1
})

if (global.argv.debug) {
  app.use(async (ctx, next) => {
    console.log('<', ctx.request.url)
    await next()
  })
}

app.use(dataRouter.routes())
app.use(gameRouter.routes())

const server = createServer(app.callback())
const desiredPort = 'port' in global.argv
  ? parseInt(global.argv.port)
  : 8080
const desiredAddr = global.argv.addr ?? '10.0.0.95'
server.listen(desiredPort, desiredAddr, () => {
  const { address, port } = server.address()
  console.log(`listen addr=${address} port=${port}`)
})
