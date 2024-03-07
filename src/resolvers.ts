import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    playlist: (_, { id }, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(id);
    },
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
  },
  // For the Playlist type, we need to "preprocess" the records to get the tracks from the items array
  Playlist: {
    tracks: ({ tracks }) => {
      return tracks.items.map((item) => item.track);
    },
  },
  Track: {
    // Renaming the duration_ms field to durationMs
    durationMs: parent => parent.duration_ms,
  },
};
