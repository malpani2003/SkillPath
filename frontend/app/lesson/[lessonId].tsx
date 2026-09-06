import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { courses } from "@/data/courses";

export default function LessonScreen() {
  const router = useRouter();

  const { lessonId } = useLocalSearchParams<{
    lessonId: string;
  }>();

  let selectedLesson = null;
  let selectedModule = null;
  let selectedCourse = null;

  for (const course of courses) {
    for (const module of course.moduleList ?? []) {
      const lesson = module.lessonList?.find((item) => item.id === lessonId);

      if (lesson) {
        selectedLesson = lesson;
        selectedModule = module;
        selectedCourse = course;
        break;
      }
    }

    if (selectedLesson) {
      break;
    }
  }

  if (!selectedLesson || !selectedModule || !selectedCourse) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Lesson not found</Text>

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

          <Text style={styles.headerTitle}>Lesson</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Breadcrumb */}
        <Text style={styles.courseName}>
          {selectedCourse.title} · {selectedModule.title}
        </Text>

        {/* Lesson title */}
        <Text style={styles.title}>{selectedLesson.title}</Text>

        {/* Lesson type */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {getLessonTypeLabel(selectedLesson.type)}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <Text style={styles.contentTitle}>{selectedLesson.title}</Text>

          {selectedLesson.type === "article" && (
            <>
              <Text style={styles.paragraph}>
                SQL stands for Structured Query Language. It is used to
                communicate with relational databases and work with structured
                data.
              </Text>

              <Text style={styles.paragraph}>
                SQL allows you to retrieve, insert, update, and delete data from
                database tables.
              </Text>

              <Text style={styles.heading}>What you'll learn</Text>

              <Text style={styles.bullet}>
                • How relational databases store data
              </Text>

              <Text style={styles.bullet}>• How tables and columns work</Text>

              <Text style={styles.bullet}>
                • How SQL communicates with databases
              </Text>
            </>
          )}

          {selectedLesson.type === "video" && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>▶</Text>

              <Text style={styles.placeholderTitle}>Video lesson</Text>

              <Text style={styles.placeholderText}>
                Video playback will be implemented later.
              </Text>
            </View>
          )}

          {selectedLesson.type === "interactive" && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>{"</>"}</Text>

              <Text style={styles.placeholderTitle}>Interactive lesson</Text>

              <Text style={styles.placeholderText}>
                The interactive SQL editor will be implemented in the next
                phase.
              </Text>
            </View>
          )}
        </View>

        {/* Complete button */}
        <Pressable style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Mark Lesson Complete</Text>
        </Pressable>
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

  courseName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4338CA",
    marginTop: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 8,
  },

  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 12,
  },

  typeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4338CA",
  },

  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
    marginTop: 20,
  },

  contentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 14,
  },

  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 4,
    marginBottom: 10,
  },

  bullet: {
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 6,
  },

  placeholder: {
    alignItems: "center",
    paddingVertical: 36,
  },

  placeholderIcon: {
    fontSize: 30,
    color: "#4338CA",
    marginBottom: 12,
  },

  placeholderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  placeholderText: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
  },

  completeButton: {
    backgroundColor: "#4338CA",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 20,
  },

  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
