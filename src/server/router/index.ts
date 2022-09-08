// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { categoryRouter } from './category';
import { statusRouter } from './status';
import { productRequestRouter } from './productRequests';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('category.', categoryRouter)
  .merge('status.', statusRouter)
  .merge('user.', userRouter)
  .merge('productRequest.', productRequestRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
