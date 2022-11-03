// src/utils/trpc.ts
import type { AppRouter } from "../server/router";
import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"],
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter["_def"]["queries"],
> = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"],
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"],
> = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;


export type User = inferQueryOutput<'user.getAllUsers'>[number];
export type Users = inferQueryOutput<'user.getAllUsers'>;

export type Comment = inferQueryOutput<'commentRequest.getAllComments'>[number];

export type CommentWithReplies = Comment & {
  replies: Array<CommentWithReplies>;
};

export type ProductRequest = inferQueryOutput<'productRequest.getAllProductRequests'>[number];

export type Category = inferQueryOutput<'category.getAllCategories'>[number];

export type Status = inferQueryOutput<'status.getAllStatus'>[number];