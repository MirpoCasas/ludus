"use client";

import { PageWrap } from "@/components/pageWrap";
import styles from "./page.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const titles = [
  "el oficio",
  "el negocio",
  "el arte",
  "la generación",
  "el viaje",
  "el error",
  "el esfuerzo",
  "el placer",
  "la fantasía",
  "la rutina",
  "el miedo",
  "la jugada",
  "la movida",
  "el medio",
  "la tramoya",
  "la invención",
  "el tratamiento",
  "la forma",
  "la estafa",
  "la obstinación",
  "el exilio",
  "el universo",
  "la finalidad",
];

export default function Home() {

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === titles.length - 1) {
        setIndex(0);
        return;
      }
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrap>
      <main className={styles.main}>
        <div className={styles.Intro}>
          <div className={styles.Intro_texts}>
            <h1>LUDUS</h1>
            <p>
              Despacho digital sobre
              <span className={styles.title_texts}>
                <AnimatePresence mode="wait">
                  <motion.span key={titles[index]} className={styles.title_texts_item} variants={animationVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 1 }}>
                    {titles[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
              de la escritura
            </p>
          </div>
          <div className={styles.Intro_navigation}>
            <Link href="/quienes">.QUIÉNES SOMOS</Link>
            <Link href="/quehacemos">.QUÉ HACEMOS</Link>
            <Link href="/contacto">.CONTACTO</Link>
          </div>
        </div>
      </main>
    </PageWrap>
  );
}
