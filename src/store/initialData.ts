import {
  StudentProfile,
  Course,
  KnowledgeNode,
  KnowledgeEdge,
  StudySession,
  Quiz,
  CareerPath,
  ResourceItem,
  CommunityPost,
  NotificationItem,
  RecommendedItem,
  TutorSession
} from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'student-user-01',
  name: 'Student',
  email: 'student@edunexus.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  degree: 'B.Tech in Computer Science',
  year: 'Year 3 • Semester 5',
  university: 'University Institute of Technology',
  primaryGoal: 'Master Core Subjects & Excel in Placement Examinations',
  targetRole: 'Software Engineer',
  streakDays: 7,
  totalStudyHours: 42.5,
  coursesEnrolled: 4,
  quizzesTaken: 19,
  overallMastery: 72,
  dailyGoalMinutes: 120,
  preferredStudyTime: 'Evening',
  difficultyPreference: 'Adaptive',
  notificationsEnabled: true,
  theme: 'light'
};

export const initialCourses: Course[] = [
  {
    id: 'course-dbms',
    code: 'CS204',
    title: 'Database Management Systems',
    instructor: 'Dr. Ramesh Sundaram',
    category: 'Computer Science',
    color: '#1677FF',
    progressPercent: 72,
    totalLessons: 20,
    completedLessons: 14,
    currentTopic: 'Normalization & Dependencies',
    currentLessonId: 'lesson-dbms-norm-01',
    difficulty: 'Intermediate',
    timeRemaining: '4h 15m remaining',
    lastStudied: 'Today at 10:15 AM',
    description: 'Comprehensive study of relational models, relational algebra, SQL optimization, transactions, and normalization forms.',
    notes: [
      '1NF requires atomicity of column values; no repeating groups.',
      '2NF requires 1NF and no partial dependencies on candidate keys.',
      '3NF requires 2NF and no transitive functional dependencies.'
    ],
    lessons: [
      {
        id: 'lesson-dbms-intro',
        title: 'Introduction to Relational Schemas & Keys',
        durationMinutes: 35,
        completed: true,
        type: 'video',
        summary: 'Primary keys, candidate keys, superkeys, and relational schema notation.',
        keyConcepts: ['Candidate Key', 'Primary Key', 'Foreign Key']
      },
      {
        id: 'lesson-dbms-er',
        title: 'Entity Relationship (ER) Modeling',
        durationMinutes: 45,
        completed: true,
        type: 'video',
        summary: 'Entities, weak entity sets, relationships, and ER-to-relational table reduction.',
        keyConcepts: ['ER Model', 'Cardinality', 'Weak Entity']
      },
      {
        id: 'lesson-dbms-norm-01',
        title: 'Functional Dependencies & Normalization (1NF, 2NF, 3NF)',
        durationMinutes: 50,
        completed: false,
        type: 'interactive',
        summary: 'Deep dive into eliminating update anomalies, partial functional dependencies, and transitive dependencies.',
        keyConcepts: ['Functional Dependency', '1NF', '2NF', '3NF', 'BCNF'],
        transcript: `Welcome to this critical lecture on Database Normalization.
In real-world applications, poorly structured tables suffer from three major issues: Insertion anomaly, Deletion anomaly, and Update anomaly.
Normalization is the systematic process of decomposing tables with redundancy into smaller, well-structured relations.
To satisfy First Normal Form (1NF), every attribute must hold atomic (indivisible) values.
Second Normal Form (2NF) enforces that no non-prime attribute is partially dependent on any candidate key.
Third Normal Form (3NF) further guarantees that no non-prime attribute is transitively dependent on any candidate key.`
      },
      {
        id: 'lesson-dbms-bcnf',
        title: 'Boyce-Codd Normal Form (BCNF) & Decomposition',
        durationMinutes: 40,
        completed: false,
        type: 'video',
        summary: 'Strict form where for every X -> Y, X must be a superkey. Lossless join and dependency preservation.',
        keyConcepts: ['BCNF', 'Lossless Decomposition', 'Dependency Preservation']
      },
      {
        id: 'lesson-dbms-transactions',
        title: 'Transactions, ACID Properties & Concurrency Control',
        durationMinutes: 55,
        completed: false,
        type: 'video',
        summary: 'Atomicity, Consistency, Isolation, Durability, Two-Phase Locking, and Serializability.',
        keyConcepts: ['ACID', 'Serializability', '2PL']
      }
    ]
  },
  {
    id: 'course-python',
    code: 'CS101',
    title: 'Introduction to Python & Data Analysis',
    instructor: 'Prof. Ananya Gupta',
    category: 'Programming',
    color: '#7657FF',
    progressPercent: 68,
    totalLessons: 16,
    completedLessons: 11,
    currentTopic: 'Functions, Lambdas & Scope',
    currentLessonId: 'lesson-py-03',
    difficulty: 'Beginner',
    timeRemaining: '2h 40m remaining',
    lastStudied: 'Yesterday',
    description: 'Master Python fundamentals, functional constructs, list comprehensions, and data manipulation techniques.',
    notes: [
      'LEGB rule defines Python variable scope resolution: Local, Enclosing, Global, Built-in.',
      'Lambdas are anonymous one-line functions: lambda x, y: x * y.'
    ],
    lessons: [
      {
        id: 'lesson-py-01',
        title: 'Core Syntax, Variables & Control Flow',
        durationMinutes: 30,
        completed: true,
        type: 'video',
        summary: 'Conditionals, loops, truthiness, and collection primitives.',
        keyConcepts: ['Variables', 'Loops', 'Lists']
      },
      {
        id: 'lesson-py-02',
        title: 'Data Structures: Dictionaries & Sets',
        durationMinutes: 40,
        completed: true,
        type: 'video',
        summary: 'Hash table implementations, time complexity, and set operations.',
        keyConcepts: ['Dictionaries', 'Sets', 'Hashing']
      },
      {
        id: 'lesson-py-03',
        title: 'Higher Order Functions, Lambdas & Closures',
        durationMinutes: 45,
        completed: false,
        type: 'interactive',
        summary: 'First class functions, map/filter/reduce, closures, and generator functions.',
        keyConcepts: ['Closures', 'Lambda', 'Decorators']
      }
    ]
  },
  {
    id: 'course-dsa',
    code: 'CS201',
    title: 'Data Structures & Algorithms',
    instructor: 'Dr. Vikram Malhotra',
    category: 'Computer Science',
    color: '#22A06B',
    progressPercent: 61,
    totalLessons: 24,
    completedLessons: 14,
    currentTopic: 'Binary Search Trees & Traversal',
    currentLessonId: 'lesson-dsa-04',
    difficulty: 'Advanced',
    timeRemaining: '6h 10m remaining',
    lastStudied: '2 days ago',
    description: 'Algorithmic efficiency, Big-O notation, trees, graphs, dynamic programming, and greedy algorithms.',
    notes: [
      'In-order traversal of a BST yields elements in sorted ascending order.',
      'AVL trees guarantee O(log N) search by maintaining a balance factor between -1 and 1.'
    ],
    lessons: [
      {
        id: 'lesson-dsa-01',
        title: 'Arrays, Two Pointers & Sliding Window',
        durationMinutes: 40,
        completed: true,
        type: 'video',
        summary: 'Optimal array manipulation and space-efficient pointer algorithms.',
        keyConcepts: ['Two Pointers', 'Sliding Window', 'Prefix Sums']
      },
      {
        id: 'lesson-dsa-04',
        title: 'Binary Trees & Balanced BSTs',
        durationMinutes: 60,
        completed: false,
        type: 'interactive',
        summary: 'Tree traversals, height calculation, and self-balancing BST mechanics.',
        keyConcepts: ['BST', 'DFS', 'BFS', 'AVL Trees']
      }
    ]
  },
  {
    id: 'course-networks',
    code: 'CS302',
    title: 'Computer Networks & Protocols',
    instructor: 'Dr. Sarah Jenkins',
    category: 'Computer Science',
    color: '#F59E0B',
    progressPercent: 55,
    totalLessons: 18,
    completedLessons: 10,
    currentTopic: 'TCP/IP 3-Way Handshake & Flow Control',
    currentLessonId: 'lesson-net-02',
    difficulty: 'Intermediate',
    timeRemaining: '5h 00m remaining',
    lastStudied: '3 days ago',
    description: 'The OSI model, transport layer reliability, congestion control, routing algorithms, and socket programming.',
    notes: [
      'TCP handshake: SYN -> SYN-ACK -> ACK.',
      'Sliding window prevents network congestion and buffer overflow at the receiver.'
    ],
    lessons: [
      {
        id: 'lesson-net-01',
        title: 'OSI 7 Layers vs TCP/IP Architecture',
        durationMinutes: 35,
        completed: true,
        type: 'video',
        summary: 'Encapsulation, decapsulation, addressing, and protocol data units.',
        keyConcepts: ['OSI Model', 'Packets', 'Frames']
      },
      {
        id: 'lesson-net-02',
        title: 'TCP vs UDP: Reliability & Flow Control',
        durationMinutes: 50,
        completed: false,
        type: 'video',
        summary: 'Reliable transmission, sequence numbers, checksums, and congestion window.',
        keyConcepts: ['TCP Handshake', 'UDP', 'Congestion Control']
      }
    ]
  }
];

