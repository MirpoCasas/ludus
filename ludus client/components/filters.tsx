"use client";

import styles from "@/public/styles/filters.module.scss";
import Image from "next/image";
import navarrow from "@/public/navarrow.svg";
import { motion } from "framer-motion";
import { useState , useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";

export default function Filters() {

  const { width } = useViewportContext();

  const variantsFiltersMob = {
    close: {
      height: 40,
    },
    open: {
      height: 575,
    },
  };
  const variantsFiltersTab = {
    close: {
      height: 60,
    },
    open: {
      height: 330,
    },
  };
  const variantsFiltersDesk = {
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
  const [variantsFilters, setVariantsFilters] = useState(variantsFiltersMob)
  const [viewIndex, setViewIndex] = useState(1)

  useEffect(() => {
    if (width > 1500){
      setViewIndex(3)
      setVariantsFilters(variantsFiltersDesk)
    }else if ( width > 600) {
      setViewIndex(2)
      setVariantsFilters(variantsFiltersTab)
    } else {
      setVariantsFilters(variantsFiltersMob)
      setViewIndex(1)
    }
  

  }, [width])
  

 // Top container to hold the bar in place

  return (
    <div className={styles.filters_cont}>
      <motion.div
        className={styles.filters_bar}
        animate={isOpenFilters ? "open" : "close"}
        variants={variantsFilters}
        key={viewIndex}
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
