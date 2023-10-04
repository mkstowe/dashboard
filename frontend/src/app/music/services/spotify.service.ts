import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

interface QueryParams {
  accessToken: string | null;
  expiresIn: string | null;
  refreshToken: string | null;
}

const localStorageItems = {
  spotifyAccessToken: localStorage.getItem('spotify_access_token'),
  spotifyRefreshToken: localStorage.getItem('spotify_refresh_token'),
  spotifyTokenExpireTime: localStorage.getItem('spotify_token_expire_time'),
  spotifyTokenTimestamp: localStorage.getItem('spotify_token_timestamp'),
};

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiHeaders = {
    Authorization: `Bearer ${localStorageItems.spotifyAccessToken}`,
    'Content-Type': 'application/json',
  };
  private hasError: string | null;
  private queryParams: QueryParams;

  private accessToken$ = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initialize();
  }

  public get accessToken() {
    return this.accessToken$.asObservable();
  }

  /* ----------------------- Add Item to Playback Queue ----------------------- */
  public addToQueue(uri: string, { deviceId }: { deviceId?: string } = {}) {
    this.http.post(
      `${SPOTIFY_API_URL}/me/player/queue`,
      {
        uri,
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  public getAccessToken() {
    this._getAccessToken();
  }

  /* -------------------------- Get Available Devices ------------------------- */
  public getAvailableDevices() {
    return this.http.get(`${SPOTIFY_API_URL}/me/player/devices`, {
      headers: this.apiHeaders,
    });
  }

  /* ----------------------- Get Currently Playing Track ---------------------- */
  public getCurrentTrack({
    market,
    additionalTypes,
  }: {
    market?: string;
    additionalTypes?: string;
  } = {}) {
    return this.http.get(`${SPOTIFY_API_URL}/me/player`, {
      headers: this.apiHeaders,
      params: {
        ...(market && { market }),
        ...(additionalTypes && { additional_types: additionalTypes }),
      },
    });
  }

  /* ---------------------- Get Current User's Playlists ---------------------- */
  public getMyPlaylists({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {}) {
    return this.http.get(`${SPOTIFY_API_URL}/me/playlists`, {
      headers: this.apiHeaders,
      params: {
        ...(limit && { limit }),
        ...(offset && { offset }),
      },
    });
  }

  /* ----------------------- Get Current User's Profile ----------------------- */
  public getMyProfile() {
    return this.http.get(`${SPOTIFY_API_URL}/me`, {
      headers: this.apiHeaders,
    });
  }

  /* -------------------------- Get User's Top Items -------------------------- */
  public getMyTopItems(
    type: string,
    {
      timeRange,
      limit,
      offset,
    }: { timeRange?: number; limit?: number; offset?: number } = {}
  ) {
    return this.http.get(`${SPOTIFY_API_URL}/me/top/${type}`, {
      params: {
        ...(timeRange && { time_range: timeRange }),
        ...(limit && { limit }),
        ...(offset && { offset }),
      },
      headers: this.apiHeaders,
    });
  }

  /* --------------------------- Get Playback State --------------------------- */
  public getPlaybackState({
    market,
    additionalTypes,
  }: {
    market?: string;
    additionalTypes?: string;
  } = {}) {
    return this.http.get(`${SPOTIFY_API_URL}/me/player`, {
      headers: this.apiHeaders,
      params: {
        ...(market && { market }),
        ...(additionalTypes && { additional_types: additionalTypes }),
      },
    });
  }

  /* ------------------------------ Get Playlist ------------------------------ */
  public getPlaylist(
    id: string,
    {
      market,
      fields,
      additionalTypes,
    }: {
      market?: string;
      fields?: string;
      additionalTypes?: string;
    } = {}
  ) {
    return this.http.get(`${SPOTIFY_API_URL}/playlists/${id}`, {
      headers: this.apiHeaders,
      params: {
        ...(market && { market }),
        ...(fields && { fields }),
        ...(additionalTypes && { additional_types: additionalTypes }),
      },
    });
  }

  /* ------------------------ Get Playlist Cover Image ------------------------ */
  public getPlaylistImage(id: string) {
    return this.http.get(`${SPOTIFY_API_URL}/playlists/${id}/images`, {
      headers: this.apiHeaders,
    });
  }

  /* -------------------------- Get the User's Queue -------------------------- */
  public getQueue() {
    return this.http.get(`${SPOTIFY_API_URL}/me/player/queue`, {
      headers: this.apiHeaders,
    });
  }

  /* ----------------------- Get Recently Played Tracks ----------------------- */
  public getRecentTracks({
    limit,
    after,
    before,
  }: { limit?: number; after?: number; before?: number } = {}) {
    return this.http.get(`${SPOTIFY_API_URL}/me/player/recently-played`, {
      params: {
        ...(limit && { limit }),
        ...(after && { after }),
        ...(before && { before }),
      },
      headers: this.apiHeaders,
    });
  }

  /* ------------------------------ Skip to Next ------------------------------ */
  public nextTrack({
    deviceId,
  }: {
    deviceId?: string;
  } = {}) {
    return this.http.post(
      `${SPOTIFY_API_URL}/me/player/next`,
      {
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ----------------------------- Pause Playback ----------------------------- */
  public pausePlayback({
    deviceId,
  }: {
    deviceId?: string;
  } = {}) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player/pause`,
      {
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ---------------------------- Skip to Previous ---------------------------- */
  public previousTrack({
    deviceId,
  }: {
    deviceId?: string;
  } = {}) {
    return this.http.post(
      `${SPOTIFY_API_URL}/me/player/previous`,
      {
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ---------------------------- Seek to Position ---------------------------- */
  public seekToPosition(
    position: number,
    { deviceId }: { deviceId?: string } = {}
  ) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player/seek`,
      {
        position_ms: position,
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ----------------------------- Set Repeat Mode ---------------------------- */
  public setRepeatMode(
    state: string,
    { deviceId }: { deviceId?: string } = {}
  ) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player/repeat`,
      {
        state,
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* --------------------------- Set Playback Volume -------------------------- */
  public setVolume(percent: number, { deviceId }: { deviceId?: string } = {}) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player/volume`,
      {
        volume_percent: percent,
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* -------------------------- Start/Resume Playback ------------------------- */
  public startPlayback({
    deviceId,
    contextUri,
    uris,
    offset,
    position,
  }: {
    deviceId?: string;
    contextUri?: string;
    uris?: string[];
    offset?: number;
    position?: number;
  } = {}) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player/play`,
      {
        ...(deviceId && { device_id: deviceId }),
        ...(contextUri && { context_uri: contextUri }),
        ...(uris && { uris }),
        ...(offset && { offset }),
        ...(position && { position_ms: position }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ------------------------- Toggle Playback Shuffle ------------------------ */
  public toggleShuffle(
    state: boolean,
    { deviceId }: { deviceId?: string } = {}
  ) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player/shuffle`,
      {
        state,
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ---------------------------- Transfer Playback --------------------------- */
  public transferPlayback(
    deviceIds: string[],
    {
      play,
    }: {
      play?: boolean;
    } = {}
  ) {
    return this.http.put(
      `${SPOTIFY_API_URL}/me/player`,
      {
        device_ids: deviceIds,
        ...(play && { play }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                Authorization                               */
  /* -------------------------------------------------------------------------- */
  private _getAccessToken() {
    const token = localStorageItems.spotifyAccessToken;

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (this.hasError || this.hasTokenExpired() || token === 'undefined') {
      this.refreshAccessToken();
    }

    // If there is a valid access token in localStorage, use that
    if (token && token !== 'undefined') {
      this.accessToken$.next(token);
      return;
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

      this.accessToken$.next(this.queryParams.accessToken);
      this.apiHeaders.Authorization = `Bearer ${this.queryParams.accessToken}`;
      return;
    }
  }

  private hasTokenExpired() {
    if (
      !localStorageItems.spotifyAccessToken ||
      !localStorageItems.spotifyTokenTimestamp
    ) {
      return false;
    }
    const millisecondsElapsed =
      Date.now() - Number(localStorageItems.spotifyTokenTimestamp);

    return (
      millisecondsElapsed / 1000 >
      Number(localStorageItems.spotifyTokenExpireTime)
    );
  }

  /* -------------------------------------------------------------------------- */
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

  private logout() {
    // Clear all localStorage items
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expire_time');
    localStorage.removeItem('spotify_token_timestamp');

    // Navigate to homepage
    this.router.navigate(['/music']);
  }

  private refreshAccessToken() {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !localStorageItems.spotifyRefreshToken ||
      localStorageItems.spotifyRefreshToken === 'undefined' ||
      Date.now() - Number(localStorageItems.spotifyTokenTimestamp) / 1000 < 1000
    ) {
      console.error('No refresh token available');
      this.logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    this.http
      .get(
        `/api/spotify/refresh_token?refresh_token=${localStorageItems.spotifyRefreshToken}`
      )
      .subscribe({
        next: (res: any) => {
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
}
