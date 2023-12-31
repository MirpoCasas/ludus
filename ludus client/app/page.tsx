"use client";

import { PageWrap } from "@/components/pageWrap";
import styles from "./page.module.scss";
import { Azeret_Mono } from "next/font/google";
import Link from "next/link";

const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function Home() {
  return (
    <PageWrap>

    <main className={`${styles.main} ${Azert.className}`}>
      <div className={styles.Intro}>
        <div className={styles.Intro_texts}>
          <h1>LUDUS</h1>
          <p>
            Despacho digital sobre <span>el oficio</span> de la escritura
          </p>
        </div>
        <div className={styles.Intro_navigation}>
          <Link href='/quienes'>.QUÍENES SOMOS</Link>
          <Link href='/quehacemos'>.QUÉ HACEMOS</Link>
          <Link href='/contacto'>.CONTACTO</Link>
        </div>
      </div>
    </main>
    </PageWrap>
  );
}
