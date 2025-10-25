export function measureTime<T>(fn: () => T): { result: T; timeTaken: string } {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return { result, timeTaken: `${(end - start).toFixed(2)}ms` };
}
