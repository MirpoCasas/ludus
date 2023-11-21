"use client";

import styles from "@/public/styles/filters.module.scss";
import Image from "next/image";
import navarrow from "@/public/navarrow.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";

export default function Filters() {
  const { width } = useViewportContext();
  const [activeFilters, setActiveFilters] = useState<string[]>([]); 

  //make a function to toggle the filter to class active and add to array of filters to be applied based on the event
  const toggleClass = (event: React.MouseEvent<HTMLElement>) => {
    const filter = event.currentTarget;
    const filterName = filter.textContent || '';
  
    if (activeFilters.includes(filterName)) {
      setActiveFilters(activeFilters.filter(f => f !== filterName));
      filter.classList.remove(styles.active);
    } else {
      setActiveFilters([...activeFilters, filterName]);
      filter.classList.add(styles.active);
    }
  };

  const variantsFiltersMob = {
    close: {
      height: 40,
    },
    open: {
      height: 670,
    },
  };
  const variantsFiltersTab1 = {
    close: {
      height: 60,
    },
    open: {
      height: 260,
    },
  };
  const variantsFiltersTab2 = {
    close: {
      height: 60,
    },
    open: {
      height: 350,
    },
  };
  const variantsFiltersTab3 = {
    close: {
      height: 60,
    },
    open: {
      height: 390,
    },
  };
  const variantsFiltersDesk = {
    close: {
      height: 60,
    },
    open: {
      height: 280,
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
  const [variantsFilters, setVariantsFilters] = useState(variantsFiltersMob);
  const [viewIndex, setViewIndex] = useState(1);

  // switch variants based on viewport width
  useEffect(() => {
    if (width > 1500) {
      setViewIndex(3);
      setVariantsFilters(variantsFiltersDesk);
    } else if (width > 1025) {
      setViewIndex(2);
      setVariantsFilters(variantsFiltersTab1);
    } else if (width > 801) {
      setViewIndex(2);
      setVariantsFilters(variantsFiltersTab2);
    } else if (width > 600) {
      setViewIndex(2);
      setVariantsFilters(variantsFiltersTab3);
    } else {
      setVariantsFilters(variantsFiltersMob);
      setViewIndex(1);
    }
  }, [width ]);

  // Top container to hold the bar in place
  return (
    <div className={styles.filters_cont}>
      <motion.div className={styles.filters_bar} animate={isOpenFilters ? "open" : "close"} variants={variantsFilters} key={viewIndex}>
        <div className={styles.filterbar_top}>
          <p className={styles.activecount}>
            {activeFilters.length}
          </p>
          <button onClick={() => setIsOpenFilters(!isOpenFilters)}>
            <p>FIltros</p>
            <Image src={navarrow} alt="navarrow"></Image>
          </button>
        </div>
        <div className={styles.filters}>
          {filtersArr.map((filter, index) => {
            return (
              <div key={index} className={styles.filter} onClick={toggleClass}>
                <p>{filter}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.filterbar_bot}>
          <button onClick={() => setIsOpenFilters(!isOpenFilters)}>
          Aplicar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
