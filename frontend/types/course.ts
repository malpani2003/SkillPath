import { Module } from "@/types/module";

export type CourseCategory = "Programming" | "Data" | "CS Fundamentals";

export type CourseDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  id: string;
  title: string;
  description: string;

  category: CourseCategory;

  modules: number;
  lessons: number;

  progress: number;

  difficulty: CourseDifficulty;

  icon: string;
  moduleList?: Module[];
};
