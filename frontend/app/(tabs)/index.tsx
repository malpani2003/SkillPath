import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>🎓 SkillPath</Text>
          </View>

          <View style={styles.avatar}>
            <Text>👤</Text>
          </View>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Learn. Practice.{"\n"}Build Your Skills.
          </Text>

          <Text style={styles.heroDescription}>
            Master SQL, Python, JavaScript and more with interactive lessons,
            real-world problems and hands-on practice.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <Text style={styles.searchPlaceholder}>
            Search for courses, topics or skills...
          </Text>
        </View>

        {/* Learning Journey */}
        <Text style={styles.sectionTitle}>Your Learning Journey</Text>

        <View style={styles.journeyRow}>
          <JourneyCard icon="📖" title="Learn" description="Video Lessons" />

          <JourneyCard
            icon="✓"
            title="Practice"
            description="Hands-on Exercises"
          />

          <JourneyCard
            icon="🎯"
            title="Challenges"
            description="Real-world Problems"
          />

          <JourneyCard icon="📊" title="Interview" description="Be Job Ready" />
        </View>

        {/* Popular Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Courses</Text>

          <Pressable>
            <Text style={styles.viewAll}>View all →</Text>
          </Pressable>
        </View>

        <View style={styles.courseRow}>
          <CourseCard title="SQL" subtitle="Beginner · 12 lessons" icon="🗄️" />

          <CourseCard
            title="Python"
            subtitle="Beginner · 15 lessons"
            icon="🐍"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function JourneyCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.journeyCard}>
      <View style={styles.journeyIcon}>
        <Text>{icon}</Text>
      </View>

      <Text style={styles.journeyTitle}>{title}</Text>

      <Text style={styles.journeyDescription}>{description}</Text>
    </View>
  );
}

function CourseCard({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <Pressable style={styles.courseCard}>
      <View style={styles.courseIcon}>
        <Text style={styles.courseEmoji}>{icon}</Text>
      </View>

      <Text style={styles.courseTitle}>{title}</Text>

      <Text style={styles.courseSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  logo: {
    fontSize: 21,
    fontWeight: "800",
    color: "#172554",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  hero: {
    backgroundColor: "#1E3A8A",
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "800",
    marginBottom: 10,
  },

  heroDescription: {
    color: "#DBEAFE",
    fontSize: 12,
    lineHeight: 18,
  },

  searchBox: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 24,
  },

  searchIcon: {
    fontSize: 22,
    color: "#64748B",
    marginRight: 8,
  },

  searchPlaceholder: {
    color: "#94A3B8",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  journeyRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 26,
  },

  journeyCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    minHeight: 115,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  journeyIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  journeyTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#172554",
    marginBottom: 4,
  },

  journeyDescription: {
    fontSize: 9,
    lineHeight: 13,
    color: "#64748B",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: "#4338CA",
    fontSize: 11,
    fontWeight: "600",
  },

  courseRow: {
    flexDirection: "row",
    gap: 10,
  },

  courseCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  courseIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  courseEmoji: {
    fontSize: 21,
  },

  courseTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  courseSubtitle: {
    fontSize: 10,
    color: "#64748B",
  },
});