export const initialKnowledgeNodes: KnowledgeNode[] = [
  // DBMS Cluster
  {
    id: 'node-dbms-norm',
    courseId: 'course-dbms',
    label: 'Normalization',
    category: 'DBMS',
    mastery: 52,
    status: 'needs-practice',
    prerequisites: ['ER Model', 'Functional Dependencies'],
    relatedConcepts: ['1NF', '2NF', '3NF', 'BCNF'],
    commonMisconception: 'Thinking every duplicate value violates normalization without considering prime vs non-prime keys.',
    recommendedAction: 'Complete 2NF vs 3NF diagnostic quiz and revise transitive dependency definitions.',
    x: 420,
    y: 220,
    radius: 38
  },
  {
    id: 'node-dbms-1nf',
    courseId: 'course-dbms',
    label: '1NF (Atomicity)',
    category: 'DBMS',
    mastery: 88,
    status: 'mastered',
    prerequisites: ['Relational Schema'],
    relatedConcepts: ['Normalization', 'Atomic Values'],
    commonMisconception: 'Assuming JSON columns automatically satisfy 1NF.',
    recommendedAction: 'Well mastered! Ready for advanced relations.',
    x: 320,
    y: 330,
    radius: 28
  },
  {
    id: 'node-dbms-2nf',
    courseId: 'course-dbms',
    label: '2NF (Partial Dep)',
    category: 'DBMS',
    mastery: 62,
    status: 'learning',
    prerequisites: ['1NF', 'Candidate Keys'],
    relatedConcepts: ['Composite Keys', 'Normalization'],
    commonMisconception: 'Forgetting that 2NF only applies when candidate keys are composite.',
    recommendedAction: 'Review composite candidate key decomposition.',
    x: 420,
    y: 360,
    radius: 30
  },
  {
    id: 'node-dbms-3nf',
    courseId: 'course-dbms',
    label: '3NF (Transitive Dep)',
    category: 'DBMS',
    mastery: 48,
    status: 'needs-practice',
    prerequisites: ['2NF', 'Functional Dependencies'],
    relatedConcepts: ['BCNF', 'Non-prime Attributes'],
    commonMisconception: 'Confusing transitive dependency (A -> B -> C) with composite partial dependencies.',
    recommendedAction: 'Practice identifying transitive dependencies in exam-style relations.',
    x: 520,
    y: 340,
    radius: 30
  },
  {
    id: 'node-dbms-bcnf',
    courseId: 'course-dbms',
    label: 'BCNF',
    category: 'DBMS',
    mastery: 35,
    status: 'weak',
    prerequisites: ['3NF'],
    relatedConcepts: ['Determinant Keys', 'Decomposition'],
    commonMisconception: 'Assuming every 3NF relation is automatically BCNF.',
    recommendedAction: 'Revise BCNF condition: For every X -> Y, X must be a superkey.',
    x: 600,
    y: 240,
    radius: 26
  },
  {
    id: 'node-dbms-fd',
    courseId: 'course-dbms',
    label: 'Functional Dependencies',
    category: 'DBMS',
    mastery: 76,
    status: 'learning',
    prerequisites: ['Relational Keys'],
    relatedConcepts: ['Normalization', 'Closure of Attributes'],
    commonMisconception: 'Believing dependencies can be derived from sample table data rather than domain rules.',
    recommendedAction: 'Practice Armstrong axioms and attribute closure calculations.',
    x: 290,
    y: 190,
    radius: 32
  },
  {
    id: 'node-dbms-er',
    courseId: 'course-dbms',
    label: 'ER Model',
    category: 'DBMS',
    mastery: 92,
    status: 'mastered',
    prerequisites: ['Conceptual Design'],
    relatedConcepts: ['Cardinality', 'Entities'],
    commonMisconception: 'Treating relationship attributes as entity properties.',
    recommendedAction: 'Mastery achieved.',
    x: 210,
    y: 270,
    radius: 32
  },
  {
    id: 'node-dbms-sql',
    courseId: 'course-dbms',
    label: 'SQL Joins & Queries',
    category: 'DBMS',
    mastery: 86,
    status: 'mastered',
    prerequisites: ['Relational Algebra'],
    relatedConcepts: ['Indexes', 'Query Optimizer'],
    commonMisconception: 'Believing FULL OUTER JOIN is the same as CROSS JOIN.',
    recommendedAction: 'Solid mastery! Ready for complex windowing.',
    x: 360,
    y: 110,
    radius: 32
  },
  {
    id: 'node-dbms-acid',
    courseId: 'course-dbms',
    label: 'Transactions & ACID',
    category: 'DBMS',
    mastery: 70,
    status: 'learning',
    prerequisites: ['SQL Queries'],
    relatedConcepts: ['Locking', 'Serializability'],
    commonMisconception: 'Equating dirty reads with lost updates.',
    recommendedAction: 'Practice 2-Phase Locking schedules.',
    x: 480,
    y: 120,
    radius: 30
  },

  // Python Cluster
  {
    id: 'node-py-functions',
    courseId: 'course-python',
    label: 'Python Functions',
    category: 'Python',
    mastery: 84,
    status: 'mastered',
    prerequisites: ['Python Basics'],
    relatedConcepts: ['Closures', 'Decorators', 'Lambdas'],
    commonMisconception: 'Mutating default arguments like def fn(x=[]).',
    recommendedAction: 'Keep up the practice with closures.',
    x: 140,
    y: 430,
    radius: 30
  },
  {
    id: 'node-py-recursion',
    courseId: 'course-python',
    label: 'Recursion & Call Stack',
    category: 'Python',
    mastery: 60,
    status: 'learning',
    prerequisites: ['Python Functions'],
    relatedConcepts: ['Backtracking', 'Memoization'],
    commonMisconception: 'Forgetting the base condition resulting in RecursionError.',
    recommendedAction: 'Visualize call frames for tree traversals.',
    x: 240,
    y: 460,
    radius: 28
  },

  // DSA Cluster
  {
    id: 'node-dsa-arrays',
    courseId: 'course-dsa',
    label: 'Arrays & Two Pointers',
    category: 'DSA',
    mastery: 90,
    status: 'mastered',
    prerequisites: ['Basic Loops'],
    relatedConcepts: ['Sliding Window', 'Binary Search'],
    commonMisconception: 'Off-by-one errors on right pointer boundaries.',
    recommendedAction: 'Mastery achieved.',
    x: 720,
    y: 330,
    radius: 32
  },
  {
    id: 'node-dsa-bst',
    courseId: 'course-dsa',
    label: 'Binary Search Trees',
    category: 'DSA',
    mastery: 56,
    status: 'needs-practice',
    prerequisites: ['Recursion', 'Linked Structures'],
    relatedConcepts: ['Inorder Traversal', 'AVL Balancing'],
    commonMisconception: 'Assuming a tree is BST just because each node is greater than its immediate left child.',
    recommendedAction: 'Solve 3 medium BST validation problems.',
    x: 690,
    y: 200,
    radius: 30
  },
  {
    id: 'node-dsa-graphs',
    courseId: 'course-dsa',
    label: 'Graph Algorithms',
    category: 'DSA',
    mastery: 38,
    status: 'weak',
    prerequisites: ['Trees', 'Queue/Stack'],
    relatedConcepts: ['Dijkstra', 'BFS/DFS', 'Topological Sort'],
    commonMisconception: 'Not tracking visited nodes in cyclic graphs, causing infinite loops.',
    recommendedAction: 'Revise BFS queue states and adjacency list representation.',
    x: 780,
    y: 130,
    radius: 26
  }
];

