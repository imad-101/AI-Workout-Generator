import React from "react";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import StaticWorkoutExample from "@/components/Template";
import WorkoutForm from "@/components/Form";
import Testimonials from "@/components/Testemonials";
import FAQSection from "@/components/Faq";
import CTA from "@/components/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <WorkoutForm />
      <HowToUse />
      <StaticWorkoutExample />

      <Testimonials />
      <FAQSection />
      <CTA />
    </>
  );
};

export default Home;
