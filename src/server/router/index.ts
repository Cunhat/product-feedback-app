// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { categoryRouter } from "./category";
import { statusRouter } from "./status";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("category.", categoryRouter)
  .merge("status.", statusRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