export const initialKnowledgeEdges: KnowledgeEdge[] = [
  { id: 'e1', source: 'node-dbms-er', target: 'node-dbms-fd', label: 'Schema' },
  { id: 'e2', source: 'node-dbms-fd', target: 'node-dbms-norm', label: 'Governs' },
  { id: 'e3', source: 'node-dbms-norm', target: 'node-dbms-1nf', label: '1st Step' },
  { id: 'e4', source: 'node-dbms-1nf', target: 'node-dbms-2nf', label: 'Requires' },
  { id: 'e5', source: 'node-dbms-2nf', target: 'node-dbms-3nf', label: 'Requires' },
  { id: 'e6', source: 'node-dbms-3nf', target: 'node-dbms-bcnf', label: 'Strict Form' },
  { id: 'e7', source: 'node-dbms-sql', target: 'node-dbms-acid', label: 'Runs within' },
  { id: 'e8', source: 'node-dbms-sql', target: 'node-dbms-norm', label: 'Optimizes' },
  { id: 'e9', source: 'node-py-functions', target: 'node-py-recursion', label: 'Extends' },
  { id: 'e10', source: 'node-dsa-arrays', target: 'node-dsa-bst', label: 'Binary Search' },
  { id: 'e11', source: 'node-dsa-bst', target: 'node-dsa-graphs', label: 'Generalizes to' }
];

