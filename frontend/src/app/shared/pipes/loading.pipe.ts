import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';

export interface ObsWithStatusResult<T> {
  loading?: boolean;
  value?: T;
  error?: string;
}

const defaultError = 'Something went wrong';

@Pipe({
  name: 'loading',
})
export class LoadingPipe implements PipeTransform {
  transform<T = any>(val: Observable<T>): Observable<ObsWithStatusResult<T>> {
    return val.pipe(
      map((value: any) => {
        return {
          loading: value.type === 'start',
          error: value.type === 'error' ? defaultError : '',
          value: value.type ? value.value : value,
        };
      }),
      startWith({ loading: true }),
      catchError((error) =>
        of({
          loading: false,
          error: typeof error === 'string' ? error : defaultError,
        })
      )
    );
  }
}
