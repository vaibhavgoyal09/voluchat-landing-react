"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    text: string;
    image: string;
    name: string;
    role: string;
  }>;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 rounded-3xl border border-white/40 shadow-premium max-w-xs w-full bg-white/60 backdrop-blur-md hover:bg-white/80 transition-colors duration-300"
                  key={i}
                >
                  <div className="text-slate-700 leading-relaxed font-medium">
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight leading-5 text-slate-900">
                        {name}
                      </div>
                      <div className="leading-5 text-slate-500 tracking-tight text-sm mt-0.5">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