export const initialStudySessions: StudySession[] = [
  {
    id: 'session-01',
    title: 'DBMS Lecture: Normalization & Functional Dependencies',
    subject: 'DBMS',
    courseId: 'course-dbms',
    timeSlot: '09:00 - 10:00',
    durationMinutes: 60,
    date: '2026-09-19',
    type: 'lecture',
    priority: 'high',
    completed: true,
    notes: 'Reviewed 1NF, 2NF and transitive dependencies with Dr. Ramesh.'
  },
  {
    id: 'session-02',
    title: 'SQL Practice: Advanced GROUP BY & Subqueries',
    subject: 'DBMS',
    courseId: 'course-dbms',
    timeSlot: '10:30 - 11:30',
    durationMinutes: 60,
    date: '2026-09-19',
    type: 'practice',
    priority: 'medium',
    completed: true
  },
  {
    id: 'session-03',
    title: 'Python Functions & Lambda Expressions',
    subject: 'Python',
    courseId: 'course-python',
    timeSlot: '14:00 - 15:00',
    durationMinutes: 60,
    date: '2026-09-19',
    type: 'lecture',
    priority: 'medium',
    completed: true
  },
  {
    id: 'session-04',
    title: 'Diagnostic Quiz: Database Normalization (1NF to 3NF)',
    subject: 'DBMS',
    courseId: 'course-dbms',
    timeSlot: '18:00 - 18:30',
    durationMinutes: 30,
    date: '2026-09-19',
    type: 'quiz',
    priority: 'high',
    completed: false,
    aiSuggested: true,
    notes: 'EduNexus recommended this session to test recent weak areas before the upcoming exam.'
  },
  {
    id: 'session-05',
    title: 'Revision: Resolving 2NF vs 3NF Misconceptions',
    subject: 'DBMS',
    courseId: 'course-dbms',
    timeSlot: '20:00 - 20:45',
    durationMinutes: 45,
    date: '2026-09-19',
    type: 'revision',
    priority: 'high',
    completed: false,
    aiSuggested: true
  },
  {
    id: 'session-06',
    title: 'Binary Search Tree Balancing Practice',
    subject: 'Data Structures',
    courseId: 'course-dsa',
    timeSlot: '10:00 - 11:30',
    durationMinutes: 90,
    date: '2026-09-20',
    type: 'practice',
    priority: 'medium',
    completed: false
  },
  {
    id: 'session-07',
    title: 'Computer Networks: TCP 3-Way Handshake Review',
    subject: 'Computer Networks',
    courseId: 'course-networks',
    timeSlot: '15:00 - 16:00',
    durationMinutes: 60,
    date: '2026-09-20',
    type: 'lecture',
    priority: 'medium',
    completed: false
  }
];

