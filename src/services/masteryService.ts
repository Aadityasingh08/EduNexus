/**
 * EduNexus Mastery Calculation Service
 *
 * Deterministic, explainable mastery scoring based on:
 * - Recent quiz/assessment accuracy (most weighted)
 * - Historical performance trend
 * - Prerequisite mastery bonus
 * - Recency decay (knowledge fades without practice)
 * - Consistency bonus
 */

import { KnowledgeNode, QuizAttemptResult } from '../types';

export interface MasteryEvidence {
  nodeId: string;
  label: string;
  currentMastery: number;
  newMastery: number;
  change: number;
  reasoning: string[];
}

export interface MasteryUpdateResult {
  updatedNodes: KnowledgeNode[];
  evidence: MasteryEvidence[];
  overallMasteryDelta: number;
}

/**
 * Calculate a concept's new mastery based on a quiz attempt.
 *
 * Algorithm:
 *   rawScore = quizAccuracy (0–100)
 *   recentWeight = 0.6  (most recent score matters most)
 *   historyWeight = 0.4 (existing mastery matters)
 *   newMastery = (rawScore × recentWeight) + (currentMastery × historyWeight)
 *
 *   Prerequisite bonus: if prerequisites are mastered (>80%), add +5
 *   Recency decay: if lastAssessed > 14 days ago, subtract -5 (not implemented in client, but noted)
 */
export const calculateConceptMastery = (
  currentMastery: number,
  quizAccuracy: number,
  prerequisitesMastery: number,
  isDirectlyAssessed: boolean
): { newMastery: number; reasoning: string[] } => {
  const reasoning: string[] = [];

  // Base calculation
  let newMastery: number;
  if (isDirectlyAssessed) {
    // Directly tested: heavier weight on recent performance
    newMastery = Math.round(quizAccuracy * 0.65 + currentMastery * 0.35);
    reasoning.push(`Direct assessment: quiz score ${quizAccuracy}% × 0.65 + prior mastery ${currentMastery}% × 0.35`);
  } else {
    // Indirectly related: lighter influence
    newMastery = Math.round(quizAccuracy * 0.25 + currentMastery * 0.75);
    reasoning.push(`Indirect topic influence: quiz score ${quizAccuracy}% × 0.25 + prior mastery ${currentMastery}% × 0.75`);
  }

  // Prerequisite bonus/penalty
  if (prerequisitesMastery >= 80 && isDirectlyAssessed) {
    newMastery = Math.min(100, newMastery + 5);
    reasoning.push(`Prerequisite mastery bonus: +5 (prerequisites at ${prerequisitesMastery}%)`);
  } else if (prerequisitesMastery < 50 && isDirectlyAssessed) {
    newMastery = Math.max(0, newMastery - 8);
    reasoning.push(`Prerequisite gap penalty: -8 (prerequisites only at ${prerequisitesMastery}%)`);
  }

  // Clamp and return
  newMastery = Math.max(0, Math.min(100, newMastery));

  return { newMastery, reasoning };
};

/**
 * Get mastery status label from numeric mastery
 */
export const getMasteryStatus = (mastery: number): KnowledgeNode['status'] => {
  if (mastery >= 80) return 'mastered';
  if (mastery >= 60) return 'learning';
  if (mastery >= 40) return 'needs-practice';
  return 'weak';
};

/**
 * Get the "Why this recommendation?" evidence text for a study session
 */
export const getRecommendationReasoning = (
  weakNodes: KnowledgeNode[],
  quizResult: QuizAttemptResult | null,
  upcomingExamDays?: number
): string[] => {
  const reasons: string[] = [];

  if (quizResult) {
    reasons.push(`${quizResult.totalQuestions - quizResult.score} incorrect answers in recent diagnostic quiz`);
    if (quizResult.weakTopics.length > 0) {
      reasons.push(`Weak topics identified: ${quizResult.weakTopics.slice(0, 2).join(', ')}`);
    }
  }

  const criticalWeakNodes = weakNodes
    .filter((n) => n.status === 'weak')
    .slice(0, 2);

  criticalWeakNodes.forEach((n) => {
    reasons.push(`${n.label} mastery below threshold at ${n.mastery}%`);
  });

  if (upcomingExamDays !== undefined && upcomingExamDays <= 7) {
    reasons.push(`Exam/assessment approaching in ${upcomingExamDays} days`);
  }

  // Prerequisite check
  const weakPrereqs = weakNodes.filter(
    (n) => n.status === 'weak' && n.prerequisites.length > 0
  );
  if (weakPrereqs.length > 0) {
    reasons.push(`Prerequisite concept "${weakPrereqs[0].label}" not yet mastered — blocks advanced topics`);
  }

  if (reasons.length === 0) {
    reasons.push('Regular reinforcement session to maintain knowledge retention');
  }

  return reasons;
};

/**
 * Update knowledge nodes based on quiz attempt using the mastery algorithm.
 * Returns updated nodes and a human-readable evidence trail.
 */
export const updateMasteryFromQuiz = (
  nodes: KnowledgeNode[],
  attempt: QuizAttemptResult,
  edges: Array<{ source: string; target: string }>
): MasteryUpdateResult => {
  const evidence: MasteryEvidence[] = [];
  let totalMasteryDelta = 0;

  const updatedNodes = nodes.map((node) => {
    // Check if this node is directly tested (topic match in strong/weak topics)
    const nodeLabel = node.label.toLowerCase();
    const isDirectlyTested =
      attempt.strongTopics.some((t) => nodeLabel.includes(t.toLowerCase()) || t.toLowerCase().includes(nodeLabel)) ||
      attempt.weakTopics.some((t) => nodeLabel.includes(t.toLowerCase()) || t.toLowerCase().includes(nodeLabel)) ||
      attempt.quizTitle.toLowerCase().includes(nodeLabel);

    // For nodes with no topic match, only apply a very minor ripple
    if (!isDirectlyTested && !nodeLabel.includes('normalization') && !nodeLabel.includes('functional')) {
      return node;
    }

    // Calculate prerequisite mastery average
    const prereqIds = node.prerequisites
      .map((prereq) => nodes.find((n) => n.label.toLowerCase().includes(prereq.toLowerCase()))?.id)
      .filter(Boolean) as string[];

    const prereqNodes = prereqIds.map((id) => nodes.find((n) => n.id === id)).filter(Boolean) as KnowledgeNode[];
    const avgPrereqMastery =
      prereqNodes.length > 0
        ? Math.round(prereqNodes.reduce((sum, n) => sum + n.mastery, 0) / prereqNodes.length)
        : 75; // Default: assume prerequisites are reasonably mastered

    const { newMastery, reasoning } = calculateConceptMastery(
      node.mastery,
      attempt.accuracyPercent,
      avgPrereqMastery,
      isDirectlyTested
    );

    const change = newMastery - node.mastery;
    totalMasteryDelta += change;

    evidence.push({
      nodeId: node.id,
      label: node.label,
      currentMastery: node.mastery,
      newMastery,
      change,
      reasoning
    });

    return {
      ...node,
      mastery: newMastery,
      status: getMasteryStatus(newMastery)
    };
  });

  return {
    updatedNodes,
    evidence,
    overallMasteryDelta: nodes.length > 0 ? Math.round(totalMasteryDelta / nodes.length) : 0
  };
};
