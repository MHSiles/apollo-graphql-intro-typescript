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
    durationMs: (parent) => parent.duration_ms,
  },
  Mutation: {
    addTracksToPlaylist: async (_, { input }, { dataSources }) => {
      try {
        const response = await dataSources.spotifyAPI.addTracksToPlaylist(
          input
        );
        if (response.snapshot_id) {
          return {
            code: 200,
            success: true,
            message: "Tracks added to playlist!",
            playlistId: response.snapshot_id,
          };
        } else {
          throw Error("snapshot_id property not found");
        }
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err}`,
          playlistId: null,
        };
      }
    },
  },
  AddTracksToPlaylistResponse: {
    playlist: ({ playlistId }, _, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(playlistId);
    },
  },
};
