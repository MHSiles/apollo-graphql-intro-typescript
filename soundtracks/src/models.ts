// The models structure comes from the database/api returning the information.
export type PlaylistModel = {
  id: string;
  name: string;
  description: string;
  tracks: {
    items: {
      track: TrackModel;
    }[];
  };
};

export type TrackModel = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  uri: string;
};

// The response from the Spotify API when adding tracks to a playlist
export type SnapshotOrError = {
  snapshot_id?: string;
  error?: string;
};

export type AddTracksToPlaylistResponse = {
  code: number;
  success: boolean;
  message: string;
  playlistId: string;
};