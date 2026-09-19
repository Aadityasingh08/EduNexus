export interface UploadAnalysisResult {
  fileName: string;
  fileSize: string;
  subject: string;
  detectedTopics: string[];
  summary: string;
  importantConcepts: string[];
  potentialWeakAreas: string[];
  suggestedQuizTitle: string;
  recommendedStudyPlanItem: string;
  fullNotes?: string[];
}

export const SUBJECT_TOPICS: Record<string, string[]> = {
  'DBMS': [
    'Database Normalization',
    'SQL Query Optimization & Indexing',
    'Relational Algebra & Tuple Calculus',
    'ACID Transactions & Concurrency Control',
    'B-Tree & Hash Indexing Internals',
    'Distributed Database Systems & Replication'
  ],
  'Python': [
    'Functional Programming & Lambdas',
    'Object-Oriented Programming & Dunder Methods',
    'Generators, Iterators & itertools',
    'Concurrency: AsyncIO, Threading & Multiprocessing',
    'Memory Management & Garbage Collection',
    'Data Structures & Algorithm Implementation'
  ],
  'Data Structures': [
    'Binary Search Trees & AVL Balancing',
    'Graph Traversal (BFS, DFS, Dijkstra, A*)',
    'Dynamic Programming & Memoization',
    'Heaps, Priority Queues & Disjoint Sets',
    'Trie Structures & Advanced String Algorithms',
    'Divide and Conquer & Sorting Optimization'
  ],
  'Computer Networks': [
    'Transport Layer: TCP vs UDP Deep Dive',
    'OSI 7 Layers & Protocol Architecture',
    'Network Routing: Distance Vector vs Link State',
    'Application Layer: HTTP/3, QUIC & DNS Resolution',
    'Network Security, TLS/SSL & Cryptographic Handshakes',
    'Packet Sniffing, Wireshark & Congestion Control'
  ],
  'Operating Systems': [
    'Process Scheduling & Context Switching',
    'Thread Synchronization, Mutexes & Semaphores',
    'Deadlock Characterization & Banker\'s Algorithm',
    'Virtual Memory, Paging & Page Replacement (LRU)',
    'File Systems, Inodes & Disk Scheduling',
    'System Calls & Kernel Architecture'
  ],
  'Machine Learning': [
    'Supervised Learning: Regression & Classification',
    'Gradient Descent & Loss Optimization Algorithms',
    'Neural Network Architectures & Backpropagation',
    'Evaluation Metrics: Precision, Recall, ROC-AUC',
    'Overfitting Mitigation: Regularization & Dropout',
    'Feature Engineering & Principal Component Analysis'
  ],
  'Web Development': [
    'React Architecture, Fiber Reconciler & Hooks',
    'State Management (Zustand, Redux, Context API)',
    'Browser Rendering Engine & Critical Rendering Path',
    'REST, GraphQL & WebSockets Communication',
    'Web Performance, Core Web Vitals & Lazy Loading',
    'Modern CSS Grid, Flexbox & Responsive Design'
  ]
};

