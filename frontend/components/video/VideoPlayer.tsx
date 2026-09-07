import { View, Text, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

type VideoPlayerProps = {
  videoUrl?: string;
};

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>▶</Text>

        <Text style={styles.placeholderTitle}>Video coming soon</Text>

        <Text style={styles.placeholderText}>
          This video is not available yet.
        </Text>
      </View>
    );
  }

  return <PlayableVideo videoUrl={videoUrl} />;
}

function PlayableVideo({ videoUrl }: { videoUrl: string }) {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls
        fullscreenOptions={{
          enable: true,
        }}
        allowsPictureInPicture={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000000",
    borderRadius: 12,
    overflow: "hidden",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#172033",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  placeholderIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#42638A",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 58,
    fontSize: 25,
    overflow: "hidden",
  },

  placeholderTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 12,
  },

  placeholderText: {
    fontSize: 11,
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 5,
  },
});
