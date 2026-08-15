"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Sample placeholder questions — replace with real ones about the two of
// you. `correct` is the index into `options`.
const QUESTIONS = [
  {
    q: "[Sample question — e.g. Where did we first meet?]",
    options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
    correct: 1,
  },
  {
    q: "[Sample question — e.g. What was our first date?]",
    options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
    correct: 0,
  },
  {
    q: "[Sample question — e.g. Where's the ceremony?]",
    options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
    correct: 2,
  },
  {
    q: "[Sample question — e.g. What's the wedding date?]",
    options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
    correct: 3,
  },
  {
    q: "[Sample question — e.g. What's the dress code?]",
    options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
    correct: 1,
  },
];

const LETTERS = ["A", "B", "C", "D"];
const ANSWER_DELAY = 900;

/**
 * A full scored quiz flow — intro screen, question-by-question with a
 * gradient progress bar and instant right/wrong feedback, and a results
 * screen. Matches the reference site's "10 Questions About Our Love
 * Story" quiz (shortened to 5 sample questions here).
 */
export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[index];
  const answeredCount = index + (picked !== null ? 1 : 0);
  const progress = (answeredCount / QUESTIONS.length) * 100;

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i === question.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (index + 1 < QUESTIONS.length) {
        setIndex((v) => v + 1);
        setPicked(null);
      } else {
        setFinished(true);
      }
    }, ANSWER_DELAY);
  }

  function restart() {
    setStarted(false);
    setIndex(0);
    setScore(0);
    setPicked(null);
    setFinished(false);
  }

  if (!started) {
    return (
      <div className="quiz-wrap">
        <div className="quiz-card">
          <div className="eyebrow">THE CHALLENGE</div>
          <h3>{QUESTIONS.length} Questions About Our Love Story</h3>
          <p>
            From how we met to our wedding details — let&apos;s see how much you really know.
            Replace these with real questions about the two of you.
          </p>
          <div className="quiz-stats">
            <div className="quiz-stat">
              <span>{QUESTIONS.length}</span>QUESTIONS
            </div>
            <div className="quiz-stat">
              <span>✦</span>PRIZES
            </div>
            <div className="quiz-stat">
              <span>∞</span>FUN
            </div>
          </div>
          <button className="quiz-start" onClick={() => setStarted(true)}>
            START THE QUIZ
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="quiz-wrap">
        <div className="quiz-card">
          <div className="eyebrow">RESULTS</div>
          <h3>
            You scored {score} / {QUESTIONS.length}
          </h3>
          <p>
            Swap this screen for a submission form if you want to collect guest scores for a
            prize draw.
          </p>
          <button className="quiz-start" onClick={restart}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-wrap">
      <div className="quiz-progress-row">
        <span>
          QUESTION {index + 1} OF {QUESTIONS.length}
        </span>
        <span>
          SCORE: {score}/{answeredCount}
        </span>
      </div>
      <div className="quiz-progress-track">
        <motion.div
          className="quiz-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="quiz-card">
        <div className="eyebrow">QUESTION {index + 1}</div>
        <h3>{question.q}</h3>
        <div className="quiz-options">
          {question.options.map((opt, i) => {
            let state = "";
            if (picked !== null) {
              if (i === question.correct) state = "correct";
              else if (i === picked) state = "wrong";
              else state = "dim";
            }
            return (
              <button key={opt} className={`quiz-option ${state}`} onClick={() => pick(i)}>
                <span className="quiz-letter">{LETTERS[i]}.</span> {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
