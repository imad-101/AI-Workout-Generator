import React from "react";
import Hero from "@/components/Hero";
import HowToUse from "@/components/HowToUse";
import WorkoutPlan from "@/components/Template";
import WorkoutForm from "@/components/Form";
import Testimonials from "@/components/Testemonials";
import CTA from "@/components/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <WorkoutForm />
      <HowToUse />
      <WorkoutPlan />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
