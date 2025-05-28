"use client";

import { FC, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";

const Intro: FC = () => {

 const sectionRef = useRef<HTMLElement>(null);
 const { scope, entranceAnimation } = useTextRevealAnimation();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      entranceAnimation();
    }
  }, [inView, entranceAnimation]);

  return (
    <section className="py-24 mt-12 md:py-32 md:mt-16 lg:py-40 lg:mt-20" id="intro" ref={sectionRef}>
      <div className="container">
        <h2 className="text-4xl md:text-7xl lg:w-[80%] lg:text-8xl" ref={scope}>
          Building beautiful websites with clean code and thoughtful designs to help
          your business grow and stand out online.
        </h2>
      </div>
    </section>
  );
};

export default Intro;