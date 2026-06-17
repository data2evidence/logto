import { ResponseError } from '@withtyped/client';

/**
 * Extend the ResponseError from @withtyped/client.
 * This class is used to parse the error from the local VM to the WithTyped client response error.
 * So we can unify the error handling and display logic for both local VM and Cloud version.
 */
export class LocalVmError extends ResponseError {
  constructor(errorBody: Record<string, unknown>, statusCode: number) {
    super(
      new Response(
        new Blob([JSON.stringify(errorBody)], {
          type: 'application/json',
        }),
        {
          status: statusCode,
        }
      )
    );
  }
}

/**
 * Stub implementation for Deno environment.
 * The node:vm module is not supported in Deno, so custom JWT scripts cannot run locally.
 *
 * This function is used to execute a named function in a customized code script in a local
 * virtual machine with the given payload as input.
 *
 * @param script Custom code snippet.
 * @param functionName The name of the function to be executed.
 * @param payload The input payload for the function.
 * @returns The result of the function execution.
 */
export const runScriptFunctionInLocalVm = async (
  _script: string,
  _functionName: string,
  _payload: unknown
) => {
  throw new Error(
    'Custom JWT scripts (node:vm) are not supported in Deno environment. Please use Logto Cloud for this feature.'
  );
};

/**
 * Build the error body for the local VM error.
 *
 * @remarks
 *
 * Catch the error from vm module, and build the error body.
 * Use Error instance check for Deno compatibility.
 *
 */
export const buildLocalVmErrorBody = (error: unknown) =>
  error instanceof Error
    ? { message: error.message, stack: error.stack }
    : { message: String(error) };
