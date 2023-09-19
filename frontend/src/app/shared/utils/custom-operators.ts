import { Observable, defer, tap } from 'rxjs';

export function tapOnce<T>(fn: (value: any) => void) {
  return (source: Observable<any>) =>
    defer(() => {
      let first = true;
      return source.pipe(
        tap<T>((payload) => {
          if (first) {
            fn(payload);
          }
          first = false;
        }),
      );
    });
}
