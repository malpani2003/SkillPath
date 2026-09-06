# CodePath

> An offline-first mobile learning platform for interactive programming education.

CodePath combines guided learning with interview-focused practice, inspired by learning experiences such as SQLBolt and DataLemur.

## Vision

**Learn → Practice → Challenge → Master**

The platform starts with SQL and is designed to expand into Python, JavaScript, Java, Data Structures & Algorithms, and Data Analysis.

## Features

### Interactive Learning
- Structured courses and modules
- Text and video lessons
- Interactive examples
- Quizzes
- Hands-on coding exercises
- Hints and solutions

### Practice
- SQL practice problems
- Real-world datasets
- Difficulty levels
- Instant feedback
- Query/code evaluation
- Progress tracking

### Interview Challenges
- Interview-style problems
- Company and role-oriented collections
- Timed challenges
- Hidden test cases
- Hints and explanations
- Challenge history

### Progress & Personalization
- Course and lesson progress
- XP and levels
- Learning streaks
- Achievements
- Daily/weekly challenges
- Personalized recommendations

### Offline-First
The application is designed to remain useful without an internet connection.

Planned capabilities include:
- Downloadable courses
- Offline learning
- Local exercise execution
- Local progress persistence
- Background synchronization
- Conflict handling

## Tech Stack

### Mobile
- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind
- Lucide React Native

### Planned
- SQLite
- Zustand
- React Query
- Backend API
- Server-side assessment
- Authentication
- Content management
- Analytics and observability

## Architecture

```text
                    ┌─────────────────────┐
                    │      Mobile App     │
                    │                     │
                    │  Learning UI        │
                    │  Practice           │
                    │  Progress           │
                    │  Local Execution    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Local Data Layer  │
                    │                     │
                    │  SQLite             │
                    │  Offline Content    │
                    │  Local Progress     │
                    │  Pending Sync       │
                    └──────────┬──────────┘
                               │
                         Sync when online
                               │
                    ┌──────────▼──────────┐
                    │      Backend        │
                    │                     │
                    │  Authentication     │
                    │  Courses            │
                    │  Challenges         │
                    │  Progress Sync      │
                    │  Hidden Tests       │
                    │  Recommendations   │
                    └─────────────────────┘
```

The mobile client should remain responsive offline, while the backend handles synchronization, protected assessments, content management, and account-level data.

## Roadmap

### Phase 1 — App Foundation
- [x] Expo + React Native setup
- [x] TypeScript
- [x] Expo Router
- [x] Bottom tab navigation
- [x] Initial mobile UI
- [x] Course data model
- [ ] Explore/Courses UI
- [ ] Course details
- [ ] Lesson navigation

### Phase 2 — Interactive SQL
- [ ] SQL lesson engine
- [ ] Local SQL execution
- [ ] Database fixtures
- [ ] Query editor
- [ ] Query results
- [ ] Exercise validation
- [ ] Hints and solutions

### Phase 3 — Assessment Engine
- [ ] Test cases
- [ ] Hidden test cases
- [ ] Result evaluation
- [ ] Difficulty levels
- [ ] Practice mode
- [ ] Challenge mode

### Phase 4 — Backend
- [ ] Authentication
- [ ] Course APIs
- [ ] User progress
- [ ] Challenge APIs
- [ ] Progress synchronization
- [ ] Content versioning

### Phase 5 — Offline-First
- [ ] SQLite integration
- [ ] Offline course downloads
- [ ] Local progress persistence
- [ ] Sync queue
- [ ] Conflict resolution
- [ ] Retry handling

### Phase 6 — Video Learning
- [ ] Video lessons
- [ ] Downloadable videos
- [ ] Offline playback
- [ ] Watch progress
- [ ] Resume playback

### Phase 7 — Interview Preparation
- [ ] Interview challenges
- [ ] Timed mode
- [ ] Company/role collections
- [ ] Challenge history
- [ ] Performance analytics

### Phase 8 — Personalization
- [ ] Learning recommendations
- [ ] Weak-topic detection
- [ ] Daily challenges
- [ ] Streaks
- [ ] XP and achievements

### Phase 9 — Multiple Languages
- [ ] Python
- [ ] JavaScript
- [ ] Java
- [ ] DSA
- [ ] Data Analysis

### Phase 10 — Production Engineering
- [ ] Automated testing
- [ ] CI/CD
- [ ] Crash reporting
- [ ] Performance monitoring
- [ ] Analytics
- [ ] Security hardening
- [ ] Release automation

## Engineering Goals

This project is intentionally more than a collection of mobile screens.

Key engineering problems include:

- Offline-first architecture
- Client/server state management
- Data synchronization
- Conflict resolution
- Local persistence
- Code execution
- Automated assessment
- Secure hidden tests
- Scalable content modeling
- Performance optimization
- Reusable component architecture
- Error handling
- Observability
- Testing
- CI/CD

These areas make CodePath a practical project for developing skills in frontend architecture, mobile development, distributed state synchronization, and backend system design.

## Development

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Clear the Metro cache:

```bash
npx expo start -c
```

## Project Structure

```text
app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── explore.tsx
│   ├── progress.tsx
│   └── profile.tsx
│
├── course/
├── lesson/
├── practice/
└── challenge/

components/
├── ui/
├── home/
├── course/
├── lesson/
├── practice/
└── challenge/

data/
└── courses.ts

types/
└── course.ts

constants/
└── ...
```

The structure will evolve as the product grows.

## Product Principles

1. **Learning First** — Every feature should improve understanding and application.
2. **Practice Over Passive Learning** — Users should solve problems, not only consume content.
3. **Instant Feedback** — Exercises should provide useful feedback quickly.
4. **Offline by Design** — Offline support is part of the architecture.
5. **Data-Driven UI** — Courses, lessons, exercises, and challenges are structured data.
6. **Extensible Architecture** — New languages and learning formats should be easy to add.

## Project Status

**Early development / Phase 1**

The current focus is establishing the mobile application foundation and implementing the course browsing experience based on the product design.

## License

This project is currently a personal learning and portfolio project.
