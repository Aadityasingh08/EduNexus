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

// ─── Context-aware system prompt builder ─────────────────────────────────────
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
    .map((n) => `${n.label} (mastery: ${n.mastery}%)`)
    .slice(0, 5)
    .join(', ');

  return `You are EduNexus Academic Tutor — a specialized academic AI assistant embedded inside the EduNexus learning platform.

STUDENT CONTEXT:
- Student Name: ${studentName}
- Current Course: ${courseName}
- Current Topic: ${currentTopic}
- Overall Mastery: ${overallMastery}%
- Detected Weak Areas: ${weakAreas || 'None detected yet'}

RECENT CONVERSATION CONTEXT:
${recentMessages || 'This is the start of the session.'}

TEACHING PHILOSOPHY:
1. You are NOT a generic chatbot. You are a curriculum-aware academic tutor.
2. ALWAYS teach according to the student's current topic and mastery level.
3. Prefer pedagogical, step-by-step explanations over dumping all information at once.
4. When mastery is below 60%, simplify explanations and use analogies.
5. When mastery is above 80%, be more technical and introduce edge cases.
6. Identify misconceptions actively. When you detect confusion, explicitly name it.
7. Ask short diagnostic questions back to the student when appropriate.
8. When answering "Quiz me" or similar requests, generate 3-5 focused MCQ questions relevant to ${currentTopic}.
9. Never fabricate exam scores, citations, or uploaded document content unless provided.
10. If the student uploads notes, only reference content that is explicitly provided.
11. Keep responses focused and scannable. Use markdown formatting (bold, bullets, numbered lists).
12. End responses with one short "Quick Check" question to reinforce learning.

RESPONSE FORMAT RULES:
- Use **bold** for key terms and concepts
- Use numbered lists for steps/processes
- Use bullet points for properties/features
- Include a code snippet ONLY when directly relevant (SQL, Python, pseudocode)
- Keep responses concise but complete — aim for 200-400 words unless a detailed breakdown is explicitly needed

ACADEMIC INTEGRITY:
- Never claim certainty about something you are unsure about.
- If context is insufficient, say: "I don't have enough context from your uploaded materials. Here's what I know from standard curriculum..."`;
};

