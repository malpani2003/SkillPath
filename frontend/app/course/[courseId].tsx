import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { courses } from "@/data/courses";

export default function CourseDetailsScreen() {
  const router = useRouter();

  const { courseId } = useLocalSearchParams<{
    courseId: string;
  }>();

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Course not found</Text>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const completedLessons =
    course.moduleList?.reduce(
      (total, module) => total + module.completedLessons,
      0,
    ) ?? 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backIconButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>{course.title}</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Course Hero */}
        <View style={styles.hero}>
          <View style={styles.courseIcon}>
            <Text style={styles.courseEmoji}>{course.icon}</Text>
          </View>

          <Text style={styles.title}>{course.title}</Text>

          <Text style={styles.description}>{course.description}</Text>
        </View>

        {/* Course Meta */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Difficulty</Text>

            <Text style={styles.metaValue}>{course.difficulty}</Text>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Modules</Text>

            <Text style={styles.metaValue}>{course.modules}</Text>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Lessons</Text>

            <Text style={styles.metaValue}>{course.lessons}</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>

            <Text style={styles.progressPercentage}>{course.progress}%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${course.progress}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressSubtitle}>
            {completedLessons} of {course.lessons} lessons completed
          </Text>
        </View>

        {/* Modules */}
        <Text style={styles.modulesTitle}>Modules</Text>

        {course.moduleList?.map((module, index) => {
          const isCompleted = module.completedLessons === module.lessons;

          return (
            <Pressable
              key={module.id}
              style={({ pressed }) => [
                styles.moduleCard,
                pressed && styles.moduleCardPressed,
              ]}
              onPress={() => router.push(`/module/${module.id}`)}
            >
              <View style={styles.moduleNumber}>
                <Text style={styles.moduleNumberText}>{index + 1}</Text>
              </View>

              <View style={styles.moduleContent}>
                <Text style={styles.moduleTitle}>{module.title}</Text>

                <Text style={styles.moduleMeta}>{module.lessons} lessons</Text>
              </View>

              <View style={styles.moduleRight}>
                {isCompleted ? (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓</Text>
                  </View>
                ) : (
                  <Text style={styles.moduleChevron}>›</Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  /* Header */

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backIconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    color: "#0F172A",
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 40,
  },

  /* Hero */

  hero: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 24,
  },

  courseIcon: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  courseEmoji: {
    fontSize: 34,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  description: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    maxWidth: 320,
  },

  /* Meta */

  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 16,
    marginBottom: 18,
  },

  metaItem: {
    flex: 1,
    alignItems: "center",
  },

  metaLabel: {
    fontSize: 10,
    color: "#94A3B8",
    marginBottom: 4,
  },

  metaValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },

  metaDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#E2E8F0",
  },

  /* Progress */

  progressSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    marginBottom: 24,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  progressPercentage: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4338CA",
  },

  progressBackground: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#4338CA",
  },

  progressSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 8,
  },

  /* Modules */

  modulesTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    marginBottom: 10,
  },

  moduleCardPressed: {
    opacity: 0.75,
  },

  moduleNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  moduleNumberText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4338CA",
  },

  moduleContent: {
    flex: 1,
  },

  moduleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  moduleMeta: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },

  moduleRight: {
    marginLeft: 8,
  },

  completedBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },

  completedText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16A34A",
  },

  moduleChevron: {
    fontSize: 24,
    color: "#94A3B8",
  },

  /* Not Found */

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  backButton: {
    marginTop: 16,
    backgroundColor: "#4338CA",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
