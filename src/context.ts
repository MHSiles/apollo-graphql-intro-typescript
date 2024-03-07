import { SpotifyAPI } from "./datasources/spotify";

export type DataSourceContext = {
  dataSources: {
    spotifyAPI: SpotifyAPI;
  };
};