// ─── Fallback local responses ─────────────────────────────────────────────────
const localFallback = (prompt: string, currentTopic: string, courseName: string): AIResponsePayload => {
  const lp = prompt.toLowerCase();

  if (lp.includes('osi') || lp.includes('layer')) {
    return {
      content: `The **OSI Model** has 7 layers:\n\n1. **Physical** — raw bit transmission\n2. **Data Link** — MAC addressing, framing (Ethernet)\n3. **Network** — IP routing (Routers)\n4. **Transport** — TCP/UDP, end-to-end delivery\n5. **Session** — session establishment\n6. **Presentation** — encryption, encoding\n7. **Application** — HTTP, FTP, SMTP (what you use)\n\n**Quick Check**: Which layer does a Router primarily operate at?`,
      concept: 'OSI Model',
      breakdown: {
        concept: '7 Layers of OSI',
        example: 'When you send an email, it starts at Layer 7 (Application) and travels down to Layer 1 (Physical) before going over the wire.',
        commonMistake: 'Confusing the Transport Layer (TCP/UDP) with the Network Layer (IP routing).',
        quickCheck: 'Which layer is responsible for logical IP routing — Network or Transport?'
      }
    };
  }

  if (lp.includes('tcp') || lp.includes('udp')) {
    return {
      content: `**TCP vs UDP** — both are Transport Layer (Layer 4) protocols:\n\n| Feature | TCP | UDP |\n|--------|-----|-----|\n| Connection | Connection-oriented | Connectionless |\n| Reliability | Guaranteed delivery | Best-effort |\n| Speed | Slower | Faster |\n| Use case | Web, email, file download | Video streaming, gaming, DNS |\n\n**Quick Check**: Would you use TCP or UDP for a live video call? Why?`,
      concept: 'TCP vs UDP',
      breakdown: {
        concept: 'Transport Protocols',
        example: 'Playing a live multiplayer game uses UDP because speed matters more than the occasional dropped packet.',
        commonMistake: 'Thinking UDP is "worse" than TCP — UDP is preferred for real-time applications.',
        quickCheck: 'For a file download where no data corruption is allowed, which protocol is correct?'
      }
    };
  }

  if (lp.includes('normaliz') || lp.includes('2nf') || lp.includes('3nf') || lp.includes('bcnf')) {
    return {
      content: `**Database Normalization** eliminates redundancy:\n\n- **1NF**: Atomic values — no repeating groups\n- **2NF**: No partial dependencies (non-key column depends on WHOLE key)\n- **3NF**: No transitive dependencies (non-key column depends only on key)\n- **BCNF**: Stronger — every determinant must be a superkey\n\n**The key mantra** (Bill Kent): *"The key, the whole key, and nothing but the key — so help me Codd!"*\n\n**Quick Check**: A table has columns (StudentID, CourseID, StudentName). What kind of dependency is StudentID → StudentName when the PK is (StudentID, CourseID)?`,
      concept: 'Normalization',
      breakdown: {
        concept: '1NF through BCNF',
        example: 'If a Student table stores DeptHeadName, moving it to a Departments table removes a transitive dependency → achieves 3NF.',
        commonMistake: 'Forgetting that 2NF is only a concern when the candidate key is composite (2+ attributes).',
        quickCheck: 'What type of dependency violates 3NF?'
      },
      codeSnippet: {
        language: 'sql',
        code: `-- Before 3NF (violates: DeptHead is transitively dependent on DeptID, not StudentID)
CREATE TABLE Students (
  StudentID INT PRIMARY KEY,
  DeptID INT,
  DeptHead VARCHAR(50)  -- <-- transitive dependency!
);

-- After 3NF decomposition:
CREATE TABLE Departments (DeptID INT PRIMARY KEY, DeptHead VARCHAR(50));
CREATE TABLE Students (StudentID INT PRIMARY KEY, DeptID INT REFERENCES Departments);`
      }
    };
  }

  if (lp.includes('python') || lp.includes('recursion') || lp.includes('algorithm')) {
    return {
      content: `**Python** is a high-level, interpreted language. Here's a classic recursion example:\n\nThe **factorial** function: n! = n × (n-1) × ... × 1\n\nBase case: 0! = 1\nRecursive case: n! = n × (n-1)!\n\n**Quick Check**: What would happen if you forgot the base case in the recursion below?`,
      concept: 'Python Recursion',
      codeSnippet: {
        language: 'python',
        code: `def factorial(n: int) -> int:
    if n == 0:      # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # Output: 120`
      }
    };
  }

  // Generic fallback
  return {
    content: `Great question about **"${prompt}"** in the context of **${currentTopic}** (${courseName}).\n\nThis concept is part of your current curriculum. Let me break it down:\n\n- It connects to the core principles we've been discussing\n- Understanding this will help you with related concepts in your knowledge graph\n- I recommend reviewing your lecture notes and practicing with examples\n\n*Note: I'm currently running in offline mode. For more detailed AI responses, ensure the Gemini API key is configured.*\n\n**Quick Check**: Can you describe this concept in your own words?`,
    concept: 'Concept Analysis',
    breakdown: {
      concept: 'Targeted Review',
      example: `Applying "${currentTopic}" to a real-world scenario helps solidify understanding.`,
      commonMistake: 'Overcomplicating the concept instead of building from first principles.',
      quickCheck: 'Can you explain this back to me in one sentence?'
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
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no real API key, use intelligent local fallback
  if (!apiKey || apiKey === 'your_google_gemini_api_key_here' || apiKey.trim() === '') {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    return localFallback(prompt, currentTopic, courseName);
  }

  // Build context for system prompt
  const studentName = context?.studentName || 'Student';
  const overallMastery = context?.overallMastery || 60;
  const weakNodes = context?.weakNodes || [];
  const recentMsgs = (context?.recentMessages || [])
    .slice(-4)
    .map((m) => `${m.sender === 'user' ? 'Student' : 'Tutor'}: ${m.content.slice(0, 150)}`)
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

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\n---\n\nSTUDENT ASKS: ${prompt}` }]
        }
      ]
    });

    const rawText = response.text || '';

    // Try to extract a code snippet if present
    const codeMatch = rawText.match(/```(\w+)?\n([\s\S]*?)```/);
    const codeSnippet = codeMatch
      ? { language: codeMatch[1] || 'code', code: codeMatch[2].trim() }
      : undefined;

    // Clean text from code blocks for display
    const cleanContent = rawText
      .replace(/```(\w+)?\n[\s\S]*?```/g, codeSnippet ? '[See code block below]' : '')
      .trim();

    // Extract "Quick Check" question if present
    const quickCheckMatch = cleanContent.match(/\*\*Quick Check\*\*:?\s*(.+?)(?:\n|$)/i);
    const quickCheck = quickCheckMatch ? quickCheckMatch[1].trim() : 'Can you summarize this in your own words?';

    return {
      content: cleanContent || rawText,
      concept: currentTopic,
      codeSnippet,
      breakdown: {
        concept: currentTopic,
        example: `Applied to ${currentTopic} in ${courseName}`,
        commonMistake: 'Review the core definitions before attempting advanced applications.',
        quickCheck
      }
    };
  } catch (error: any) {
    console.warn('[EduNexus AI] Gemini API error, using local fallback:', error?.message || error);
    return localFallback(prompt, currentTopic, courseName);
  }
};
