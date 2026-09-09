import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { courses } from "@/data/courses";
import VideoPlayer from "@/components/video/VideoPlayer";
import { SQLQueryResult } from "@/types/sql";

type LessonTab = "video" | "learn" | "tryIt" | "exercise";

export default function LessonScreen() {
  const router = useRouter();

  const { lessonId } = useLocalSearchParams<{
    lessonId: string;
  }>();

  const [activeTab, setActiveTab] = useState<LessonTab>("video");

  let selectedLesson = null;
  let selectedModule = null;
  let selectedCourse = null;
  let lessonIndex = -1;

  for (const course of courses) {
    for (const module of course.moduleList ?? []) {
      const index =
        module.lessonList?.findIndex((lesson) => lesson.id === lessonId) ?? -1;

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

        {/* Fixed Tabs */}
        <View style={styles.tabContainer}>
          <LessonTabButton
            title="Video"
            active={activeTab === "video"}
            onPress={() => setActiveTab("video")}
          />

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
          {activeTab === "video" && (
            <VideoPlayer videoUrl={selectedLesson.videoUrl} />
          )}

          {activeTab === "learn" && <LearnTab lesson={selectedLesson} />}

          {activeTab === "tryIt" && <TryItTab lesson={selectedLesson} />}

          {activeTab === "exercise" && <ExerciseTab lesson={selectedLesson} />}
        </View>
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
  const [query, setQuery] = useState(lesson.tryIt.starterCode);

  const [result, setResult] = useState<SQLQueryResult | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleRunQuery = async () => {
    setError(null);
    setResult(null);

    try {
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to execute query.",
      );
    }
  };

  return (
    <View>
      <Text style={styles.contentHeading}>Try It</Text>

      <Text style={styles.contentParagraph}>{lesson.tryIt.instructions}</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        multiline
        textAlignVertical="top"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        style={styles.sqlEditor}
        placeholder="Write your SQL query..."
        placeholderTextColor="#64748B"
      />

      <Pressable style={styles.runButton} onPress={handleRunQuery}>
        <Text style={styles.runButtonText}>Run Query</Text>
      </Pressable>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Query Error</Text>

          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {result && <SQLResultTable result={result} />}
    </View>
  );
}

function SQLResultTable({ result }: { result: SQLQueryResult }) {
  if (result.columns.length === 0) {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Results</Text>

        <Text style={styles.emptyResultText}>
          Query executed successfully, but returned no rows.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Results</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View style={styles.tableRow}>
            {result.columns.map((column) => (
              <View key={column} style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>{column}</Text>
              </View>
            ))}
          </View>

          {/* Rows */}
          {result.rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.tableRow,
                rowIndex % 2 === 1 && styles.alternateTableRow,
              ]}
            >
              {row.map((value, columnIndex) => (
                <View
                  key={`${rowIndex}-${columnIndex}`}
                  style={styles.tableCell}
                >
                  <Text style={styles.tableCellText}>
                    {String(value ?? "NULL")}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 28,
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
  sqlEditor: {
    minHeight: 180,
    backgroundColor: "#0F172A",
    borderRadius: 10,
    padding: 16,
    color: "#E2E8F0",
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 21,
    textAlignVertical: "top",
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
    justifyContent: "center",
    paddingVertical: 13,
    marginTop: 12,
  },

  runButtonLoadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  runButtonLoadingText: {
    marginLeft: 8,
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
  runButtonDisabled: {
    opacity: 0.6,
  },

  errorContainer: {
    marginTop: 16,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 10,
    padding: 12,
  },

  errorTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B91C1C",
    marginBottom: 4,
  },

  errorText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#991B1B",
  },

  resultContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  alternateTableRow: {
    backgroundColor: "#F8FAFC",
  },

  tableCell: {
    minWidth: 100,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },

  tableCellText: {
    fontSize: 12,
    color: "#475569",
  },

  emptyResultText: {
    fontSize: 12,
    color: "#64748B",
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
