import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface QueryParams {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private queryParams: QueryParams;
  private hasError: string | null;

  private localStorageItems = {
    spotifyAccessToken: localStorage.getItem('spotify_access_token'),
    spotifyRefreshToken: localStorage.getItem('spotify_refresh_token'),
    spotifyTokenExpireTime: localStorage.getItem('spotify_token_expire_time'),
    spotifyTokenTimestamp: localStorage.getItem('spotify_token_timestamp'),
  };
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initialize();
  }

  private initialize() {
    this.route.queryParamMap.subscribe((res) => {
      this.queryParams = {
        accessToken: res.get('access_token'),
        refreshToken: res.get('refresh_token'),
        expiresIn: res.get('expires_in'),
      };

      this.hasError = res.get('error');
    });
  }

  public getAccessToken() {
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

      return token;
    }

    // We should never get here!
    return '';
  }

  private hasTokenExpired() {
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
  }

  private refreshAccessToken() {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !this.localStorageItems.spotifyRefreshToken ||
      this.localStorageItems.spotifyRefreshToken === 'undefined' ||
      Date.now() - Number(this.localStorageItems.spotifyTokenTimestamp) / 1000 <
        1000
    ) {
      console.error('No refresh token available');
      this.logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    this.http
      .get(
        `${this.apiUrl}/spotify/refresh_token?refresh_token=${this.localStorageItems.spotifyRefreshToken}`
      )
      .subscribe({
        next: (res: any) => {
          console.log('9');

          localStorage.setItem('spotify_access_token', res.access_token);
          localStorage.setItem(
            'spotify_token_timestamp',
            Date.now().toString()
          );
          window.location.reload();
        },
        error: (err) => console.error(err),
      });
  }

  private logout() {
    // Clear all localStorage items
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expire_time');
    localStorage.removeItem('spotify_token_timestamp');

    // Navigate to homepage
    this.router.navigate(['/music']);
  }

  public async getProfileInfo() {
    // console.log(await axios.get(`${this.spotifyApiUrl}/me`));
    this.http
      .get(`${this.apiUrl}/spotify/me`, {
        headers: {
          "Authorization": `Bearer ${this.localStorageItems.spotifyAccessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .subscribe((res: any) => {
        return res;
      });
  }
}
