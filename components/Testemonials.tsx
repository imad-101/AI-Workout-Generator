"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CrossFit Athlete",
    text: "The AI’s ability to adapt to my recovery days while pushing my limits is game-changing. It’s like having a coach who never sleeps.",
    x: "5%",
    y: "10%",
    rotate: -3,
  },
  {
    name: "Lila Chen",
    role: "Physical Therapist",
    text: "Finally, an AI that understands proper form progression. My patients get safer, more effective workouts.",
    x: "50%",
    y: "30%",
    rotate: 2,
  },
  {
    name: "Marcus Boone",
    role: "Bodybuilder",
    text: "The precision in tracking muscle group recovery is unbelievable. My gains have never been more consistent.",
    x: "25%",
    y: "55%",
    rotate: -1,
  },
  {
    name: "Priya Patel",
    role: "Dance Instructor",
    text: "Merges creativity with science perfectly. The fluid movement sequences feel almost human-designed.",
    x: "70%",
    y: "70%",
    rotate: 4,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={ref}
      className="relative bg-gray-900 overflow-hidden isolate pb-16 sm:mt-0 mt-16 md:pb-40 md:mb-24"
    >
      {/* Top Gradient */}
      <div className="absolute top-0 w-full h-12 z-30" />

      {/* Mobile Layout */}
      <div className="md:hidden container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-3xl font-bold text-gray-100 mb-8 text-center"
        >
          Voices of Progress
        </motion.h2>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: index * 0.15,
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              <Card className="bg-gray-800/95 shadow-lg border border-gray-700 rounded-xl">
                <CardHeader className="flex flex-row items-center gap-4 px-5 pt-5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-teal-400/30 to-emerald-500/30 blur-md" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-green-200/90">
                      {testimonial.role}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="text-gray-300 text-[15px] leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative h-[80vh] min-h-[600px]">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{ translateY }}
              className="absolute inset-0 opacity-20"
            />
          </div>
          <div className="relative z-10 container px-4 mx-auto h-full flex flex-col items-center justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "0px 0px -200px 0px" }}
              className="text-4xl md:text-5xl font-bold text-gray-100 mb-10 text-center"
            >
              Voices of Progress
            </motion.h2>
            <div className="relative w-full h-[60vh]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.85, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, zIndex: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    delay: index * 0.1,
                  }}
                  style={{
                    position: "absolute",
                    left: testimonial.x,
                    top: testimonial.y,
                    rotate: testimonial.rotate + "deg",
                  }}
                  className="origin-center"
                  viewport={{ margin: "200px" }}
                >
                  <Card className="bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg w-[280px] lg:w-[300px] transition-colors hover:bg-gray-800">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="relative mt-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500" />
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-teal-400/30 to-emerald-500/30 blur-md" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-green-200/90">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed text-[15px]">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-gray-900 to-transparent z-30" />
    </section>
  );
}
