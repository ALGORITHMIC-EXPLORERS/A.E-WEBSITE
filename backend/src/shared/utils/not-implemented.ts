export function notImplemented<T>(feature: string, method: string): T {
  throw new Error(
    `${feature}.${method} is not implemented yet. Fill this in inside the service layer.`
  );
}
