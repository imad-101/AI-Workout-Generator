import React from "react";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import WorkoutPlan from "@/components/Template";
import WorkoutForm from "@/components/Form";
import Testimonials from "@/components/Testemonials";
import FAQSection from "@/components/Faq";
import CTA from "@/components/CTA";
// import { WorkoutPlanResult } from "@/components/DisplayResults";

const Home = () => {
  return (
    <>
      <Hero />
      <WorkoutForm />
      <HowToUse />
      <WorkoutPlan />
      {/* <WorkoutPlanResult plan=""  /> */}
      <Testimonials />
      <FAQSection />
      <CTA />
    </>
  );
};

export default Home;
