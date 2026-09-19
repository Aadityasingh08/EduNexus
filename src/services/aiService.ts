import { AIMessage } from '../types';

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

export const generateAIResponse = async (
  prompt: string,
  currentTopic: string = 'Normalization',
  courseName: string = 'Database Management Systems'
): Promise<AIResponsePayload> => {
  // Simulate network/thinking delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = prompt.toLowerCase();

  // Mode-based prompts
  if (lower.includes('simpler') || lower.includes('simple')) {
    return {
      content: `Let's break down **${currentTopic}** as simply as possible:

Imagine your student record is kept in a giant spreadsheet. If you list your phone number, your dorm address, and your courses all on the same line:
1. When you change your phone number, you have to find and update 10 different rows (Update Anomaly).
2. If you drop a course, you accidentally delete your entire dorm address (Deletion Anomaly).

**Normalization** is simply cutting that giant messy spreadsheet into tidy smaller notebooks that cross-reference each other with IDs. Each fact lives in exactly one place.`,
      concept: `${currentTopic} (Simplified)`
    };
  }

  if (lower.includes('analogy')) {
    return {
      content: `Here is a memorable analogy for understanding **Normalization & Normal Forms**:

Think of **Organizing a Commercial Kitchen**:
- **Unnormalized**: Putting spices, raw meat, customer receipts, and chef apron sizes in one giant storage chest.
- **1NF (First Normal Form)**: Everything is in separate labeled jars. No jar holds both cinnamon and salt together (Atomic Values).
- **2NF (Second Normal Form)**: Receipts only care about Order ID. Chef uniforms only care about Chef ID. No mixing order details with chef attire (No partial dependency on composite keys).
- **3NF (Third Normal Form)**: The spice vendor's emergency telephone number is kept in the Vendor directory, NOT repeated on every single curry jar (Eliminating transitive dependencies).`,
      concept: 'Kitchen Analogy for Normal Forms'
    };
  }

  if (lower.includes('quiz') || lower.includes('test me')) {
    return {
      content: `Here is a diagnostic question on **${currentTopic}** to test your grasp:

**Question:**
Consider table \`CourseRegistration(StudentID, CourseID, StudentName, BuildingAddress)\`.
Candidate Key is \`(StudentID, CourseID)\`.
Suppose \`CourseID -> BuildingAddress\`.

Which normal form does this directly violate?`,
      breakdown: {
        concept: 'Partial Functional Dependency Test',
        example: 'CourseID is only PART of the candidate key (StudentID, CourseID).',
        commonMistake: 'Students often guess 3NF because BuildingAddress seems distant, but since CourseID is a proper subset of the composite key, it violates 2NF first!',
        quickCheck: 'Would this relation violate 2NF if the table key was just CourseID alone? No! Only composite keys can have partial dependencies.'
      }
    };
  }

  if (lower.includes('binary search') || lower.includes('bst') || lower.includes('tree')) {
    return {
      content: `**Binary Search Trees (BST)** maintain a strict structural invariant:

For every node $N$:
1. All values in $N$'s left subtree are strictly **less than** $N.val$.
2. All values in $N$'s right subtree are strictly **greater than** $N.val$.

Because each step discards half the remaining candidates, search, insertion, and deletion run in $O(\\log N)$ average time, though an unbalanced tree can degrade to $O(N)$.`,
      codeSnippet: {
        language: 'python',
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_bst(root: TreeNode, target: int) -> bool:
    if not root:
        return False
    if root.val == target:
        return True
    elif target < root.val:
        return search_bst(root.left, target)
    else:
        return search_bst(root.right, target)`
      },
      breakdown: {
        concept: 'Inorder Traversal Property',
        example: 'An Inorder traversal (Left, Root, Right) of any valid BST always yields values in strictly sorted ascending order.',
        commonMistake: 'Checking only root.left.val < root.val and root.right.val > root.val locally. You must validate against global min/max bounds across the entire subtree!',
        quickCheck: 'What is the worst-case lookup time for an unbalanced binary search tree with N elements? Answer: O(N) linear time.'
      }
    };
  }

  if (lower.includes('recursion')) {
    return {
      content: `**Recursion** is solving a problem by having a function call itself with a smaller sub-problem, until it reaches an indivisible base case.

Every recursive call creates a new execution stack frame in memory storing local variables and return addresses.`,
      codeSnippet: {
        language: 'python',
        code: `def factorial(n: int) -> int:
    # 1. Base Case: Stop condition
    if n <= 1:
        return 1
    # 2. Recursive Step: n * (smaller problem)
    return n * factorial(n - 1)`
      },
      breakdown: {
        concept: 'Call Stack Unwinding',
        example: 'factorial(3) calls factorial(2) calls factorial(1) -> returns 1 -> computes 2*1 -> computes 3*2 = 6.',
        commonMistake: 'Missing or unreachable base case, triggering a RecursionError (stack overflow).',
        quickCheck: 'How can deep recursion be optimized to prevent stack overflow in modern runtimes? Answer: Tail Call Optimization (TCO) or iterative loops with explicit stacks.'
      }
    };
  }

  // Default rich educational explanation on Normalization
  return {
    content: `### Understanding ${currentTopic}

**Normalization** is the mathematical process of decomposing relations to eliminate anomalies while preserving functional dependencies and ensuring lossless joins.

Here is the structured roadmap for **1NF $\\rightarrow$ 2NF $\\rightarrow$ 3NF $\\rightarrow$ BCNF**:

1. **1NF (First Normal Form)**:
   - All column values must be **atomic** (no multi-valued attributes or nested arrays).
   - Each row must have a unique identifier.

2. **2NF (Second Normal Form)**:
   - Must be in 1NF.
   - **No Partial Dependency**: No non-prime attribute may depend on a proper subset of any candidate key.
   - *(Note: If all candidate keys are single attributes, the table is automatically in 2NF!)*

3. **3NF (Third Normal Form)**:
   - Must be in 2NF.
   - **No Transitive Dependency**: For every non-trivial dependency $X \\rightarrow Y$, either $X$ is a superkey OR $Y$ is a prime attribute.`,
    breakdown: {
      concept: 'Transitive Functional Dependency (3NF Violation)',
      example: 'In Student(RollNo, Name, DeptCode, DeptBuilding), RollNo is the Primary Key. RollNo -> DeptCode, and DeptCode -> DeptBuilding. DeptBuilding transitively depends on RollNo via DeptCode!',
      commonMistake: 'Confusing 2NF and 3NF: 2NF checks non-prime attributes against PART of a composite key. 3NF checks non-prime attributes against OTHER non-prime attributes.',
      quickCheck: 'How do we fix a 3NF violation? Answer: Move the transitively dependent attribute (DeptBuilding) into a dedicated department relation with DeptCode as Primary Key.'
    },
    codeSnippet: {
      language: 'sql',
      code: `-- 3NF Decomposition of Student and Department:
CREATE TABLE Department (
    DeptCode VARCHAR(10) PRIMARY KEY,
    DeptBuilding VARCHAR(50) NOT NULL
);

CREATE TABLE Student (
    RollNo INT PRIMARY KEY,
    Name VARCHAR(80) NOT NULL,
    DeptCode VARCHAR(10) REFERENCES Department(DeptCode)
);`
    }
  };
};
