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

// Advanced Intelligent Local Simulation (No API Key Required)
export const generateAIResponse = async (
  prompt: string,
  currentTopic: string = 'Computer Networks',
  courseName: string = 'CS302'
): Promise<AIResponsePayload> => {
  // Simulate network delay to mimic real AI processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowerPrompt = prompt.toLowerCase();

  // Knowledge Base Responses
  if (lowerPrompt.includes('osi') || lowerPrompt.includes('layer')) {
    return {
      content: "The **OSI (Open Systems Interconnection) Model** is a conceptual framework used to describe the functions of a networking system. It characterizes computing functions into a universal set of rules and requirements in order to support interoperability between different products and software.\n\nIt consists of 7 layers:\n1. **Physical Layer**: Transmits raw bit stream over the physical medium.\n2. **Data Link Layer**: Defines the format of data on the network (MAC addresses).\n3. **Network Layer**: Decides which physical path the data will take (IP addresses, Routing).\n4. **Transport Layer**: Transmits data using transmission protocols including TCP and UDP.\n5. **Session Layer**: Maintains connections and is responsible for controlling ports and sessions.\n6. **Presentation Layer**: Ensures that data is in a usable format and is where data encryption occurs.\n7. **Application Layer**: Human-computer interaction layer, where applications can access the network services.",
      concept: "OSI Model",
      breakdown: {
        concept: "7 Layers of OSI",
        example: "When you send an email, it starts at the Application layer (Layer 7) and goes down to the Physical layer (Layer 1) before traveling over the wire.",
        commonMistake: "Confusing the Transport Layer (TCP/UDP) with the Network Layer (IP addresses).",
        quickCheck: "Which layer is responsible for logical IP routing?"
      }
    };
  }

  if (lowerPrompt.includes('tcp') || lowerPrompt.includes('udp')) {
    return {
      content: "**TCP (Transmission Control Protocol)** and **UDP (User Datagram Protocol)** are the two most commonly used transport layer protocols.\n\n- **TCP** is connection-oriented, meaning it establishes a connection before sending data. It is highly reliable because it ensures all packets arrive in order without errors (e.g., web browsing, email).\n- **UDP** is connectionless. It just sends packets as fast as possible without checking if they arrived. It's much faster but unreliable (e.g., video streaming, gaming).",
      concept: "TCP vs UDP",
      breakdown: {
        concept: "Transport Protocols",
        example: "Playing a live multiplayer game uses UDP because speed is more important than missing a single frame of data.",
        commonMistake: "Thinking UDP is 'worse' than TCP. UDP is actually preferred for real-time applications where speed is paramount.",
        quickCheck: "Would you use TCP or UDP for a file download where no data can be corrupted?"
      }
    };
  }

  if (lowerPrompt.includes('routing') || lowerPrompt.includes('dijkstra') || lowerPrompt.includes('algorithm')) {
    return {
      content: "**Routing Algorithms** determine the best path for data packets to travel from source to destination.\n\nThere are two main types:\n1. **Link-State (e.g., OSPF)**: Uses Dijkstra's algorithm. Every router builds a complete map of the network and calculates the shortest path independently.\n2. **Distance-Vector (e.g., RIP)**: Uses Bellman-Ford algorithm. Routers only know about their immediate neighbors and share their routing tables iteratively.",
      concept: "Routing Algorithms",
      breakdown: {
        concept: "Network Routing",
        example: "Google Maps uses similar shortest-path algorithms to find the fastest route for your car to avoid traffic.",
        commonMistake: "Confusing Link-State (global knowledge) with Distance-Vector (local neighbor knowledge).",
        quickCheck: "Which algorithm does OSPF use to calculate the shortest path?"
      }
    };
  }

  if (lowerPrompt.includes('normaliz') || lowerPrompt.includes('database') || lowerPrompt.includes('sql') || lowerPrompt.includes('dbms')) {
    return {
      content: "**Database Normalization** is the process of structuring a relational database to reduce data redundancy and improve data integrity.\n\n- **1NF**: Ensures each column contains atomic (indivisible) values.\n- **2NF**: Achieves 1NF and removes partial dependencies (non-prime attributes must depend on the whole candidate key).\n- **3NF**: Achieves 2NF and removes transitive dependencies (non-prime attributes must not depend on other non-prime attributes).",
      concept: "Normalization",
      breakdown: {
        concept: "1NF, 2NF, 3NF",
        example: "If you have a table of Students and their Department Head's Name, moving the Department Head info to a separate 'Departments' table satisfies 3NF.",
        commonMistake: "Stopping at 1NF and ignoring update anomalies that happen when duplicating data.",
        quickCheck: "What type of dependency is removed to reach 3NF?"
      },
      codeSnippet: {
        language: "sql",
        code: "CREATE TABLE Departments (\n  DeptID INT PRIMARY KEY,\n  HeadName VARCHAR(50)\n);\n\nCREATE TABLE Students (\n  StudentID INT PRIMARY KEY,\n  Name VARCHAR(50),\n  DeptID INT FOREIGN KEY REFERENCES Departments(DeptID)\n);"
      }
    };
  }

  if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi ') || lowerPrompt.includes('hey')) {
    return {
      content: "Hello there! I am your AI Study Companion for EduNexus. I am fully operational and ready to assist you with Computer Networks, Databases, Python, or any other academic topic you're studying today. What would you like to learn?",
      concept: "Greeting"
    };
  }

  if (lowerPrompt.includes('python') || lowerPrompt.includes('code') || lowerPrompt.includes('programming')) {
    return {
      content: "Python is a high-level, interpreted programming language known for its readability and versatility. It supports multiple paradigms including procedural, object-oriented, and functional programming.\n\nHere is a quick example of a function that calculates the factorial of a number using recursion.",
      concept: "Python Programming",
      codeSnippet: {
        language: "python",
        code: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n\nprint(factorial(5)) # Output: 120"
      }
    };
  }

  // Dynamic Fallback Generator for any other question
  return {
    content: `That's an excellent question regarding "${prompt}". \n\nIn the context of ${courseName} (${currentTopic}), this concept is fundamental to understanding the broader system architecture. It relies on the core principles we discussed in the previous modules. To truly master this, I recommend reviewing the latest lecture notes provided by your professor and practicing with real-world examples.`,
    concept: "Concept Analysis",
    breakdown: {
      concept: "Targeted Review",
      example: `Applying "${prompt}" to a real-world scenario helps solidify your understanding.`,
      commonMistake: "Overcomplicating the underlying mechanics instead of focusing on the basics.",
      quickCheck: "Can you explain this concept back to me in your own words?"
    }
  };
};
