import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";

type CourseCardProps = {
  title: string;
  modules: number;
  lessons: number;
  progress: number;
  icon: string;
  onPress?: () => void;
};

export default function CourseCard({
  title,
  modules,
  lessons,
  progress,
  icon,
  onPress,
}: CourseCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <ChevronRight size={20} color="#64748B" />
        </View>

        <Text style={styles.meta}>
          {modules} modules • {lessons} lessons
        </Text>

        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },

  cardPressed: {
    opacity: 0.8,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 24,
  },

  content: {
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginRight: 8,
  },

  meta: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginRight: 8,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 999,
  },

  progressText: {
    width: 32,
    fontSize: 11,
    fontWeight: "600",
    color: "#2563EB",
    textAlign: "right",
  },
});
