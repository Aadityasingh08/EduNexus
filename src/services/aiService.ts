import { GoogleGenAI } from '@google/genai';
import { KnowledgeNode } from '../types';

export interface AIResponsePayload {
  content: string;
  concept?: string;
  breakdown?: {
    concept: string;
    example: string;
    commonMistake: string;
    quickCheck: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
}

// Context-aware system prompt builder
const buildSystemPrompt = (
  studentName: string,
  currentTopic: string,
  courseName: string,
  overallMastery: number,
  weakNodes: KnowledgeNode[],
  recentMessages: string
): string => {
  const weakAreas = weakNodes
    .filter((n) => n.status === 'weak' || n.status === 'needs-practice')
    .map((n) => `${n.label} (${n.mastery}%)`)
    .slice(0, 5)
    .join(', ');

  return `You are EduNexus Academic AI Tutor — a world-class academic mentor embedded in the EduNexus Learning Operating System.

STUDENT PROFILE:
- Name: ${studentName}
- Course/Discipline: ${courseName}
- Current Active Topic: ${currentTopic}
- Overall Mastery Level: ${overallMastery}%
- Diagnosed Weak Areas: ${weakAreas || 'None currently flagged'}

RECENT CONTEXT:
${recentMessages || 'Session initiated.'}

PEDAGOGICAL INSTRUCTIONS:
1. Provide comprehensive, accurate, university-level academic explanations.
2. Break complex concepts into clear, numbered steps with intuitive analogies.
3. If code or queries are appropriate (SQL, Python, C++, etc.), provide clean, well-commented code.
4. Highlight common exam mistakes and pitfalls students encounter.
5. Conclude with a "**Quick Check**" diagnostic question to test comprehension.
6. Use clean Markdown formatting (bold keywords, tables, callouts).`;
};

// ─── Extensive Offline Knowledge Base ─────────────────────────────────────────
const comprehensiveAcademicEngine = (prompt: string, currentTopic: string, courseName: string): AIResponsePayload => {
  const lp = prompt.toLowerCase();

  // 1. DATABASE MANAGEMENT SYSTEMS (DBMS)
  if (lp.includes('normaliz') || lp.includes('1nf') || lp.includes('2nf') || lp.includes('3nf') || lp.includes('bcnf') || lp.includes('anomaly')) {
    return {
      content: `### Database Normalization: Comprehensive Academic Breakdown

Database normalization is the formal mathematical process of decomposing relations to eliminate redundancy and prevent **insertion, deletion, and update anomalies**.

#### 1. Why Normalization is Critical:
Without normalization, data is duplicated across thousands of rows. If a student's address changes, updating 500 rows risks partial failure (Update Anomaly). If the last student in a department drops out, deleting their row deletes the entire department record (Deletion Anomaly).

#### 2. The Normal Forms Hierarchy:
1. **First Normal Form (1NF)**:
   - All column values must be **atomic** (no multi-valued attributes, no comma-separated arrays).
   - Each row uniquely identified by a Primary Key.
2. **Second Normal Form (2NF)**:
   - Must be in 1NF.
   - **No Partial Dependencies**: No non-prime attribute may depend on a *proper subset* of any candidate key. (Applies strictly when candidate keys are composite).
3. **Third Normal Form (3NF)**:
   - Must be in 2NF.
   - **No Transitive Dependencies**: For every functional dependency $X \\rightarrow Y$, either $X$ is a Superkey, or $Y$ is a Prime Attribute. Non-keys must depend *only* on the key.
4. **Boyce-Codd Normal Form (BCNF)**:
   - Stricter form of 3NF. For *every* non-trivial dependency $X \\rightarrow Y$, $X$ **must** be a Superkey.

**The Golden Mantra** (Bill Kent): *"Each non-key attribute must provide a fact about the key, the whole key, and nothing but the key, so help me Codd."*

**Quick Check**: If a table has Composite Key {StudentID, CourseID} and attribute ProfessorRoom depends only on CourseID, which normal form is violated?`,
      concept: 'Database Normalization',
      breakdown: {
        concept: 'Relational Decomposition & Normal Forms',
        example: 'Splitting an unnormalized ENROLLMENT table into STUDENTS(ID, Name), COURSES(Code, Title), and ENROLLMENTS(ID, Code, Grade).',
        commonMistake: 'Thinking 2NF applies to tables with a single-column primary key. 2NF is only violated when candidate keys are composite.',
        quickCheck: 'Which normal form guarantees lossless join but may not always preserve functional dependencies?'
      },
      codeSnippet: {
        language: 'sql',
        code: `-- Unnormalized table violating 2NF & 3NF:
-- Candidate Key: (student_id, course_id)
-- Violation: course_name depends only on course_id (Partial Dependency)
-- Violation: instructor_office depends on instructor_id (Transitive Dependency)

-- Decomposed 3NF Schema:
CREATE TABLE Courses (
    course_id VARCHAR(10) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    instructor_id INT REFERENCES Instructors(id)
);

CREATE TABLE Enrollments (
    student_id INT REFERENCES Students(id),
    course_id VARCHAR(10) REFERENCES Courses(course_id),
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id)
);`
      }
    };
  }

  if (lp.includes('index') || lp.includes('sql') || lp.includes('explain') || lp.includes('b-tree') || lp.includes('query')) {
    return {
      content: `### SQL Query Optimization & B-Tree Indexing Mechanics

Relational query planners (PostgreSQL, MySQL, Oracle) utilize cost-based optimizers (CBO) to convert declarative SQL into physical execution trees.

#### 1. Clustered vs Non-Clustered (Secondary) Indexes:
- **Clustered Index**: Determines the *physical sorting order* of rows on disk. There can only be **one** clustered index per table (typically the Primary Key). Leaf pages contain the actual table row data.
- **Secondary (Non-Clustered) Index**: A separate B+ Tree where leaf nodes store the indexed key along with a pointer (RowID or Primary Key) back to the clustered table.

#### 2. The Leftmost Prefix Rule:
When creating a composite index on \`(tenant_id, created_at, status)\`:
- \`WHERE tenant_id = 10 AND created_at > '2026-01-01'\` $\\rightarrow$ **Index Range Scan (Sub-millisecond)**.
- \`WHERE created_at > '2026-01-01'\` $\\rightarrow$ **Full Table Scan (Cannot use index because leftmost column is missing)**.

#### 3. SARGable Queries (Search Argument Able):
Never wrap indexed columns inside SQL functions:
- ❌ \`WHERE YEAR(created_at) = 2026\` $\\rightarrow$ Invalidates index, forces full table scan.
- ✔ \`WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'\` $\\rightarrow$ Uses index seek.

**Quick Check**: What is a "Covering Index" and why does it avoid random disk I/O?`,
      concept: 'B-Tree Indexing & Query Tuning',
      breakdown: {
        concept: 'Cost-Based Query Execution',
        example: 'Running EXPLAIN ANALYZE to compare a 450ms sequential scan vs a 0.3ms index seek.',
        commonMistake: 'Adding individual single-column indexes on every column instead of purposeful composite indexes.',
        quickCheck: 'Why does wrapping an indexed column in a function like LOWER(email) prevent index usage?'
      },
      codeSnippet: {
        language: 'sql',
        code: `-- High-Performance Composite Index
CREATE INDEX idx_orders_customer_date 
ON orders (customer_id, order_date DESC) 
INCLUDE (total_amount); -- Covering Index payload

-- Execution Plan Inspection:
EXPLAIN (ANALYZE, BUFFERS, COSTS)
SELECT customer_id, order_date, total_amount
FROM orders
WHERE customer_id = 9482
  AND order_date >= '2026-01-01';`
      }
    };
  }

  // 2. DATA STRUCTURES & ALGORITHMS (DSA)
  if (lp.includes('tree') || lp.includes('avl') || lp.includes('bst') || lp.includes('binary search') || lp.includes('rotation')) {
    return {
      content: `### Binary Search Trees & Self-Balancing AVL Trees

A **Binary Search Tree (BST)** enforces the invariant: $\\forall v, \\text{keys}(\\text{left}(v)) < \\text{key}(v) \\le \\text{keys}(\\text{right}(v))$.
However, inserting sorted keys into a standard BST degenerates the structure into a linked list with $O(N)$ lookup.

#### 1. AVL Tree Theorem & Balance Factor:
An AVL tree guarantees $O(\\log N)$ worst-case time by enforcing the **Height-Balance Property**:
$$\\text{Balance Factor}(v) = \\text{Height}(\\text{left}(v)) - \\text{Height}(\\text{right}(v)) \\in \\{-1, 0, +1\\}$$

#### 2. The 4 Canonical Rotations:
When an insertion causes $|BF(v)| > 1$, we restore balance using:
1. **Left-Left (LL) Case**: New node inserted into left subtree of left child $\\rightarrow$ **Single Right Rotation**.
2. **Right-Right (RR) Case**: New node inserted into right subtree of right child $\\rightarrow$ **Single Left Rotation**.
3. **Left-Right (LR) Case**: New node inserted into right subtree of left child $\\rightarrow$ **Double Rotation (Left rotate child, Right rotate root)**.
4. **Right-Left (RL) Case**: New node inserted into left subtree of right child $\\rightarrow$ **Double Rotation (Right rotate child, Left rotate root)**.

**Quick Check**: What is the maximum height of an AVL tree with $N$ nodes?`,
      concept: 'AVL Tree Self-Balancing',
      breakdown: {
        concept: 'Tree Rotations & Height Invariants',
        example: 'Inserting keys [10, 20, 30] sequentially triggers an RR violation at node 10, resolved by left-rotating around 20.',
        commonMistake: 'Forgetting to recompute subtree heights from the bottom up after performing rotations.',
        quickCheck: 'If a node has a left subtree of height 3 and right subtree of height 1, what is its balance factor?'
      },
      codeSnippet: {
        language: 'python',
        code: `class AVLNode:
    def __init__(self, key: int):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def right_rotate(y: AVLNode) -> AVLNode:
    x = y.left
    T2 = x.right
    # Perform rotation
    x.right = y
    y.left = T2
    # Update heights
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    return x # New root

def get_height(node: AVLNode) -> int:
    return node.height if node else 0`
      }
    };
  }

  // 3. COMPUTER NETWORKS
  if (lp.includes('osi') || lp.includes('tcp') || lp.includes('udp') || lp.includes('network') || lp.includes('packet') || lp.includes('wireshark') || lp.includes('handshake')) {
    return {
      content: `### Computer Networks: OSI Model & Transport Layer Protocol Mechanics

Modern networking relies on layered abstraction. The **OSI 7-Layer Model** separates physical transmission from application semantics:

#### 1. The 7 Layers at a Glance:
1. **Physical**: Raw bitstreams over fiber, copper, or RF signals.
2. **Data Link**: Node-to-node framing, MAC addressing, Ethernet switches, CRC error detection.
3. **Network**: Host-to-host logical routing across subnets via IP protocols (Routers, BGP, OSPF).
4. **Transport**: End-to-end process-to-process delivery, flow control, port addressing (TCP, UDP).
5. **Session**: Dialog control, session token lifecycle.
6. **Presentation**: Data formatting, character encoding, TLS encryption/decryption.
7. **Application**: High-level network protocols (HTTP/2, HTTP/3, DNS, SSH, SMTP).

#### 2. TCP vs UDP Protocol Comparison:
| Architectural Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection State** | Connection-Oriented (3-Way Handshake) | Connectionless Datagrams |
| **Reliability** | Guaranteed Delivery (Sequence & ACK numbers) | Best-Effort (No retransmissions) |
| **Ordering** | In-Order Packet Reassembly | Independent Packets (May arrive out of order) |
| **Header Size** | 20 to 60 Bytes | 8 Bytes Flat |
| **Flow & Congestion** | Sliding Window, Reno/BBR Congestion Avoidance | None (Application controls rate) |
| **Primary Use Cases** | Web (HTTP), Email, File Transfer, Financial DBs | Live Video Streaming, DNS queries, Online Gaming |

#### 3. TCP 3-Way Handshake Sequence:
1. **Client $\\rightarrow$ Server**: \`SYN\` (Synchronize with Initial Sequence Number $ISN_C$).
2. **Server $\\rightarrow$ Client**: \`SYN-ACK\` (Server sends $ISN_S$ and acknowledges $ACK = ISN_C + 1$).
3. **Client $\\rightarrow$ Server**: \`ACK\` (Client acknowledges $ACK = ISN_S + 1$). State becomes \`ESTABLISHED\`.

**Quick Check**: Why does TCP use a 3-way handshake instead of a 2-way handshake?`,
      concept: 'Transport Protocols & OSI Layers',
      breakdown: {
        concept: 'Process-to-Process Network Reliability',
        example: 'Wireshark packet capture showing SYN (Seq=0), SYN-ACK (Seq=0, Ack=1), ACK (Seq=1, Ack=1).',
        commonMistake: 'Believing UDP has no error checking. UDP includes an optional 16-bit checksum to detect corruption.',
        quickCheck: 'Which layer does an IP Router inspect to forward packets?'
      }
    };
  }

  // 4. PYTHON & PROGRAMMING LANGUAGES
  if (lp.includes('python') || lp.includes('lambda') || lp.includes('functional') || lp.includes('reduce') || lp.includes('map') || lp.includes('closure')) {
    return {
      content: `### Python Functional Programming: Pure Functions, Lambdas & Closures

In Python, functions are **first-class citizens**—they can be assigned to variables, passed as arguments, and returned from other functions.

#### 1. The Core Functional Principles:
- **Pure Functions**: Return values depend *only* on input arguments with zero observable side effects (no global mutations, no disk I/O).
- **Referential Transparency**: Any function call can be replaced with its evaluated result without altering program behavior.
- **Immutability**: Avoid in-place mutation of lists/dictionaries; transform data into new structures.

#### 2. The Core Primitives:
1. **Lambda Expressions**: Anonymous, inline single-expression functions:
   \`lambda arg1, arg2: expression\`
2. **\`map(func, iterable)\`**: Applies \`func\` to all elements lazily (returns an iterator).
3. **\`filter(predicate, iterable)\`**: Yields only elements where \`predicate(item)\` evaluates to \`True\`.
4. **\`functools.reduce(func, iterable, initial)\`**: Cumulatively folds a collection into a single aggregate scalar.

**Quick Check**: What is the memory advantage of using \`map()\` over an eager list comprehension \`[x*2 for x in data]\` for 10 million items?`,
      concept: 'Python Functional Paradigms',
      breakdown: {
        concept: 'Declarative Stream Processing',
        example: 'Calculating total sales with discount using map(), filter(), and functools.reduce().',
        commonMistake: 'Using lambda when a named def function or list comprehension would be much more readable.',
        quickCheck: 'How does Python resolve variable scope inside closures according to the LEGB rule?'
      },
      codeSnippet: {
        language: 'python',
        code: `from functools import reduce

# Dataset of students with test scores
students = [
    {"name": "Aaditya", "score": 94},
    {"name": "Maya", "score": 88},
    {"name": "Karan", "score": 62},
    {"name": "Dev", "score": 79}
]

# 1. Filter: Retain students with score >= 75
honor_roll = list(filter(lambda s: s["score"] >= 75, students))

# 2. Map: Apply 5% curve
curved_scores = list(map(lambda s: round(s["score"] * 1.05, 1), honor_roll))

# 3. Reduce: Calculate class aggregate average
average = reduce(lambda acc, score: acc + score, curved_scores, 0) / len(curved_scores)

print(f"Curved Honor Roll Scores: {curved_scores}")
print(f"Cohort Average: {average:.2f}%")`
      }
    };
  }

  // 5. OPERATING SYSTEMS
  if (lp.includes('os') || lp.includes('deadlock') || lp.includes('process') || lp.includes('thread') || lp.includes('scheduling') || lp.includes('paging') || lp.includes('virtual memory')) {
    return {
      content: `### Operating Systems: Processes, CPU Scheduling & Deadlocks

An Operating System manages hardware abstractions and concurrency via the kernel.

#### 1. Process vs Thread:
- **Process**: Independent execution unit with its own private virtual memory space (Text, Data, Heap, Stack) and Process Control Block (PCB). IPC (Inter-Process Communication) required for data sharing.
- **Thread**: Lightweight execution unit *within* a process sharing the same heap, code segment, and open file descriptors, but maintaining its own register state and call stack.

#### 2. The 4 Necessary Conditions for Deadlock (Coffman Conditions):
A deadlock can occur if and only if all four conditions hold simultaneously:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process holds at least one resource while waiting to acquire others held by other processes.
3. **No Preemption**: Resources cannot be forcibly revoked from a process until released voluntarily.
4. **Circular Wait**: A closed chain of processes exists: $P_0 \\rightarrow P_1 \\rightarrow P_2 \\dots \\rightarrow P_0$.

**Quick Check**: What algorithm does an OS use to avoid deadlocks by verifying if a state is "safe"?`,
      concept: 'OS Concurrency & Deadlocks',
      breakdown: {
        concept: 'Process Scheduling & Synchronization',
        example: 'Banker\'s Algorithm checking whether allocation matrices leave enough available resources to satisfy at least one process.',
        commonMistake: 'Confusing Deadlock (processes waiting on each other indefinitely) with Starvation (a process waits indefinitely due to biased scheduling).',
        quickCheck: 'What happens during a context switch between two different processes?'
      }
    };
  }

  // 6. DEFAULT / GENERAL ADAPTIVE ACADEMIC RESPONSE
  return {
    content: `### Academic Analysis: ${prompt}

In the context of **${currentTopic}** (${courseName}), let's break down this fundamental concept systematically.

#### 1. Core Principles & Theoretical Foundation
Understanding this concept requires connecting first principles:
- **Core Definition**: The underlying mechanism formalizes how state, algorithms, or resources are structured and accessed within the syllabus framework.
- **System Invariant**: It provides strong guarantees regarding correctness, time complexity, and data consistency across university exam standards.

#### 2. Step-by-Step Problem Solving Strategy:
1. **Deconstruct the inputs**: Identify all variables, domain constraints, and boundary conditions.
2. **Apply the standard algorithm / theorem**: Transform the raw model into canonical form using established curriculum rules.
3. **Verify edge cases**: Always test for null pointers, off-by-one errors, composite key dependencies, or race conditions.

#### 3. Real-World Industry Application:
In production software engineering, this concept directly underpins performance scalability, distributed resilience, and database throughput.

**Quick Check**: Can you identify the primary trade-off (time vs memory) associated with this approach?`,
    concept: currentTopic,
    breakdown: {
      concept: `${currentTopic} Deep Dive`,
      example: `Applying ${currentTopic} to optimize system performance and reduce architectural complexity.`,
      commonMistake: 'Attempting complex edge cases before validating baseline definitions.',
      quickCheck: `How would you explain the core mechanism of ${currentTopic} to a classmate in 2 sentences?`
    }
  };
};

// ─── Main AI Response Function ────────────────────────────────────────────────
export const generateAIResponse = async (
  prompt: string,
  currentTopic: string = 'Database Systems',
  courseName: string = 'Computer Science',
  context?: {
    studentName?: string;
    overallMastery?: number;
    weakNodes?: KnowledgeNode[];
    recentMessages?: Array<{ sender: string; content: string }>;
  }
): Promise<AIResponsePayload> => {
  // Allow user to supply their own key via localStorage or build env
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('edunexus_gemini_api_key') : null;
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (localKey && localKey.trim()) || (envKey && envKey.trim());

  // If no valid key configured, invoke the extensive built-in academic engine
  if (!apiKey || apiKey === 'your_google_gemini_api_key_here' || apiKey === 'undefined') {
    await new Promise((r) => setTimeout(r, 600));
    return comprehensiveAcademicEngine(prompt, currentTopic, courseName);
  }

  // Build context for system prompt
  const studentName = context?.studentName || 'Student';
  const overallMastery = context?.overallMastery || 65;
  const weakNodes = context?.weakNodes || [];
  const recentMsgs = (context?.recentMessages || [])
    .slice(-4)
    .map((m) => `${m.sender === 'user' ? 'Student' : 'Tutor'}: ${m.content.slice(0, 160)}`)
    .join('\n');

  const systemPrompt = buildSystemPrompt(
    studentName,
    currentTopic,
    courseName,
    overallMastery,
    weakNodes,
    recentMsgs
  );

  try {
    const genAI = new GoogleGenAI({ apiKey });

    // Primary attempt with gemini-2.0-flash
    let responseText = '';
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `${systemPrompt}\n\n---\n\nSTUDENT ASKS: ${prompt}`
      });
      responseText = response.text || '';
    } catch (modelErr) {
      // Fallback to gemini-1.5-flash if 2.0-flash is unavailable for this key
      console.warn('[EduNexus AI] 2.0-flash failed, trying 1.5-flash:', modelErr);
      const fallbackResponse = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `${systemPrompt}\n\n---\n\nSTUDENT ASKS: ${prompt}`
      });
      responseText = fallbackResponse.text || '';
    }

    if (!responseText.trim()) {
      return comprehensiveAcademicEngine(prompt, currentTopic, courseName);
    }

    // Try to extract a code snippet if present for the code viewer
    const codeMatch = responseText.match(/```(\w+)?\n([\s\S]*?)```/);
    const codeSnippet = codeMatch
      ? { language: codeMatch[1] || 'code', code: codeMatch[2].trim() }
      : undefined;

    // Extract "Quick Check" question if present
    const quickCheckMatch = responseText.match(/\*\*Quick Check\*\*:?\s*(.+?)(?:\n|$)/i);
    const quickCheck = quickCheckMatch ? quickCheckMatch[1].trim() : 'Can you explain this concept back in your own words?';

    return {
      content: responseText, // Retain markdown code blocks intact!
      concept: currentTopic,
      codeSnippet,
      breakdown: {
        concept: currentTopic,
        example: `Curriculum application in ${courseName}`,
        commonMistake: 'Make sure to trace through edge cases and check boundary conditions.',
        quickCheck
      }
    };
  } catch (error: any) {
    console.warn('[EduNexus AI] Gemini API connection error, activating academic engine:', error?.message || error);
    return comprehensiveAcademicEngine(prompt, currentTopic, courseName);
  }
};
