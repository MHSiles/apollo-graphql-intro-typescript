import { RESTDataSource } from "@apollo/datasource-rest";
import { PlaylistModel } from "../models";

export class SpotifyAPI extends RESTDataSource {
  baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

  async getFeaturedPlaylists(): Promise<PlaylistModel[]> {
    const response = await this.get<{ playlists: { items: PlaylistModel[] } }>(
      "browse/featured-playlists"
    );
    return response.playlists.items;
  }

  async getPlaylist(playlistId: string): Promise<PlaylistModel> {
    const response = await this.get<PlaylistModel>(`playlists/${playlistId}`);
    return response;
  }

  // async getPlaylisTracks(playlistId: string): Promise<Track[]> {
  //   const response = await this.get<Track>(`playlists/${playlistId}/tracks`);
  //   return response?.items ?? [];
  // }
}
