import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

// Map for localStorage keys
// const LOCALSTORAGE_KEYS = {
//   accessToken: 'spotify_access_token',
//   refreshToken: 'spotify_refresh_token',
//   expireTime: 'spotify_token_expire_time',
//   timestamp: 'spotify_token_timestamp',
// };

// // Map to retrieve localStorage values
// const LOCALSTORAGE_VALUES = {
//   accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
//   refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
//   expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
//   timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
// };

// const LOCALSTORAGE_ITEMS = new Map<string, string | null>([
//   ["spotify_access_token", localStorage.getItem('spotify_access_token')],
//   ["spotify_refresh_token", localStorage.getItem("spotify_refresh_token")],
//   ["spotify_token_expire_time", localStorage.getItem("spotify_token_expire_time")],
//   ["spotify_token_timestamp", localStorage.getItem("spotify_token_timestamp")]
// ]);
interface QueryParams {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // private apiUrl: string = environment.apiUrl;
  // private accessToken: string | null;
  // private refreshToken: string | null;
  // private refreshToken$ = new Subject<string | null>();

  private queryParams: QueryParams;
  private hasError: string | null;

  private localStorageItems = {
    spotifyAccessToken: localStorage.getItem('spotify_access_token'),
    spotifyRefreshToken: localStorage.getItem('spotify_refresh_token'),
    spotifyTokenExpireTime: localStorage.getItem('spotify_token_expire_time'),
    spotifyTokenTimestamp: localStorage.getItem('spotify_token_timestamp'),
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initialize();
  }

  private initialize() {
    this.route.queryParamMap.subscribe((res) => {
      // this.accessToken = res.get('access_token');
      // this.refreshToken = res.get('refresh_token');

      // this.refreshToken$.next(this.refreshToken);

      this.queryParams = {
        accessToken: res.get('access_token'),
        refreshToken: res.get('refresh_token'),
        expiresIn: res.get('expires_in'),
      };

      this.hasError = res.get('error');
    });

    // this.refreshToken$.subscribe((token) => {
    //   this.refreshToken = token;

    //   if (this.refreshToken) {
    //     this.http
    //       .get(
    //         `${this.apiUrl}/spotify/refresh_token?refresh_token=${this.refreshToken}`
    //       )
    //       .subscribe((res: any) => {
    //         this.accessToken = res.access_token;
    //         this.refreshToken = res.refresh_token;

    //         console.log(res);

    //         console.log(this.accessToken);
    //         console.log(this.refreshToken);
    //       });
    //   }
    // });
  }

  getAccessToken = () => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const queryParams = {
    //   [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    //   [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    //   [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    // };
    // this.queryParams = {
    //   'access_token':
    // }
    // const hasError = urlParams.get('error');
    const token = this.localStorageItems.spotifyAccessToken;

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (this.hasError || this.hasTokenExpired() || token === 'undefined') {
      this.refreshAccessToken();
    }

    // If there is a valid access token in localStorage, use that
    if (token && token !== 'undefined') {
      return token;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (this.queryParams.accessToken) {
      // Store the query params in localStorage
      // for (const property in Object.keys(this.queryParams)) {
      //   localStorage.setItem(
      //     property,
      //     this.queryParams[property as string] || ''
      //   );
      // }
      localStorage.setItem(
        'spotify_access_token',
        this.queryParams.accessToken
      );
      localStorage.setItem(
        'spotify_refresh_token',
        this.queryParams.refreshToken!
      );
      localStorage.setItem(
        'spotify_token_expire_time',
        this.queryParams.expiresIn!
      );
      localStorage.setItem('spotify_token_timestamp', Date.now().toString());
      // Return access token from query params
      return token;
    }

    // We should never get here!
    return null;
  };

  hasTokenExpired = () => {
    // const { accessToken, timestamp, expireTime } = this.localStorageItems.keys();
    if (
      !this.localStorageItems.spotifyAccessToken ||
      !this.localStorageItems.spotifyTokenTimestamp
    ) {
      return false;
    }
    const millisecondsElapsed =
      Date.now() - Number(this.localStorageItems.spotifyTokenTimestamp);
    return (
      millisecondsElapsed / 1000 >
      Number(this.localStorageItems.spotifyTokenExpireTime)
    );
  };

  refreshAccessToken = async () => {
    try {
      // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
      if (
        !this.localStorageItems.spotifyRefreshToken ||
        this.localStorageItems.spotifyRefreshToken === 'undefined' ||
        Date.now() -
          Number(this.localStorageItems.spotifyTokenTimestamp) / 1000 <
          1000
      ) {
        console.error('No refresh token available');
        this.logout();
      }

      // Use `/refresh_token` endpoint from our Node app
      // const { data } = await axios.get(
      //   `/refresh_token?refresh_token=${this.localStorageItems.spotifyRefreshToken}`
      // );
      this.http
        .get(
          `/spotify/refresh_token?refresh_token=${this.localStorageItems.spotifyRefreshToken}`
        )
        .subscribe((res: any) => {
          localStorage.setItem('spotify_access_token', res.access_token);
          localStorage.setItem('spotify_timestamp', Date.now().toString());
        });

      // Reload the page for localStorage updates to be reflected
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  private logout = () => {
    // Clear all localStorage items
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expire_time');
    localStorage.removeItem('spotify_timestamp');
    // Navigate to homepage
    this.router.navigate(['/music']);
  };
}
