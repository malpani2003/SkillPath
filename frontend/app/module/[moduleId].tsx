import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { courses } from "@/data/courses";

export default function ModuleDetailsScreen() {
  const router = useRouter();

  const { moduleId } = useLocalSearchParams<{
    moduleId: string;
  }>();

  let selectedModule = null;
  let selectedCourse = null;

  for (const course of courses) {
    const foundModule = course.moduleList?.find(
      (module) => module.id === moduleId,
    );

    if (foundModule) {
      selectedModule = foundModule;
      selectedCourse = course;
      break;
    }
  }

  if (!selectedModule || !selectedCourse) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Module not found</Text>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

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
            style={styles.backButtonIcon}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>{selectedModule.title}</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Module Info */}
        <View style={styles.moduleHeader}>
          <Text style={styles.courseName}>{selectedCourse.title}</Text>

          <Text style={styles.title}>{selectedModule.title}</Text>

          <Text style={styles.lessonCount}>
            {selectedModule.lessons} lessons
          </Text>
        </View>

        {/* Lessons */}
        {selectedModule.lessonList?.map((lesson, index) => (
          <Pressable
            key={lesson.id}
            style={({ pressed }) => [
              styles.lessonCard,
              pressed && styles.lessonCardPressed,
            ]}
            onPress={() => router.push(`/lesson/${lesson.id}`)}
          >
            <View style={styles.lessonNumber}>
              <Text style={styles.lessonNumberText}>{index + 1}</Text>
            </View>

            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>

              <Text style={styles.lessonType}>
                {getLessonTypeLabel(lesson.type)}
              </Text>
            </View>

            <View style={styles.lessonStatus}>
              {lesson.completed ? (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>✓</Text>
                </View>
              ) : (
                <Text style={styles.lessonChevron}>›</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function getLessonTypeLabel(type: "article" | "video" | "interactive") {
  switch (type) {
    case "article":
      return "Article";

    case "video":
      return "Video";

    case "interactive":
      return "Interactive";

    default:
      return "";
  }
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

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButtonIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    color: "#0F172A",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 40,
  },

  moduleHeader: {
    paddingTop: 20,
    paddingBottom: 24,
  },

  courseName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4338CA",
    marginBottom: 6,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  lessonCount: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 6,
  },

  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    marginBottom: 10,
  },

  lessonCardPressed: {
    opacity: 0.75,
  },

  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  lessonNumberText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4338CA",
  },

  lessonContent: {
    flex: 1,
  },

  lessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  lessonType: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },

  lessonStatus: {
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

  lessonChevron: {
    fontSize: 24,
    color: "#94A3B8",
  },

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
