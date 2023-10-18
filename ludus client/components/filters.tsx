"use client";

import styles from "@/public/styles/filters.module.scss";
import Image from "next/image";
import navarrow from "@/public/navarrow.svg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Filters() {
  const variantsFilters = {
    close: {
      height: 60,
    },
    open: {
      height: 200,
    },
  };

  const filtersArr = [
    "Periodismo",
    "Artes Visuales",
    "TV",
    "Teatro",
    "Ghostwriting",
    "Publicidad",
    "Radio",
    "Educación",
    "Tecnología",
    "Hospitalidad",
    "Poesía",
    "Gaming",
    "Derechos Humanos",
    "Trabajo Académico",
    "Agroindustria",
    "Politica",
    "Narrativa",
    "Retail",
  ];

  const [isOpenFilters, setIsOpenFilters] = useState(false);

  return (
    <div className={styles.filters_cont}>
      <motion.div
        className={styles.filters_bar}
        animate={isOpenFilters ? "open" : "close"}
        variants={variantsFilters}
      >
        <div className={styles.filterbar_top}>
          <button onClick={() => setIsOpenFilters(!isOpenFilters)}>
            <p>FIltros</p>
            <Image src={navarrow} alt="navarrow"></Image>
          </button>
        </div>
        <div className={styles.filters}>
          {filtersArr.map((filter, index) => {
            return (
              <button key={index} className={styles.filter}>
                <p>{filter}</p>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