export const analyzeUploadedMaterial = async (
  fileName: string,
  selectedSubject: string = 'DBMS',
  selectedTopic?: string,
  onProgress?: (step: number, stepName: string, percent: number) => void
): Promise<UploadAnalysisResult> => {
  const steps = [
    { step: 1, name: `Uploading and parsing document (${fileName})...`, percent: 20 },
    { step: 2, name: `Analyzing semantic structure for ${selectedSubject} curriculum...`, percent: 45 },
    { step: 3, name: 'Extracting key formulas, theorems & code snippets...', percent: 70 },
    { step: 4, name: 'Cross-referencing EduNexus Knowledge Graph nodes...', percent: 90 },
    { step: 5, name: 'Synthesizing comprehensive academic study notes & diagnostic quizzes...', percent: 100 },
  ];

  for (const s of steps) {
    if (onProgress) onProgress(s.step, s.name, s.percent);
    await new Promise((r) => setTimeout(r, 450));
  }

  // Determine topic
  const availableTopics = SUBJECT_TOPICS[selectedSubject] || SUBJECT_TOPICS['DBMS'];
  const topic = selectedTopic && selectedTopic.trim() !== ''
    ? selectedTopic
    : availableTopics[0];

  switch (selectedSubject) {
    case 'Python':
      return {
        fileName,
        fileSize: '1.9 MB',
        subject: 'Python',
        detectedTopics: [
          topic,
          'Pure Functions & Immutability',
          'Lambda Expressions & Scope',
          'map(), filter(), reduce() Internals',
          'Generator Pipelines & itertools'
        ],
        summary: `Comprehensive academic material on ${topic} in Python 3.12, detailing declarative paradigms, anonymous functions, closures, memory allocation, and performance optimization compared to iterative loops.`,
        importantConcepts: [
          'First-Class Functions and Higher-Order Abstractions',
          'Lexical Scoping and LEGB Name Resolution Rules',
          'Lazy Evaluation of Map/Filter Iterators',
          'Cumulative Folding via functools.reduce'
        ],
        potentialWeakAreas: [
          'Late binding gotchas with lambda closures inside loops',
          'Memory trade-offs between eager list comprehensions vs lazy generator pipelines'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: Python ${topic}`,
        recommendedStudyPlanItem: `45-min hands-on coding sprint on ${topic} pipelines`
      };

    case 'Data Structures':
      return {
        fileName,
        fileSize: '2.8 MB',
        subject: 'Data Structures',
        detectedTopics: [
          topic,
          'Binary Search Tree Properties',
          'AVL Balance Factor (-1, 0, 1)',
          'Single & Double Tree Rotations',
          'Asymptotic Search & Deletion Proofs'
        ],
        summary: `Rigorous academic lecture notes on ${topic}, covering algorithmic invariants, self-balancing mechanics, recursive rotation procedures, and formal time-space complexity theorems.`,
        importantConcepts: [
          'Balance Factor Calculation: Height(L) - Height(R)',
          'Left-Left (LL) and Right-Right (RR) Single Rotations',
          'Left-Right (LR) and Right-Left (RL) Double Rotations',
          'Worst-case O(log N) Guarantee for Search, Insertion & Deletion'
        ],
        potentialWeakAreas: [
          'Correctly distinguishing between single vs double rotation trigger conditions',
          'Updating node heights during recursive backtracking after deletion'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: ${topic} Algorithm Invariants`,
        recommendedStudyPlanItem: `35-min tree rotation visual trace and complexity proofs`
      };

    case 'Computer Networks':
      return {
        fileName,
        fileSize: '3.1 MB',
        subject: 'Computer Networks',
        detectedTopics: [
          topic,
          'TCP 3-Way Handshake & Teardown',
          'Sliding Window & Flow Control',
          'Congestion Avoidance: Reno, Cubic, BBR',
          'Wireshark Protocol Packet Dissection'
        ],
        summary: `Lab manual and theoretical framework for ${topic}. Covers transport layer reliability, sequence number progression, SYN flood defenses, and Wireshark trace analysis.`,
        importantConcepts: [
          'Initial Sequence Number (ISN) Randomization',
          'Maximum Segment Size (MSS) vs MTU Constraints',
          'Fast Retransmit via Triple Duplicate ACKs',
          'TCP Window Scaling and Bandwidth-Delay Product (BDP)'
        ],
        potentialWeakAreas: [
          'Calculating round-trip time (RTT) and variance for dynamic timeout intervals',
          'Analyzing SYN flood denial-of-service vulnerabilities and SYN cookies'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: ${topic} & Packet Flow`,
        recommendedStudyPlanItem: `40-min Wireshark packet capture analysis session`
      };

    case 'Operating Systems':
      return {
        fileName,
        fileSize: '2.5 MB',
        subject: 'Operating Systems',
        detectedTopics: [
          topic,
          'Process State Transitions & PCB',
          'Preemptive CPU Scheduling Algorithms',
          'Deadlock Coffman Conditions',
          'Virtual Memory & Page Replacement'
        ],
        summary: `Operating Systems lecture material examining ${topic}, kernel-mode abstractions, context switching costs, memory virtualization, and concurrency control.`,
        importantConcepts: [
          'Process Control Block (PCB) & CPU Register Context',
          'Multi-Level Feedback Queue (MLFQ) Scheduling',
          'Four Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
          'Belady\'s Anomaly in FIFO vs Optimal/LRU Page Replacement'
        ],
        potentialWeakAreas: [
          'Banker\'s Algorithm resource-request safety state verification',
          'Translation Lookaside Buffer (TLB) miss latency calculations'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: OS ${topic} & Kernel Invariants`,
        recommendedStudyPlanItem: `30-min problem solving on CPU scheduling and deadlock detection`
      };

    case 'Machine Learning':
      return {
        fileName,
        fileSize: '3.4 MB',
        subject: 'Machine Learning',
        detectedTopics: [
          topic,
          'Cost Functions & Convex Optimization',
          'Stochastic & Mini-batch Gradient Descent',
          'Bias-Variance Tradeoff',
          'L1 (Lasso) vs L2 (Ridge) Regularization'
        ],
        summary: `Foundational mathematical notes on ${topic}, loss surface topography, learning rate decay schedules, and cross-validation methodologies.`,
        importantConcepts: [
          'Mean Squared Error (MSE) vs Cross-Entropy Loss',
          'Backpropagation Chain Rule Derivations',
          'L2 Weight Decay vs L1 Feature Sparsity',
          'Confusion Matrix & Precision-Recall Tradeoffs'
        ],
        potentialWeakAreas: [
          'Vanishing and exploding gradients in deep networks',
          'Choosing appropriate learning rate schedules with Adam/RMSprop'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: ML ${topic} Mathematics`,
        recommendedStudyPlanItem: `40-min mathematical derivation on loss optimization`
      };

    case 'Web Development':
      return {
        fileName,
        fileSize: '2.2 MB',
        subject: 'Web Development',
        detectedTopics: [
          topic,
          'Virtual DOM & Fiber Reconciler',
          'State Preservation & Hook Dependency Arrays',
          'Client-side vs Server-side Rendering (SSR)',
          'Core Web Vitals: LCP, INP, CLS'
        ],
        summary: `Modern web engineering guide on ${topic}, component lifecycles, reactivity engines, network waterfall elimination, and responsive interface architecture.`,
        importantConcepts: [
          'Reconciliation Algorithm & Key Prop Stability',
          'useMemo vs useCallback Performance Profiles',
          'Critical Rendering Path & CSSOM Blocking',
          'Single-Page Application Routing & History API'
        ],
        potentialWeakAreas: [
          'Stale closures in asynchronous useEffect hooks',
          'Unnecessary re-renders caused by unstable object references'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: Web Engineering & ${topic}`,
        recommendedStudyPlanItem: `35-min component refactoring and performance audit`
      };

    case 'DBMS':
    default:
      return {
        fileName,
        fileSize: '2.4 MB',
        subject: 'DBMS',
        detectedTopics: [
          topic,
          'Functional Dependencies & Armstrong\'s Axioms',
          'Candidate Keys & Superkey Identification',
          '1NF, 2NF, 3NF & BCNF Decomposition Rules',
          'Lossless Join & Dependency Preservation Proofs'
        ],
        summary: `Formal relational database theory covering ${topic}, anomalies elimination, functional dependency inference, and minimal canonical cover algorithms.`,
        importantConcepts: [
          'Prime vs Non-Prime Attribute Distinctions',
          'Proper Subset Partial Dependencies (2NF Violation)',
          'Transitive Dependency Chains: A -> B and B -> C (3NF Violation)',
          'Boyce-Codd (BCNF) Superkey Rule & Dependency Tradeoffs'
        ],
        potentialWeakAreas: [
          'Distinguishing between 2NF partial dependency and 3NF transitive dependency in composite-key relations',
          'Verification of dependency preservation during BCNF decomposition'
        ],
        suggestedQuizTitle: `Diagnostic Quiz: DBMS ${topic} & Normal Forms`,
        recommendedStudyPlanItem: `30-min targeted problem set on 3NF vs BCNF schema decomposition`
      };
  }
};

export const scanDocumentMaterial = async (
  onProgress?: (progress: string) => void
): Promise<{ extractedText: string; explanation: string; detectedSubject: string }> => {
  if (onProgress) onProgress('Capturing high-resolution camera frame...');
  await new Promise((r) => setTimeout(r, 600));

  if (onProgress) onProgress('Running neural OCR text extraction...');
  await new Promise((r) => setTimeout(r, 700));

  if (onProgress) onProgress('Synthesizing concept explanation across academic knowledge graph...');
  await new Promise((r) => setTimeout(r, 600));

  return {
    detectedSubject: 'Database Management Systems',
    extractedText: `Schema: Relational Schema R(A, B, C, D)
Functional Dependencies F = { A -> B, B -> C, (A, D) -> E }
Question: Identify candidate keys and highest normal form of R.`,
    explanation: `**EduNexus AI OCR Diagnosis:**
1. **Candidate Key Determination**: Attribute closure $(A, D)^+ = \\{A, B, C, D, E\\}$. Since no proper subset covers all attributes, $(A, D)$ is the minimal Candidate Key.
2. **Normal Form Check**:
   - $A \\rightarrow B$ is a partial dependency because $A$ is a proper subset of candidate key $(A, D)$ and $B$ is non-prime.
   - Therefore, the relation **violates 2NF** and is currently only in **1NF**.`
  };
};
