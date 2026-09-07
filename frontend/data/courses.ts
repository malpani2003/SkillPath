import { Course } from "@/types/course";

export const courses: Course[] = [
  {
    id: "sql",
    title: "SQL",
    description: "Learn SQL from the fundamentals to advanced queries.",
    category: "Data",
    modules: 8,
    lessons: 42,
    progress: 65,
    difficulty: "Beginner",
    icon: "🗄️",

    moduleList: [
      {
        id: "sql-basics",
        title: "SQL Basics",
        lessons: 5,
        completedLessons: 5,

        lessonList: [
          {
            id: "what-is-sql",
            title: "What is SQL?",
            description:
              "Learn what SQL is and how it is used to communicate with relational databases.",

            videoUrl: "",

            learn: {
              keyPoints: [
                "SQL is used to communicate with relational databases.",
                "SQL allows you to retrieve and manipulate data.",
                "SQL queries operate on tables, rows, and columns.",
              ],
              exampleTitle: "Your first SQL query",
              exampleCode: `SELECT *
FROM users;`,
            },

            tryIt: {
              instructions:
                "Try writing a query that returns all rows from the users table.",
              starterCode: `SELECT *
FROM users;`,
            },

            exercise: {
              question:
                "Write a query that returns all columns from the users table.",
              starterCode: "",
            },

            completed: true,
          },

          {
            id: "databases-and-tables",
            title: "Databases & Tables",
            description:
              "Understand how databases organize information into tables, rows, and columns.",

            videoUrl: "",

            learn: {
              keyPoints: [
                "A database can contain multiple tables.",
                "Tables organize data into rows and columns.",
                "Each column represents a particular type of data.",
              ],
              exampleTitle: "Users table",
              exampleCode: `SELECT *
FROM users;`,
            },

            tryIt: {
              instructions: "Try selecting all records from the users table.",
              starterCode: `SELECT *
FROM users;`,
            },

            exercise: {
              question:
                "Write a query that returns all records from the users table.",
              starterCode: "",
            },

            completed: true,
          },

          {
            id: "select-statement",
            title: "The SELECT Statement",
            description:
              "Learn how the SELECT statement is used to retrieve data from a database.",

            videoUrl: "",

            learn: {
              keyPoints: [
                "SELECT is used to retrieve data.",
                "SELECT can return one or more columns.",
                "SELECT * returns all columns.",
              ],
              exampleTitle: "Selecting data",
              exampleCode: `SELECT name
FROM users;`,
            },

            tryIt: {
              instructions:
                "Try selecting the name column from the users table.",
              starterCode: `SELECT name
FROM users;`,
            },

            exercise: {
              question:
                "Write a query that returns the name column from users.",
              starterCode: "",
            },

            completed: true,
          },

          {
            id: "selecting-columns",
            title: "Selecting Columns",
            description:
              "Learn how to select only the columns you need from a table.",

            videoUrl: "",

            learn: {
              keyPoints: [
                "You can select specific columns from a table.",
                "Multiple columns can be selected in one query.",
                "Selecting only required columns makes queries clearer.",
              ],
              exampleTitle: "Selecting multiple columns",
              exampleCode: `SELECT name, age
FROM users;`,
            },

            tryIt: {
              instructions:
                "Try selecting both name and age from the users table.",
              starterCode: `SELECT name, age
FROM users;`,
            },

            exercise: {
              question: "Write a query that returns name and age from users.",
              starterCode: "",
            },

            completed: true,
          },

          {
            id: "first-sql-query",
            title: "Write Your First SQL Query",
            description:
              "Put everything together and write your first complete SQL query.",

            videoUrl: "",

            learn: {
              keyPoints: [
                "SQL queries follow a defined structure.",
                "SELECT specifies the data you want.",
                "FROM specifies the table you want to query.",
              ],
              exampleTitle: "A complete SQL query",
              exampleCode: `SELECT name, age
FROM users;`,
            },

            tryIt: {
              instructions:
                "Modify the query and experiment with different columns.",
              starterCode: `SELECT *
FROM users;`,
            },

            exercise: {
              question:
                "Write a query that returns the name and age of every user.",
              starterCode: "",
            },

            completed: true,
          },
        ],
      },
      {
        id: "filtering-data",
        title: "Filtering Data",
        lessons: 6,
        completedLessons: 4,
      },
      {
        id: "sorting-data",
        title: "Sorting & Limiting",
        lessons: 5,
        completedLessons: 2,
      },
      {
        id: "aggregations",
        title: "Aggregations",
        lessons: 6,
        completedLessons: 0,
      },
      {
        id: "joins",
        title: "SQL Joins",
        lessons: 7,
        completedLessons: 0,
      },
      {
        id: "subqueries",
        title: "Subqueries",
        lessons: 5,
        completedLessons: 0,
      },
      {
        id: "window-functions",
        title: "Window Functions",
        lessons: 5,
        completedLessons: 0,
      },
      {
        id: "advanced-sql",
        title: "Advanced SQL",
        lessons: 3,
        completedLessons: 0,
      },
    ],
  },
  {
    id: "python",
    title: "Python",
    description: "Learn Python programming from the ground up.",
    category: "Programming",
    modules: 10,
    lessons: 68,
    progress: 25,
    difficulty: "Beginner",
    icon: "🐍",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Master modern JavaScript fundamentals.",
    category: "Programming",
    modules: 8,
    lessons: 54,
    progress: 0,
    difficulty: "Beginner",
    icon: "JS",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Build strong DSA and problem-solving skills.",
    category: "CS Fundamentals",
    modules: 6,
    lessons: 38,
    progress: 0,
    difficulty: "Intermediate",
    icon: "</>",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Learn how to analyze and understand real-world data.",
    category: "Data",
    modules: 7,
    lessons: 45,
    progress: 0,
    difficulty: "Intermediate",
    icon: "▮▮▮",
  },
  {
    id: "java",
    title: "Java",
    description: "Learn Java programming and object-oriented concepts.",
    category: "Programming",
    modules: 6,
    lessons: 32,
    progress: 0,
    difficulty: "Beginner",
    icon: "☕",
  },
];
