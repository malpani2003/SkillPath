export type Lesson = {
  id: string;
  title: string;
  type: "article" | "video" | "interactive";
  completed: boolean;
};