import { serve } from '@hono/node-server'
import { Context,Hono } from 'hono'
import * as dotenv from 'dotenv';
import companyRouter from './router/companyRouter';

dotenv.config();
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/companies', companyRouter);

const port = Number(process.env.PORT)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

app.onError((err: any, c: Context) => {
  
  console.error(err);
  c.status(err.status || 555);
  return c.json({
    status: err.status || 555,
    success: false,
    message: err.message || "Internal server error",
    errData: err.errData || undefined,
  });
});