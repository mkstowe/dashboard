import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initialize();
  }

  /* --------------------- Add Custom Playlist Cover Image -------------------- */
  public addPlaylistImage() {
    // TODO
  }

  /* -------------------------- Add Items to Playlist ------------------------- */
  public addToPlaylist() {
    // TODO
  }

  /* ----------------------- Add Item to Playback Queue ----------------------- */
  public addToQueue(uri: string, { deviceId }: { deviceId?: string } = {}) {
    this.http.post(
      '/api/spotify/me/player/queue',
      {
        uri,
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ----------------- Check if User Follows Artists or Users ----------------- */
  public checkIfUserFollowsArtistsOrUsers() {
    // TODO
  }

  /* --------------------- Check if Users Follow Playlist --------------------- */
  public checkIfUsersFollowPlaylist() {
    // TODO
  }

  /* ------------------------ Check User's Saved Albums ----------------------- */
  public checkMyAlbums() {
    // TODO
  }

  /* ---------------------- Check User's Saved Audiobooks --------------------- */
  public checkMyAudiobooks() {
    // TODO
  }

  /* ----------------------- Check User's Saved Episodes ---------------------- */
  public checkMyEpisodes() {
    // TODO
  }

  /* ------------------------ Check User's Saved Shows ------------------------ */
  public checkMyShows() {
    // TODO
  }

  /* ------------------------ Check User's Saved Tracks ----------------------- */
  public checkMyTracks() {
    // TODO
  }

  /* ----------------------------- Create Playlist ---------------------------- */
  public createPlaylist() {
    // TODO
  }

  /* ------------------------- Follow Artists or Users ------------------------ */
  public followArtistsOrUsers() {
    // TODO
  }

  /* ----------------------------- Follow Playlist ---------------------------- */
  public followPlaylist() {
    // TODO
  }

  public getAccessToken() {
    return this._getAccessToken();
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Albums                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Get Album ------------------------------- */
  public getAlbum() {
    // TODO
  }

  /* ---------------------------- Get Album Tracks ---------------------------- */
  public getAlbumTracks() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Artists                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Get Artist ------------------------------- */
  public getArtist() {
    // TODO
  }

  /* --------------------------- Get Artist's Albums -------------------------- */
  public getArtistAlbums() {
    // TODO
  }

  /* ---------------------- Get Artist's Related Artists ---------------------- */
  public getArtistRelatedArtists() {
    // TODO
  }

  /* ------------------------- Get Artist's Top Tracks ------------------------ */
  public getArtistTopTracks() {
    // TODO
  }

  /* ----------------------- Get Track's Audio Analysis ----------------------- */
  public getAudioAnalysis() {
    // TODO
  }

  /* ----------------------- Get Track's Audio Features ----------------------- */
  public getAudioFeatures() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Audiobooks                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Get an Audiobook ---------------------------- */
  public getAudiobook() {
    // TODO
  }

  /* ------------------------- Get Audiobook Chapters ------------------------- */
  public getAudiobookChapters() {
    // TODO
  }

  /* -------------------------- Get Available Devices ------------------------- */
  public getAvailableDevices() {
    return this.http.get(`api/spotify/me/player/devices`, {
      headers: this.apiHeaders,
    });
  }

  /* ----------------------- Get Single Browse Category ----------------------- */
  public getBrowseCategory() {
    // TODO
  }

  /* ------------------------ Get Category's Playlists ------------------------ */
  public getCategoryPlaylists() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Chapters                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Get a Chapter ----------------------------- */
  public getChapter() {
    // TODO
  }

  /* ----------------------- Get Currently Playing Track ---------------------- */
  public getCurrentTrack({
    market,
    additionalTypes,
  }: {
    market?: string;
    additionalTypes?: string;
  } = {}) {
    return this.http.get(`/api/spotify/me/player`, {
      headers: this.apiHeaders,
      params: {
        ...(market && { market }),
        ...(additionalTypes && { additional_types: additionalTypes }),
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Episodes                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Get Episode ------------------------------ */
  public getEpisode() {
    // TODO
  }

  /* ------------------------- Get Featured Playlists ------------------------- */
  public getFeaturedPlaylists() {
    // TODO
  }

  /* -------------------------- Get Followed Artists -------------------------- */
  public getFollowedArtists() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Genres                                   */
  /* -------------------------------------------------------------------------- */

  /* ------------------------ Get Available Genre Seeds ----------------------- */
  public getGenreSeeds() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Markets                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------- Get Available Markets ------------------------- */
  public getMarkets() {
    // TODO
  }

  /* ------------------------ Get User's Saved Episodes ----------------------- */
  public getMyEpisodes() {
    // TODO
  }

  /* ---------------------- Get Current User's Playlists ---------------------- */
  public getMyPlaylists({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {}) {
    return this.http.get('/api/spotify/me/playlists', {
      headers: this.apiHeaders,
      params: {
        ...(limit && { limit }),
        ...(offset && { offset }),
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Users                                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------- Get Current User's Profile ----------------------- */
  public getMyProfile() {
    return this.http.get(`/api/spotify/me`, {
      headers: this.apiHeaders,
    });
  }

  /* ------------------------- Get User's Saved Albums ------------------------ */
  public getMySavedAlbums() {
    // TODO
  }

  /* ----------------------- Get User's Saved Audiobooks ---------------------- */
  public getMySavedAudiobooks() {
    // TODO
  }

  /* ------------------------- Get User's Saved Shows ------------------------- */
  public getMyShows() {
    // TODO
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
    return this.http.get(`/api/spotify/me/top/${type}`, {
      params: {
        ...(timeRange && { time_range: timeRange }),
        ...(limit && { limit }),
        ...(offset && { offset }),
      },
      headers: this.apiHeaders,
    });
  }

  /* ------------------------- Get User's Saved Tracks ------------------------ */
  public getMyTracks() {
    // TODO
  }

  /* ---------------------------- Get New Releases ---------------------------- */
  public getNewReleases() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Player                                   */
  /* -------------------------------------------------------------------------- */

  /* --------------------------- Get Playback State --------------------------- */
  public getPlaybackState({
    market,
    additionalTypes,
  }: {
    market?: string;
    additionalTypes?: string;
  } = {}) {
    return this.http.get(`/api/spotify/me/player`, {
      headers: this.apiHeaders,
      params: {
        ...(market && { market }),
        ...(additionalTypes && { additional_types: additionalTypes }),
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Playlists                                 */
  /* -------------------------------------------------------------------------- */

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
    return this.http.get(`/api/spotify/playlists/${id}`, {
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
    return this.http.get(`/api/spotify/playlists/${id}/images`, {
      headers: this.apiHeaders,
    });
  }

  /* --------------------------- Get Playlist Items --------------------------- */
  public getPlaylistItems() {
    // TODO
  }

  /* --------------------------- Get User's Profile --------------------------- */
  public getProfile() {
    // TODO
  }

  /* -------------------------- Get the User's Queue -------------------------- */
  public getQueue() {
    return this.http.get('/api/spotify/me/player/queue', {
      headers: this.apiHeaders,
    });
  }

  /* ----------------------- Get Recently Played Tracks ----------------------- */
  public getRecentTracks({
    limit,
    after,
    before,
  }: { limit?: number; after?: number; before?: number } = {}) {
    return this.http.get('/api/spotify/me/player/recently-played', {
      params: {
        ...(limit && { limit }),
        ...(after && { after }),
        ...(before && { before }),
      },
      headers: this.apiHeaders,
    });
  }

  /* --------------------------- Get Recommendations -------------------------- */
  public getRecommendations() {
    // TODO
  }

  /* --------------------------- Get Several Albums --------------------------- */
  public getSeveralAlbums() {
    // TODO
  }

  /* --------------------------- Get Several Artists -------------------------- */
  public getSeveralArtists() {
    // TODO
  }

  /* ----------------------- Get Tracks' Audio Features ----------------------- */
  public getSeveralAudioFeatures() {
    // TODO
  }

  /* ------------------------- Get Several Audiobooks ------------------------- */
  public getSeveralAudiobooks() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Categories                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------- Get Several Browse Categories --------------------- */
  public getSeveralBrowseCategories() {
    // TODO
  }

  /* -------------------------- Get Several Chapters -------------------------- */
  public getSeveralChapters() {
    // TODO
  }

  /* -------------------------- Get Several Episodes -------------------------- */
  public getSeveralEpisodes() {
    // TODO
  }

  /* ---------------------------- Get Several Shows --------------------------- */
  public getSeveralShows() {
    // TODO
  }

  /* --------------------------- Get Several Tracks --------------------------- */
  public getSeveralTracks() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Shows                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Get Show -------------------------------- */
  public getShow() {
    // TODO
  }

  /* ---------------------------- Get Show Episodes --------------------------- */
  public getShowEpisodes() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Tracks                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Get Track ------------------------------- */
  public getTrack() {
    // TODO
  }

  /* -------------------------- Get User's Playlists -------------------------- */
  public getUserPlaylists() {
    // TODO
  }

  /* ------------------------------ Skip to Next ------------------------------ */
  public nextTrack({
    deviceId,
  }: {
    deviceId?: string;
  } = {}) {
    return this.http.post(
      '/api/spotify/me/player/next',
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
      '/api/spotify/me/player/pause',
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
      '/api/spotify/me/player/previous',
      {
        ...(deviceId && { device_id: deviceId }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ----------------------- Remove Users's Saved Albums ---------------------- */
  public removeMyAlbums() {
    // TODO
  }

  /* --------------------- Remove User's Saved Audiobooks --------------------- */
  public removeMyAudiobooks() {
    // TODO
  }

  /* ---------------------- Remove User's Saved Episodes ---------------------- */
  public removeMyEpisodes() {
    // TODO
  }

  /* ------------------------ Remove User's Saved Shows ----------------------- */
  public removeMyShows() {
    // TODO
  }

  /* ----------------------- Remove User's Saved Tracks ----------------------- */
  public removeMyTracks() {
    // TODO
  }

  /* -------------------------- Remove Playlist Items ------------------------- */
  public removePlaylistItems() {
    // TODO
  }

  /* ---------------------- Save Albums for Current User ---------------------- */
  public saveMyAlbums() {
    // TODO
  }

  /* -------------------- Save Audiobooks for Current User -------------------- */
  public saveMyAudiobooks() {
    // TODO
  }

  /* --------------------- Save Episodes for Current User --------------------- */
  public saveMyEpisodes() {
    // TODO
  }

  /* ----------------------- Save Shows for Current User ---------------------- */
  public saveMyShows() {
    // TODO
  }

  /* ---------------------- Save Tracks for Current User ---------------------- */
  public saveMyTracks() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Search                                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Search for Item ---------------------------- */
  public searchForItem() {
    // TODO
  }

  /* ---------------------------- Seek to Position ---------------------------- */
  public seekToPosition(
    position: number,
    { deviceId }: { deviceId?: string } = {}
  ) {
    return this.http.put(
      '/api/spotify/me/player/seek',
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
      '/api/spotify/me/player/repeat',
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
      '/api/spotify/me/player/volume',
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
      '/api/spotify/me/player/play',
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
      '/api/spotify/me/player/shuffle',
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
      `/api/spotify/me/player`,
      {
        device_ids: deviceIds,
        ...(play && { play }),
      },
      {
        headers: this.apiHeaders,
      }
    );
  }

  /* ------------------------ Unfollow Artists or Users ----------------------- */
  public unfollowArtistsOrUsers() {
    // TODO
  }

  /* ---------------------------- Unfollow Playlist --------------------------- */
  public unfollowPlaylist() {
    // TODO
  }

  /* ------------------------- Change Playlist Details ------------------------ */
  public updatePlaylistDetails() {
    // TODO
  }

  /* -------------------------- Update Playlist Items ------------------------- */
  public updatePlaylistItems() {
    // TODO
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

    console.log('nothing');

    // We should never get here!
    return '';
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
