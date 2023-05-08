import {
  animate,
  group,
  query,
  style,
  trigger,
  transition,
} from '@angular/animations';

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: '400px',
  width: 'calc(100% - 400px)',
  height: '100%',
});

export const translateTransition = trigger('routeAnim', [
  transition(':increment', [
    style({
      position: 'relative',
      overflow: 'hidden',
    }),

    query(':enter, :leave', [baseStyles], { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '200ms ease-in',
            style({
              opacity: 0,
              transform: 'translateY(-50px)',
            })
          ),
        ],
        { optional: true }
      ),

      query(
        ':enter',
        [
          style({
            transform: 'translateY(50px)',
            opacity: 0,
          }),
          animate(
            '250ms 120ms ease-out',
            style({
              opacity: 1,
              transform: 'translateY(0)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),

  transition(':decrement', [
    style({
      position: 'relative',
      overflow: 'hidden',
    }),

    query(':enter, :leave', [baseStyles], { optional: true }),

    group([
      query(
        ':leave',
        [
          animate(
            '200ms ease-in',
            style({
              opacity: 0,
              transform: 'translateY(50px)',
            })
          ),
        ],
        { optional: true }
      ),

      query(
        ':enter',
        [
          style({
            transform: 'translateY(-50px)',
            opacity: 0,
          }),
          animate(
            '250ms 120ms ease-out',
            style({
              opacity: 1,
              transform: 'translateY(0)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
