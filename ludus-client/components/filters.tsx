"use client";

import styles from "@/public/styles/filters.module.scss";
import Image from "next/image";
import navarrow from "@/public/navarrow.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";

type FilterVariant = {
  close: {
    maxHeight: string;
  };
  open: {
    maxHeight: string;
  };
};

const variantsFiltersMob = {
  close: {
    maxHeight: '40px',
  },
  open: {
    maxHeight: '670px',
  },
};
const variantsFiltersTab1 = {
  close: {
    maxHeight: '60px',
  },
  open: {
    maxHeight: '260px',
  },
};
const variantsFiltersTab2 = {
  close: {
    maxHeight: '60px',
  },
  open: {
    maxHeight: '350px',
  },
};
const variantsFiltersTab3 = {
  close: {
    maxHeight: '60px',
  },
  open: {
    maxHeight: '390px',
  },
};
const variantsFiltersDesk = {
  close: {
    maxHeight: '60px',
  },
  open: {
    maxHeight: '280px',
  },
};

type FilterItem = {
  id: number;
  name: string;
};

type FiltersProps = {
  activeFilters: FilterItem[];
  setActiveFilters: any;
  filterData: FilterItem[];
};

export default function Filters(props: FiltersProps) {
  const { width } = useViewportContext();
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [variantsFilters, setVariantsFilters] = useState<FilterVariant>(variantsFiltersMob);
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
  }, [width]);

  function handleFilterClick(filter : FilterItem) {
    if (!props.activeFilters.some((obj: any) => obj.id === filter.id)) {
      props.setActiveFilters((prev: any) => [...prev, filter]);
      console.log("Filter added", filter);
    } else {
      props.setActiveFilters((prev: any) => prev.filter((obj: FilterItem) => obj.id !== filter.id));
      console.log("Filter removed", filter);
    }
  }


  // Top container to hold the bar in place
  return (
    <div className={styles.filters_cont}>
      <motion.div className={styles.filters_bar} animate={isOpenFilters ? "open" : "close"} variants={variantsFilters} key={viewIndex}>
        <div className={styles.filterbar_top}>
          <p className={styles.activecount}>{props.activeFilters.length}</p>
          <button onClick={() => setIsOpenFilters(!isOpenFilters)}>
            <p>FIltros</p>
            <Image src={navarrow} alt="navarrow"></Image>
          </button>
        </div>
        <div className={styles.filters}>
          {props.filterData &&
            props.filterData.map((filter) => {
              return (
                <button key={filter.id} className={`${styles.filter} ${props.activeFilters.some(obj => obj.id === filter.id) ? styles.active : ""}`} onClick={() => handleFilterClick(filter)}>
                  <p>{filter.name}</p>
                </button>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