export const initialQuizzes: Quiz[] = [
  {
    id: 'quiz-normalization',
    title: 'Database Normalization & Dependency Diagnostics',
    subject: 'DBMS',
    topic: 'Normalization',
    questionCount: 5,
    estimatedMinutes: 8,
    difficulty: 'Intermediate',
    completed: false,
    questions: [
      {
        id: 'q-norm-1',
        type: 'mcq',
        question: 'Which normal form eliminates non-trivial functional dependencies where a non-prime attribute depends on a proper subset of any candidate key?',
        options: [
          'First Normal Form (1NF)',
          'Second Normal Form (2NF)',
          'Third Normal Form (3NF)',
          'Boyce-Codd Normal Form (BCNF)'
        ],
        correctAnswer: 'Second Normal Form (2NF)',
        explanation: '2NF specifically forbids partial functional dependencies on candidate keys. Non-prime attributes must depend on the whole key.',
        topic: '2NF',
        difficulty: 'Medium'
      },
      {
        id: 'q-norm-2',
        type: 'mcq',
        question: 'Given relation R(A, B, C) with Candidate Key (A, B) and functional dependency B -> C. In which normal form is this relation?',
        options: [
          'In 1NF, but violates 2NF',
          'In 2NF, but violates 3NF',
          'In 3NF, but violates BCNF',
          'In BCNF'
        ],
        correctAnswer: 'In 1NF, but violates 2NF',
        explanation: 'Because C is a non-prime attribute and depends only on B (a proper subset of candidate key (A, B)), this is a partial dependency violating 2NF.',
        topic: '2NF vs 3NF',
        difficulty: 'Hard'
      },
      {
        id: 'q-norm-3',
        type: 'true_false',
        question: 'True or False: If a relation has only a single-attribute candidate key (e.g. Key is just StudentID), it is automatically in 2NF if it is in 1NF.',
        options: ['True', 'False'],
        correctAnswer: true,
        explanation: 'True! A partial dependency requires a proper subset of a candidate key. If the key has only one attribute, no proper non-empty subset exists.',
        topic: '2NF Rules',
        difficulty: 'Medium'
      },
      {
        id: 'q-norm-4',
        type: 'mcq',
        question: 'A transitive functional dependency in relation R with candidate key X occurs when which condition holds?',
        options: [
          'X -> Y, Y does not -> X, and Y -> Z (where Z is non-prime)',
          'X -> Y and Y -> X identically',
          'X -> Y and X -> Z directly',
          'Z -> X and Z is prime'
        ],
        correctAnswer: 'X -> Y, Y does not -> X, and Y -> Z (where Z is non-prime)',
        explanation: 'Transitive dependency means X -> Y and Y -> Z, indirectly determining Z through non-candidate key Y. 3NF eliminates this.',
        topic: '3NF',
        difficulty: 'Hard'
      },
      {
        id: 'q-norm-5',
        type: 'short_answer',
        question: 'For a relation to satisfy Boyce-Codd Normal Form (BCNF), for every functional dependency X -> Y, X must be a what?',
        correctAnswer: 'superkey',
        explanation: 'In BCNF, every determinant X must be a superkey of the relation.',
        topic: 'BCNF',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'quiz-sql-joins',
    title: 'SQL Joins, Grouping & Aggregations',
    subject: 'DBMS',
    topic: 'SQL Queries',
    questionCount: 4,
    estimatedMinutes: 6,
    difficulty: 'Intermediate',
    completed: true,
    lastScore: 4,
    questions: [
      {
        id: 'q-sql-1',
        type: 'mcq',
        question: 'Which join returns all rows from the left table, and matched rows from the right table, filling with NULL when no match exists?',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN'],
        correctAnswer: 'LEFT OUTER JOIN',
        explanation: 'LEFT OUTER JOIN preserves every record from the left table even without corresponding rows in the right table.',
        topic: 'SQL Joins',
        difficulty: 'Easy'
      },
      {
        id: 'q-sql-2',
        type: 'mcq',
        question: 'Which clause is used to filter groups AFTER an aggregation function has been computed?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        correctAnswer: 'HAVING',
        explanation: 'HAVING filters aggregated groups, whereas WHERE filters individual rows before grouping.',
        topic: 'SQL Aggregation',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'quiz-py-basics',
    title: 'Python Core Mechanics & Memory Scope',
    subject: 'Python',
    topic: 'Functions & Scope',
    questionCount: 4,
    estimatedMinutes: 6,
    difficulty: 'Beginner',
    completed: true,
    lastScore: 3,
    questions: [
      {
        id: 'q-py-1',
        type: 'mcq',
        question: 'What is the output of len(set([1, 2, 2, 3, 3, 3, 4])) in Python?',
        options: ['7', '4', '3', 'Error'],
        correctAnswer: '4',
        explanation: 'A set automatically discards duplicate elements, leaving {1, 2, 3, 4} with length 4.',
        topic: 'Python Sets',
        difficulty: 'Easy'
      }
    ]
  }
];

export const initialRecommendations: RecommendedItem[] = [
  {
    id: 'rec-01',
    title: 'Database Normalization Masterclass (2NF vs 3NF)',
    category: 'DBMS',
    reason: 'EduNexus detected 2NF vs 3NF confusion in recent practice and your DBMS exam is in 6 days.',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    rating: 4.9,
    linkRoute: '/tutor?topic=Normalization',
    courseId: 'course-dbms'
  },
  {
    id: 'rec-02',
    title: 'Python Decorators & Closures in Depth',
    category: 'Programming',
    reason: 'Matches your career goal of High-Scale Backend Engineering.',
    difficulty: 'Intermediate',
    estimatedTime: '35 min',
    rating: 4.8,
    linkRoute: '/learning/course-python',
    courseId: 'course-python'
  },
  {
    id: 'rec-03',
    title: 'Binary Search Tree Validation & Traversal',
    category: 'Algorithms',
    reason: 'Boost your DSA node mastery from 56% to 80% with 3 guided practice problems.',
    difficulty: 'Intermediate',
    estimatedTime: '25 min',
    rating: 4.9,
    linkRoute: '/quizzes/quiz-normalization',
    courseId: 'course-dsa'
  },
  {
    id: 'rec-04',
    title: 'TCP Flow Control & Sliding Window Visualizer',
    category: 'Networking',
    reason: 'Prepare for upcoming Computer Networks midterm next week.',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    rating: 4.7,
    linkRoute: '/learning/course-networks',
    courseId: 'course-networks'
  }
];

export const initialCareerPaths: CareerPath[] = [
  {
    id: 'career-swe',
    title: 'Software Engineer (Backend & Distributed Systems)',
    readinessPercent: 64,
    avgSalaryRange: '$115,000 - $165,000',
    industryDemand: 'Very High',
    strongSkills: ['SQL & Relational DBs', 'Python Fundamentals', 'REST API Architecture', 'Git & Version Control'],
    needsImprovement: ['Data Structures (Trees & Graphs)', 'Database Normalization & Indexing', 'Distributed Systems Basics', 'Unit & Integration Testing'],
    recommendedRoadmap: [
      '1. Master Data Structures (BSTs, Graphs, and Hash collisions)',
      '2. Solidify DBMS Normalization, Indexing (B+ Trees), and Transactions',
      '3. Build high-concurrency microservice project with Docker & PostgreSQL',
      '4. Complete mock algorithmic and system design interview challenges'
    ],
    portfolioProjects: [
      {
        title: 'Distributed Task Queue with Redis & PostgreSQL',
        description: 'Design an asynchronous job queue with exponential backoff retry and worker pool management.',
        skillsCovered: ['Python', 'PostgreSQL', 'Redis', 'Concurrency']
      },
      {
        title: 'Relational Query Engine Simulator',
        description: 'Build an in-memory SQL parser with join optimization and B-Tree indexing.',
        skillsCovered: ['DBMS Internals', 'Data Structures', 'C++ / Python']
      }
    ]
  },
  {
    id: 'career-da',
    title: 'Data Analyst / BI Engineer',
    readinessPercent: 78,
    avgSalaryRange: '$85,000 - $125,000',
    industryDemand: 'High',
    strongSkills: ['SQL Joins & Aggregations', 'Data Cleaning', 'Python Pandas', 'Descriptive Statistics'],
    needsImprovement: ['Data Warehousing (Star Schema)', 'Advanced Window Functions', 'ETL Pipelines'],
    recommendedRoadmap: [
      '1. Deep dive into SQL Window Functions (RANK, DENSE_RANK, NTILE)',
      '2. Learn dimensional data modeling (Fact and Dimension tables)',
      '3. Build automated dashboard reports with real-world financial data'
    ],
    portfolioProjects: [
      {
        title: 'SaaS Customer Churn & Retention Analytics',
        description: 'Analyze cohort retention curves and build an automated forecasting pipeline.',
        skillsCovered: ['SQL', 'Pandas', 'Data Visualization']
      }
    ]
  },
  {
    id: 'career-ai',
    title: 'AI / Machine Learning Engineer',
    readinessPercent: 52,
    avgSalaryRange: '$130,000 - $185,000',
    industryDemand: 'Very High',
    strongSkills: ['Python Fundamentals', 'Linear Algebra Basics', 'Probability & Stats'],
    needsImprovement: ['PyTorch / TensorFlow', 'Vector Databases & Embeddings', 'LLM Fine-Tuning', 'MLOps'],
    recommendedRoadmap: [
      '1. Implement core ML algorithms from scratch with NumPy',
      '2. Master transformer architectures and attention mechanisms',
      '3. Deploy Retrieval-Augmented Generation (RAG) system with Pinecone',
      '4. Implement automated model evaluation and latency tracking'
    ],
    portfolioProjects: [
      {
        title: 'Multimodal Academic RAG Agent',
        description: 'Extract diagrams and notes to generate personalized semantic search and knowledge testing.',
        skillsCovered: ['Python', 'LangChain', 'Vector Search', 'FastAPI']
      }
    ]
  },
  {
    id: 'career-fullstack',
    title: 'Full Stack Web Architect',
    readinessPercent: 71,
    avgSalaryRange: '$105,000 - $155,000',
    industryDemand: 'High',
    strongSkills: ['React & Modern Frontend', 'TypeScript', 'Tailwind CSS', 'SQL Queries'],
    needsImprovement: ['State Machine Design', 'WebSockets Sync', 'OAuth & Security', 'CI/CD Pipelines'],
    recommendedRoadmap: [
      '1. Build production-grade responsive SPAs with state persistence',
      '2. Secure authentication flows with JWT & Refresh Tokens',
      '3. Optimize Core Web Vitals (LCP, INP) and client caching'
    ],
    portfolioProjects: [
      {
        title: 'EduNexus Collaborative Learning Workspace',
        description: 'Real-time collaborative study board with live notes and interactive knowledge mapping.',
        skillsCovered: ['React', 'TypeScript', 'WebSockets', 'Tailwind']
      }
    ]
  }
];

export const initialResources: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'DBMS Normalization Comprehensive Cheat Sheet (1NF to BCNF)',
    type: 'PDF',
    subject: 'DBMS',
    topic: 'Normalization',
    durationOrPages: '8 Pages',
    difficulty: 'Intermediate',
    isSaved: true,
    fileSize: '1.8 MB',
    summary: 'Clear tabular breakdown of anomalies, decomposition rules, candidate key tests, and transitive dependencies.'
  },
  {
    id: 'res-02',
    title: 'SQL Query Optimization & Indexing Strategies',
    type: 'Article',
    subject: 'DBMS',
    topic: 'SQL & Indexing',
    durationOrPages: '12 min read',
    difficulty: 'Advanced',
    isSaved: true,
    summary: 'How relational query planners utilize clustered vs non-clustered B-Tree indices.'
  },
  {
    id: 'res-03',
    title: 'Python Functional Programming: Lambdas, Map & Reduce',
    type: 'Video',
    subject: 'Python',
    topic: 'Functions',
    durationOrPages: '24 min',
    difficulty: 'Beginner',
    isSaved: false,
    summary: 'Video walkthrough of pure functions, side effects, and closures in modern Python 3.12.'
  },
  {
    id: 'res-04',
    title: 'Binary Search Tree Balancing & AVL Rotations',
    type: 'Notes',
    subject: 'Data Structures',
    topic: 'BST',
    durationOrPages: '6 Pages',
    difficulty: 'Intermediate',
    isSaved: false,
    fileSize: '1.2 MB',
    summary: 'Handwritten diagrammed notes detailing Left-Left, Right-Right, and double rotations.'
  },
  {
    id: 'res-05',
    title: 'Computer Networks: TCP vs UDP Packet Sniffing Lab',
    type: 'Assignment',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    durationOrPages: 'Due in 4 Days',
    difficulty: 'Intermediate',
    isSaved: true,
    summary: 'Wireshark packet capture lab analyzing the 3-way handshake, SYN floods, and retransmissions.'
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-01',
    author: {
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      role: 'CS Sophomore • Peer Mentor'
    },
    title: 'How do I easily remember the difference between 2NF and 3NF without memorizing formal proofs?',
    content: 'Whenever I solve exam problems on normalization, I keep second-guessing whether a functional dependency is partial or transitive. Can someone explain an intuitive rule of thumb?',
    tags: ['DBMS', 'Normalization', 'ExamPrep'],
    upvotes: 24,
    userHasUpvoted: true,
    repliesCount: 3,
    timestamp: '2 hours ago',
    replies: [
      {
        id: 'rep-01',
        author: {
          name: 'Senior Student',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        content: 'Remember the classic mantra by Bill Kent: "The key, the whole key, and nothing but the key, so help me Codd!"\n- 1NF = The key\n- 2NF = The WHOLE key (no depending on half a composite key)\n- 3NF = NOTHING BUT the key (no non-key depending on another non-key).',
        timestamp: '1 hour ago',
        upvotes: 18
      },
      {
        id: 'rep-02',
        author: {
          name: 'Devon Vance',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
        },
        content: 'Also: 2NF is ONLY a concern if your Candidate Key has 2+ attributes! If candidate key is just 1 column, you jump straight to 3NF check.',
        timestamp: '45 mins ago',
        upvotes: 9
      }
    ]
  },
  {
    id: 'post-02',
    author: {
      name: 'Rohan Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'CS Junior'
    },
    title: 'Best approach for mastering Graph traversal (BFS vs DFS) for LeetCode medium questions?',
    content: 'I always struggle deciding whether to write BFS with a queue or DFS with recursion. What are your mental checklists for making the call instantly?',
    tags: ['DSA', 'Algorithms', 'InterviewPrep'],
    upvotes: 19,
    userHasUpvoted: false,
    repliesCount: 2,
    timestamp: '5 hours ago',
    replies: [
      {
        id: 'rep-03',
        author: {
          name: 'Ananya Rao',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
        },
        content: 'Shortest path on unweighted graph? -> BFS always. Exhaustive search, path finding, or cycle detection on directed graph? -> DFS with recursion/visited array.',
        timestamp: '3 hours ago',
        upvotes: 14
      }
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'DBMS Midterm Exam in 6 Days',
    description: 'Your Database Systems exam is scheduled for Sept 25. EduNexus has prepared a personalized revision sprint.',
    timeAgo: '10m ago',
    type: 'quiz',
    read: false,
    actionRoute: '/study-plan'
  },
  {
    id: 'notif-02',
    title: 'AI Diagnostic: Weak Area Identified',
    description: 'EduNexus detected 2NF vs 3NF confusion in your recent quiz answers. Added a 20-minute revision session to your plan.',
    timeAgo: '1h ago',
    type: 'tutor',
    read: false,
    actionRoute: '/tutor?topic=Normalization'
  },
  {
    id: 'notif-03',
    title: '🔥 7-Day Learning Streak Active!',
    description: 'You have studied 7 days in a row with 42.5 total hours logged. Keep going to reach the 10-day milestone!',
    timeAgo: '4h ago',
    type: 'streak',
    read: true,
    actionRoute: '/progress'
  },
  {
    id: 'notif-04',
    title: 'Adaptive Workload Optimization',
    description: 'Heavy workload predicted for tomorrow. SQL practice has been suggested to shift to today.',
    timeAgo: '1d ago',
    type: 'plan',
    read: true,
    actionRoute: '/study-plan'
  }
];

export const initialTutorSessions: TutorSession[] = [
  {
    id: 'session-norm',
    topic: 'Database Normalization',
    courseId: 'course-dbms',
    courseName: 'DBMS (CS204)',
    lastActive: '10 mins ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'assistant',
        timestamp: '10:00 AM',
        content: 'Hello! I am your EduNexus AI Tutor. I noticed your upcoming DBMS exam has Normalization flagged as a high-priority area for practice. What specific question or concept would you like to explore first?',
        concept: 'Normalization Introduction'
      },
      {
        id: 'msg-2',
        sender: 'user',
        timestamp: '10:02 AM',
        content: 'Can you explain normalization, and specifically why we need 2NF and 3NF?'
      },
      {
        id: 'msg-3',
        sender: 'assistant',
        timestamp: '10:03 AM',
        content: `Normalization is a systematic database design technique used to minimize redundancy and prevent anomalies (insertion, deletion, and update anomalies).

Think of it as organizing a cluttered filing cabinet so that every single fact is stored in exactly one logical location.

Here is the breakdown of the progression from 1NF through 3NF:`,
        breakdown: {
          concept: '2NF vs 3NF Progression',
          example: 'Suppose we have relation Enrollment(StudentID, CourseID, StudentName, InstructorPhone). Candidate key is (StudentID, CourseID). StudentName depends only on StudentID (Partial dependency -> Violates 2NF!). If CourseID -> Instructor -> InstructorPhone, that is a transitive dependency -> Violates 3NF!',
          commonMistake: 'Thinking every duplicate value in a database column violates normalization. Only non-atomic lists or redundant facts based on functional dependencies cause violations.',
          quickCheck: 'Quick check: If a table has a single-column primary key (like UserID), can it ever violate 2NF? Answer: No, because you cannot have a proper subset of a 1-column key!'
        },
        codeSnippet: {
          language: 'sql',
          code: `-- Decomposing an unnormalized table into 3NF:
-- 1. Student entity (eliminates 2NF partial dependency)
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100)
);

-- 2. Course entity with Instructor
CREATE TABLE Courses (
    CourseID VARCHAR(10) PRIMARY KEY,
    InstructorID INT
);

-- 3. Pure relationship table
CREATE TABLE Enrollments (
    StudentID INT REFERENCES Students(StudentID),
    CourseID VARCHAR(10) REFERENCES Courses(CourseID),
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID)
);`
        }
      }
    ]
  },
  {
    id: 'session-py',
    topic: 'Python Generators & Memory',
    courseId: 'course-python',
    courseName: 'Python (CS101)',
    lastActive: 'Yesterday',
    messages: [
      {
        id: 'msg-py-1',
        sender: 'assistant',
        timestamp: '3:30 PM',
        content: 'Hi! In our previous session, we explored how `yield` creates generator functions in Python without consuming massive memory buffers.',
        concept: 'Python Generators'
      }
    ]
  }
];
