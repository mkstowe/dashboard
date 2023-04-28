import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  private apiHeaders = {
    Authorization: `Bearer ${this.localStorageItems.spotifyAccessToken}`,
    'Content-Type': 'application/json',
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
        `/api/spotify/refresh_token?refresh_token=${this.localStorageItems.spotifyRefreshToken}`
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

  /* -------------------------------------------------------------------------- */
  /*                                   Albums                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Get Album ------------------------------- */
  public getAlbum() {
    // TODO
  }

  /* --------------------------- Get Several Albums --------------------------- */
  public getSeveralAlbums() {
    // TODO
  }

  /* ---------------------------- Get Album Tracks ---------------------------- */
  public getAlbumTracks() {
    // TODO
  }

  /* ------------------------- Get User's Saved Albums ------------------------ */
  public getMySavedAlbums() {
    // TODO
  }

  /* ---------------------- Save Albums for Current User ---------------------- */
  public saveMyAlbums() {
    // TODO
  }

  /* ----------------------- Remove Users's Saved Albums ---------------------- */
  public removeMyAlbums() {
    // TODO
  }

  /* ------------------------ Check User's Saved Albums ----------------------- */
  public checkMyAlbums() {
    // TODO
  }

  /* ---------------------------- Get New Releases ---------------------------- */
  public getNewReleases() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Artists                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Get Artist ------------------------------- */
  public getArtist() {
    // TODO
  }

  /* --------------------------- Get Several Artists -------------------------- */
  public getSeveralArtists() {
    // TODO
  }

  /* --------------------------- Get Artist's Albums -------------------------- */
  public getArtistAlbums() {
    // TODO
  }

  /* ------------------------- Get Artist's Top Tracks ------------------------ */
  public getArtistTopTracks() {
    // TODO
  }

  /* ---------------------- Get Artist's Related Artists ---------------------- */
  public getArtistRelatedArtists() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Audiobooks                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Get an Audiobook ---------------------------- */
  public getAudiobook() {
    // TODO
  }

  /* ------------------------- Get Several Audiobooks ------------------------- */
  public getSeveralAudiobooks() {
    // TODO
  }

  /* ------------------------- Get Audiobook Chapters ------------------------- */
  public getAudiobookChapters() {
    // TODO
  }

  /* ----------------------- Get User's Saved Audiobooks ---------------------- */
  public getMySavedAudiobooks() {
    // TODO
  }

  /* -------------------- Save Audiobooks for Current User -------------------- */
  public saveMyAudiobooks() {
    // TODO
  }

  /* --------------------- Remove User's Saved Audiobooks --------------------- */
  public removeMyAudiobooks() {
    // TODO
  }

  /* ---------------------- Check User's Saved Audiobooks --------------------- */
  public checkMyAudiobookds() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Categories                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------- Get Several Browse Categories --------------------- */
  public getSeveralBrowseCategories() {
    // TODO
  }

  /* ----------------------- Get Single Browse Category ----------------------- */
  public getBrowseCategory() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Chapters                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Get a Chapter ----------------------------- */
  public getChapter() {
    // TODO
  }

  /* -------------------------- Get Several Chapters -------------------------- */
  public getSeveralChapters() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Episodes                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Get Episode ------------------------------ */
  public getEpisode() {
    // TODO
  }

  /* -------------------------- Get Several Episodes -------------------------- */
  public getSeveralEpisodes() {
    // TODO
  }

  /* ------------------------ Get User's Saved Episodes ----------------------- */
  public getMyEpisodes() {
    // TODO
  }

  /* --------------------- Save Episodes for Current User --------------------- */
  public saveMyEpisodes() {
    // TODO
  }

  /* ---------------------- Remove User's Saved Episodes ---------------------- */
  public removeMyEpisodes() {
    // TODO
  }

  /* ----------------------- Check User's Saved Episodes ---------------------- */
  public checkMyEpisodes() {
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

  /* -------------------------------------------------------------------------- */
  /*                                   Player                                   */
  /* -------------------------------------------------------------------------- */

  /* --------------------------- Get Playback State --------------------------- */
  public getPlaybackState() {
    // TODO
  }

  /* ---------------------------- Transfer Playback --------------------------- */
  public transferPlayback() {
    // TODO
  }

  /* -------------------------- Get Available Devices ------------------------- */
  public getAvailableDevices() {
    // TODO
  }

  /* ----------------------- Get Currently Playing Track ---------------------- */
  public getCurrentTrack() {
    // TODO
  }

  /* -------------------------- Start/Resume Playback ------------------------- */
  public startPlayback() {
    // TODO
  }

  /* ----------------------------- Pause Playback ----------------------------- */
  public pausePlayback() {
    // TODO
  }

  /* ------------------------------ Skip to Next ------------------------------ */
  public nextTrack() {
    // TODO
  }

  /* ---------------------------- Skip to Previous ---------------------------- */
  public previousTrack() {
    // TODO
  }

  /* ---------------------------- Seek to Position ---------------------------- */
  public seekToPosition() {
    // TODO
  }

  /* ----------------------------- Set Repeat Mode ---------------------------- */
  public setRepeatMode() {
    // TODO
  }

  /* --------------------------- Set Playback Volume -------------------------- */
  public setVolume() {
    // TODO
  }

  /* ------------------------- Toggle Playback Shuffle ------------------------ */
  public toggleShuffle() {
    // TODO
  }

  /* ----------------------- Get Recently Played Tracks ----------------------- */
  public getRecentTracks() {
    // TODO
  }

  /* -------------------------- Get the User's Queue -------------------------- */
  public getQueue() {
    // TODO
  }

  /* ----------------------- Add Item to Playback Queue ----------------------- */
  public addToQueue() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Playlists                                 */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Get Playlist ------------------------------ */
  public getPlaylist(
    id: string,
    market?: string,
    fields?: string,
    additional_types?: string
  ) {
    this.http
      .get(`/api/spotify/playlists/${id}`, {
        headers: this.apiHeaders,
        params: {
          ...(market && { market }),
          ...(fields && { fields }),
          ...(additional_types && { additional_types }),
        },
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  /* ------------------------- Change Playlist Details ------------------------ */
  public updatePlaylistDetails() {
    // TODO
  }

  /* --------------------------- Get Playlist Items --------------------------- */
  public getPlaylistItems() {
    // TODO
  }

  /* -------------------------- Update Playlist Items ------------------------- */
  public updatePlaylistItems() {
    // TODO
  }

  /* -------------------------- Add Items to Playlist ------------------------- */
  public addToPlaylist() {
    // TODO
  }

  /* -------------------------- Remove Playlist Items ------------------------- */
  public removePlaylistItems() {
    // TODO
  }

  /* ---------------------- Get Current User's Playlists ---------------------- */
  public getMyPlaylists(limit?: number, offset?: number) {
    this.http
      .get('/api/spotify/me/playlists', {
        headers: this.apiHeaders,
        params: {
          ...(limit && { limit }),
          ...(offset && { offset }),
        },
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  /* -------------------------- Get User's Playlists -------------------------- */
  public getUserPlaylists() {
    // TODO
  }

  /* ----------------------------- Create Playlist ---------------------------- */
  public createPlaylist() {
    // TODO
  }

  /* ------------------------- Get Featured Playlists ------------------------- */
  public getFeaturedPlaylists() {
    // TODO
  }

  /* ------------------------ Get Category's Playlists ------------------------ */
  public getCategoryPlaylists() {
    // TODO
  }

  /* ------------------------ Get Playlist Cover Image ------------------------ */
  public getPlaylistImage() {
    // TODO
  }

  /* --------------------- Add Custom Playlist Cover Image -------------------- */
  public addPlaylistImage() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Search                                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Search for Item ---------------------------- */
  public searchForItem() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Shows                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Get Show -------------------------------- */
  public getShow() {
    // TODO
  }

  /* ---------------------------- Get Several Shows --------------------------- */
  public getSeveralShows() {
    // TODO
  }

  /* ---------------------------- Get Show Episodes --------------------------- */
  public getShowEpisodes() {
    // TODO
  }

  /* ------------------------- Get User's Saved Shows ------------------------- */
  public getMyShows() {
    // TODO
  }

  /* ----------------------- Save Shows for Current User ---------------------- */
  public saveMyShows() {
    // TODO
  }

  /* ------------------------ Remove User's Saved Shows ----------------------- */
  public removeMyShows() {
    // TODO
  }

  /* ------------------------ Check User's Saved Shows ------------------------ */
  public checkMyShows() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Tracks                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Get Track ------------------------------- */
  public getTrack() {
    // TODO
  }

  /* --------------------------- Get Several Tracks --------------------------- */
  public getSeveralTracks() {
    // TODO
  }

  /* ------------------------- Get User's Saved Tracks ------------------------ */
  public getMyTracks() {
    // TODO
  }

  /* ---------------------- Save Tracks for Current User ---------------------- */
  public saveMyTracks() {
    // TODO
  }

  /* ----------------------- Remove User's Saved Tracks ----------------------- */
  public removeMyTracks() {
    // TODO
  }

  /* ------------------------ Check User's Saved Tracks ----------------------- */
  public checkMyTracks() {
    // TODO
  }

  /* ----------------------- Get Tracks' Audio Features ----------------------- */
  public getSeveralAudioFeatures() {
    // TODO
  }

  /* ----------------------- Get Track's Audio Features ----------------------- */
  public getAudioFeatures() {
    // TODO
  }

  /* ----------------------- Get Track's Audio Analysis ----------------------- */
  public getAudioAnalysis() {
    // TODO
  }

  /* --------------------------- Get Recommendations -------------------------- */
  public getRecommendations() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Users                                   */
  /* -------------------------------------------------------------------------- */

  /* ----------------------- Get Current User's Profile ----------------------- */
  public getMyProfile() {
    this.http
      .get(`/api/spotify/me`, {
        headers: this.apiHeaders,
      })
      .subscribe((res: any) => {
        return res;
      });
  }

  /* -------------------------- Get User's Top Items -------------------------- */
  public getMyTopItems() {
    // TODO
  }

  /* --------------------------- Get User's Profile --------------------------- */
  public getProfile() {
    // TODO
  }

  /* ----------------------------- Follow Playlist ---------------------------- */
  public followPlaylist() {
    // TODO
  }

  /* ---------------------------- Unfollow Playlist --------------------------- */
  public unfollowPlaylist() {
    // TODO
  }

  /* -------------------------- Get Followed Artists -------------------------- */
  public getFollowedArtists() {
    // TODO
  }

  /* ------------------------- Follow Artists or Users ------------------------ */
  public followArtistsOrUsers() {
    // TODO
  }

  /* ------------------------ Unfollow Artists or Users ----------------------- */
  public unfollowArtistsOrUsers() {
    // TODO
  }

  /* ----------------- Check if User Follows Artists or Users ----------------- */
  public checkIfUserFollowsArtistsOrUsers() {
    // TODO
  }

  /* --------------------- Check if Users Follow Playlist --------------------- */
  public checkIfUsersFollowPlaylist() {
    // TODO
  }

  /* -------------------------------------------------------------------------- */
}
