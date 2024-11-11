"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextVariable = exports.setContextVariable = void 0;
/* __LC_ALLOW_ENTRYPOINT_SIDE_EFFECTS__ */
const node_async_hooks_1 = require("node:async_hooks");
const langsmith_1 = require("langsmith");
const run_trees_1 = require("langsmith/run_trees");
const index_js_1 = require("./singletons/index.cjs");
index_js_1.AsyncLocalStorageProviderSingleton.initializeGlobalInstance(new node_async_hooks_1.AsyncLocalStorage());
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setContextVariable(name, value) {
    const runTree = index_js_1.AsyncLocalStorageProviderSingleton.getInstance().getStore();
    const contextVars = { ...runTree?.[index_js_1._CONTEXT_VARIABLES_KEY] };
    contextVars[name] = value;
    let newValue = {};
    if ((0, run_trees_1.isRunTree)(runTree)) {
        newValue = new langsmith_1.RunTree(runTree);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newValue[index_js_1._CONTEXT_VARIABLES_KEY] = contextVars;
    index_js_1.AsyncLocalStorageProviderSingleton.getInstance().enterWith(newValue);
}
exports.setContextVariable = setContextVariable;
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getContextVariable(name) {
    const runTree = index_js_1.AsyncLocalStorageProviderSingleton.getInstance().getStore();
    return runTree?.[index_js_1._CONTEXT_VARIABLES_KEY]?.[name];
}
exports.getContextVariable = getContextVariable;
