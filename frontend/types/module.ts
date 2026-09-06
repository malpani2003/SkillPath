import { Lesson } from "@/types/lesson";

export type Module = {
  id: string;
  title: string;
  lessons: number;
  completedLessons: number;
  lessonList?: Lesson[];
};