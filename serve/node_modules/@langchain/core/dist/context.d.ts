/**
 * Set a context variable. Context variables are scoped to any
 * child runnables called by the current runnable, or globally if set outside
 * of any runnable.
 *
 * @remarks
 * This function is only supported in environments that support AsyncLocalStorage,
 * including Node.js, Deno, and Cloudflare Workers.
 *
 * @example
 * ```ts
 * import { RunnableLambda } from "@langchain/core/runnables";
 * import {
 *   getContextVariable,
 *   setContextVariable
 * } from "@langchain/core/context";
 *
 * const nested = RunnableLambda.from(() => {
 *   // "bar" because it was set by a parent
 *   console.log(getContextVariable("foo"));
 *
 *   // Override to "baz", but only for child runnables
 *   setContextVariable("foo", "baz");
 *
 *   // Now "baz", but only for child runnables
 *   return getContextVariable("foo");
 * });
 *
 * const runnable = RunnableLambda.from(async () => {
 *   // Set a context variable named "foo"
 *   setContextVariable("foo", "bar");
 *
 *   const res = await nested.invoke({});
 *
 *   // Still "bar" since child changes do not affect parents
 *   console.log(getContextVariable("foo"));
 *
 *   return res;
 * });
 *
 * // undefined, because context variable has not been set yet
 * console.log(getContextVariable("foo"));
 *
 * // Final return value is "baz"
 * const result = await runnable.invoke({});
 * ```
 *
 * @param name The name of the context variable.
 * @param value The value to set.
 */
export declare function setContextVariable<T>(name: PropertyKey, value: T): void;
/**
 * Get the value of a previously set context variable. Context variables
 * are scoped to any child runnables called by the current runnable,
 * or globally if set outside of any runnable.
 *
 * @remarks
 * This function is only supported in environments that support AsyncLocalStorage,
 * including Node.js, Deno, and Cloudflare Workers.
 *
 * @example
 * ```ts
 * import { RunnableLambda } from "@langchain/core/runnables";
 * import {
 *   getContextVariable,
 *   setContextVariable
 * } from "@langchain/core/context";
 *
 * const nested = RunnableLambda.from(() => {
 *   // "bar" because it was set by a parent
 *   console.log(getContextVariable("foo"));
 *
 *   // Override to "baz", but only for child runnables
 *   setContextVariable("foo", "baz");
 *
 *   // Now "baz", but only for child runnables
 *   return getContextVariable("foo");
 * });
 *
 * const runnable = RunnableLambda.from(async () => {
 *   // Set a context variable named "foo"
 *   setContextVariable("foo", "bar");
 *
 *   const res = await nested.invoke({});
 *
 *   // Still "bar" since child changes do not affect parents
 *   console.log(getContextVariable("foo"));
 *
 *   return res;
 * });
 *
 * // undefined, because context variable has not been set yet
 * console.log(getContextVariable("foo"));
 *
 * // Final return value is "baz"
 * const result = await runnable.invoke({});
 * ```
 *
 * @param name The name of the context variable.
 */
export declare function getContextVariable<T = any>(name: PropertyKey): T | undefined;
