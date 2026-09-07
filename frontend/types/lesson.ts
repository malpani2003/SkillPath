export type Lesson = {
  id: string;
  title: string;
  description: string;

  videoUrl?: string;

  learn: {
    keyPoints: string[];
    exampleTitle?: string;
    exampleCode?: string;
  };

  tryIt: {
    instructions: string;
    starterCode: string;
  };

  exercise: {
    question: string;
    starterCode: string;
  };

  completed: boolean;
};