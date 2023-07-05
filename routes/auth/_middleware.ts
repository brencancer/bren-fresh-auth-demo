import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { State } from "../_middleware.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const headers = new Headers();
  headers.set("location", "/login");

  if (!ctx.state.token) {
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  const { error } = await ctx.state.supabaseClient.auth.getUser(
    ctx.state.token,
  );
  if (error) {
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  return ctx.next();
}
