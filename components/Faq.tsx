import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8  text-white ">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">
          Frequently Asked <span className="text-pink-500">Questions</span>
        </h2>
        <p className="text-gray-400">
          Everything you need to know about our AI Workout Generator
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={`faq-${index}`}
            value={`item-${index + 1}`}
            className="border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg shadow-pink-500/20"
          >
            <AccordionTrigger className="px-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-xl text-left font-medium text-white group transition-all duration-300 hover:bg-gray-800 data-[state=open]:rounded-b-none hover:no-underline">
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/10 text-pink-500 mr-4">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>
                <span className="text-lg">{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-5 text-gray-300 border-t border-gray-700/30 bg-gradient-to-b from-gray-800/70 to-gray-800/30 rounded-b-xl text-base leading-relaxed">
              {faq.answer}
              {faq.cta && (
                <div className="mt-3 pt-3 border-t border-gray-700/30">
                  <a
                    href={faq.cta.link}
                    className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    {faq.cta.text}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-5">Still have questions?</p>
        <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-medium rounded-xl transition-all duration-300 inline-flex items-center shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 transform hover:-translate-y-1">
          Contact Support
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// FAQ data
const faqs = [
  {
    question: "How does the AI workout generator work?",
    answer:
      "Our AI workout generator uses advanced machine learning algorithms to analyze your fitness goals, experience level, available equipment, and time constraints. It then creates personalized workout routines optimized for your specific needs and preferences, ensuring you get the most effective workout possible.",
    cta: {
      text: "See how it works",
      link: "#how-it-works",
    },
  },
  {
    question: "Is this service really free?",
    answer:
      "Yes! The basic version of our AI workout generator is completely free to use. We also offer a premium subscription with additional features like workout history tracking, progress analytics, and video demonstrations for each exercise. Our goal is to make fitness accessible to everyone.",
  },
  {
    question: "Can I customize the generated workouts?",
    answer:
      "Absolutely! After your workout plan is generated, you can modify any aspect of it. You can swap exercises, adjust sets and reps, change rest periods, or even remove exercises completely. Our AI will adapt and optimize the remaining workout to maintain balance and effectiveness.",
  },
  {
    question: "Do I need special equipment for these workouts?",
    answer:
      "Not necessarily! When generating your workout, you can specify what equipment you have access to. Our AI can create effective workouts using only bodyweight exercises, minimal equipment like resistance bands or dumbbells, or full gym setups. Just tell us what you have, and we'll work with it.",
  },
  {
    question: "How often should I generate a new workout?",
    answer:
      "For optimal results, we recommend following a generated workout plan for 4-6 weeks before creating a new one. This gives your body enough time to adapt and progress. However, you can generate new workouts anytime you feel bored or plateaued with your current routine.",
  },
];

export default FAQSection;
