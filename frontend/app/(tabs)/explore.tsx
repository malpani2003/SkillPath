import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import { courses } from "@/data/courses";
import CourseCard from "@/components/courses/CourseCard";
import { useRouter } from "expo-router";

const categories = [
  {
    id: "all",
    title: "All",
    icon: "📚",
  },
  {
    id: "programming",
    title: "Programming",
    icon: "💻",
  },
  {
    id: "data",
    title: "Data",
    icon: "📊",
  },
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals",
    icon: "🧩",
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      query.length === 0 ||
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      course.category.toLowerCase() ===
        categories
          .find((category) => category.id === selectedCategory)
          ?.title.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Explore</Text>

            <Text style={styles.subtitle}>Learn something new today</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses, topics or skills..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              title={category.title}
              icon={category.icon}
              active={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>

        {/* Courses */}
        <View style={styles.courseHeader}>
          <View>
            <Text style={styles.sectionTitle}>All Courses</Text>

            <Text style={styles.courseCount}>
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
            </Text>
          </View>
        </View>

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              modules={course.modules}
              lessons={course.lessons}
              progress={course.progress}
              icon={course.icon}
              onPress={() => router.push(`/course/${course.id}`)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>

            <Text style={styles.emptyTitle}>No courses found</Text>

            <Text style={styles.emptyText}>
              Try a different search or category.
            </Text>

            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              <Text style={styles.resetButtonText}>Clear filters</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function CategoryButton({
  title,
  icon,
  active,
  onPress,
}: {
  title: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.categoryButton, active && styles.categoryButtonActive]}
    >
      <Text style={styles.categoryIcon}>{icon}</Text>

      <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
        {title}
      </Text>
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
    paddingTop: 24,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 17,
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

  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#0F172A",
    paddingVertical: 0,
  },

  clearText: {
    fontSize: 14,
    color: "#64748B",
    paddingLeft: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  categoryList: {
    gap: 10,
    paddingBottom: 24,
  },

  categoryButton: {
    minWidth: 82,
    minHeight: 76,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryButtonActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#4338CA",
  },

  categoryIcon: {
    fontSize: 22,
    marginBottom: 5,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },

  categoryTextActive: {
    color: "#4338CA",
  },

  courseHeader: {
    marginTop: 2,
  },

  courseCount: {
    fontSize: 11,
    color: "#64748B",
    marginTop: -7,
    marginBottom: 12,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptyText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
    textAlign: "center",
  },

  resetButton: {
    marginTop: 16,
    backgroundColor: "#4338CA",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },

  resetButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
