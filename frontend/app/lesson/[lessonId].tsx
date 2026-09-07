import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { courses } from "@/data/courses";
import VideoPlayer from "@/components/video/VideoPlayer";

type LessonTab = "learn" | "tryIt" | "exercise";

export default function LessonScreen() {
  const router = useRouter();

  const { lessonId } = useLocalSearchParams<{
    lessonId: string;
  }>();

  const [activeTab, setActiveTab] = useState<LessonTab>("learn");

  let selectedLesson = null;
  let selectedModule = null;
  let selectedCourse = null;
  let lessonIndex = -1;

  for (const course of courses) {
    for (const module of course.moduleList ?? []) {
      const index = module.lessonList?.findIndex((lesson) => lesson.id === lessonId) ?? -1;

      if (index !== -1) {
        selectedLesson = module.lessonList?.[index] ?? null;
        selectedModule = module;
        selectedCourse = course;
        lessonIndex = index;
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

  const totalLessons = selectedModule.lessons;
  const currentLesson = lessonIndex + 1;

  const isLastLesson = currentLesson >= totalLessons;

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

          <Text style={styles.headerTitle} numberOfLines={1}>
            {selectedCourse.title}
          </Text>

          <Text style={styles.lessonProgress}>
            {currentLesson} / {totalLessons}
          </Text>
        </View>

        {/* Lesson Title */}
        <Text style={styles.title}>{selectedLesson.title}</Text>

        {/* Lesson Description */}
        <Text style={styles.description}>{selectedLesson.description}</Text>

        {/* Video */}
        <VideoPlayer videoUrl={selectedLesson.videoUrl} />

        {/* Fixed Tabs */}
        <View style={styles.tabContainer}>
          <LessonTabButton
            title="Learn"
            active={activeTab === "learn"}
            onPress={() => setActiveTab("learn")}
          />

          <LessonTabButton
            title="Try It"
            active={activeTab === "tryIt"}
            onPress={() => setActiveTab("tryIt")}
          />

          <LessonTabButton
            title="Exercise"
            active={activeTab === "exercise"}
            onPress={() => setActiveTab("exercise")}
          />
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "learn" && <LearnTab lesson={selectedLesson} />}

          {activeTab === "tryIt" && <TryItTab lesson={selectedLesson} />}

          {activeTab === "exercise" && <ExerciseTab lesson={selectedLesson} />}
        </View>

        {/* Next */}
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            if (!isLastLesson) {
              console.log("Next lesson");
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {isLastLesson ? "Finish" : "Next"}
          </Text>

          <Text style={styles.nextButtonArrow}>→</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Tabs                                                                       */
/* -------------------------------------------------------------------------- */

function LessonTabButton({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {title}
      </Text>

      {active && <View style={styles.tabIndicator} />}
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/* Learn                                                                      */
/* -------------------------------------------------------------------------- */

function LearnTab({
  lesson,
}: {
  lesson: {
    learn: {
      keyPoints: string[];
      exampleTitle?: string;
      exampleCode?: string;
    };
  };
}) {
  return (
    <View>
      <Text style={styles.contentHeading}>Key Points</Text>

      {lesson.learn.keyPoints.map((point, index) => (
        <View key={`${point}-${index}`} style={styles.bulletContainer}>
          <Text style={styles.bullet}>•</Text>

          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}

      {lesson.learn.exampleCode && (
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>
            {lesson.learn.exampleTitle ?? "Example"}
          </Text>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{lesson.learn.exampleCode}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Try It                                                                     */
/* -------------------------------------------------------------------------- */

function TryItTab({
  lesson,
}: {
  lesson: {
    tryIt: {
      instructions: string;
      starterCode: string;
    };
  };
}) {
  return (
    <View>
      <Text style={styles.contentHeading}>Try It</Text>

      <Text style={styles.contentParagraph}>{lesson.tryIt.instructions}</Text>

      <View style={styles.editorPlaceholder}>
        <Text style={styles.editorText}>{lesson.tryIt.starterCode}</Text>
      </View>

      <Pressable style={styles.runButton}>
        <Text style={styles.runButtonText}>Run Query</Text>
      </Pressable>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Exercise                                                                   */
/* -------------------------------------------------------------------------- */

function ExerciseTab({
  lesson,
}: {
  lesson: {
    exercise: {
      question: string;
      starterCode: string;
    };
  };
}) {
  return (
    <View>
      <Text style={styles.contentHeading}>Exercise</Text>

      <Text style={styles.question}>{lesson.exercise.question}</Text>

      <View style={styles.editorPlaceholder}>
        <Text style={styles.editorPlaceholderText}>
          {lesson.exercise.starterCode || "Write your SQL query here..."}
        </Text>
      </View>

      <Pressable style={styles.checkButton}>
        <Text style={styles.checkButtonText}>Check Answer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  /* Header */

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },

  backIconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    color: "#0F172A",
    marginTop: -4,
  },

  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 4,
  },

  lessonProgress: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  /* Lesson */

  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 22,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
    marginTop: 8,
  },

  /* Tabs */

  tabContainer: {
    flexDirection: "row",
    marginTop: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  tabButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  tabTextActive: {
    color: "#4338CA",
  },

  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#4338CA",
  },

  tabContent: {
    paddingTop: 22,
  },

  /* Learn */

  contentHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  bulletContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  bullet: {
    fontSize: 18,
    lineHeight: 20,
    color: "#334155",
    marginRight: 8,
  },

  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },

  exampleCard: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },

  exampleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  codeBlock: {
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    padding: 14,
  },

  codeText: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 21,
    color: "#312E81",
  },

  /* Try It */

  contentParagraph: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
    marginBottom: 18,
  },

  editorPlaceholder: {
    minHeight: 160,
    backgroundColor: "#0F172A",
    borderRadius: 10,
    padding: 16,
    justifyContent: "flex-start",
  },

  editorText: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 21,
    color: "#E2E8F0",
  },

  editorPlaceholderText: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#64748B",
  },

  runButton: {
    backgroundColor: "#4338CA",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 13,
    marginTop: 12,
  },

  runButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* Exercise */

  question: {
    fontSize: 14,
    lineHeight: 21,
    color: "#334155",
    marginBottom: 16,
  },

  checkButton: {
    backgroundColor: "#4338CA",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 13,
    marginTop: 12,
  },

  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* Next */

  nextButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4338CA",
    minWidth: 150,
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginTop: 28,
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  nextButtonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 10,
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
