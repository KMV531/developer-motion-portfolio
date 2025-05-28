"use client";

import React, { HTMLAttributes, useEffect } from 'react'
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { twMerge } from 'tailwind-merge';
import { motion, usePresence } from 'motion/react';
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation';

const Testimonial = (props: {
                            quote: string;
                            name: string;
                            role: string;
                            company: string;
                            imagePositionY: number;
                            image: string | StaticImport;
                            className?: string;
                    } & HTMLAttributes<HTMLDivElement>) => {

const {quote, name, role, company, imagePositionY, image, className, ...rest} = props;

const { scope: quoteScope, entranceAnimation: quoteEntranceAnimate, exitAnimation: quoteExitAnimation } = useTextRevealAnimation();
const { scope: citeScope, entranceAnimation: citeEntranceAnimate, exitAnimation: citeExitAnimation } = useTextRevealAnimation();
const [isPresent, safeToRemove] = usePresence();

useEffect(() => {
    if (isPresent) {
        quoteEntranceAnimate().then(() => {
            citeEntranceAnimate();
        });
    } else {
        Promise.all([
            quoteExitAnimation(),
            citeExitAnimation()
        ]).then(() => {
            safeToRemove();
        });
    };
    
}, [isPresent, quoteEntranceAnimate, citeEntranceAnimate, quoteExitAnimation, citeExitAnimation, safeToRemove]);

  return (
        <div className={twMerge("grid md:grid-cols-5 md:gap-8 md:items-center lg:gap-16", className)} {...rest}>
            <div className="aspect-square md:col-span-2 md:aspect-[9/16] relative">
                <motion.div
                className="absolute h-full bg-stone-900"
                initial={{width: "100%"}}
                animate={{width: 0}}
                exit={{width: "100%"}}
                transition={{duration: 0.5}}
                >
                </motion.div>
                    <Image src={image} alt={name} className="size-full object-cover" style={{objectPosition: `50% ${imagePositionY * 100}%`}} />
            </div>
            <blockquote className="md:col-span-3">
                <div className="text-3xl mt-8 md:text-5xl md:mt-0 lg:text-6xl" ref={quoteScope}>
                    <span>&ldquo;</span>
                    {quote}
                    <span>&rdquo;</span>
                </div>
                <cite className="mt-4 not-italic block md:mt-8 md:text-lg lg:text-xl" ref={citeScope}>{name}, {role} at {company}</cite>
            </blockquote>
        </div>
  );
}

export default Testimonial
