"use client";

import styles from "@/public/styles/filters.module.scss";
import Image from "next/image";
import navarrow from "@/public/navarrow.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";

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

type FilterData = {
  id: number;
  attributes: {
    Nombre: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type FiltersProps = {
  activeFilters: number[];
  setActiveFilters: React.Dispatch<React.SetStateAction<number[]>>;
  filteredSearch: () => void;
};

export default function Filters(props: FiltersProps) {
  const { width } = useViewportContext();
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [variantsFilters, setVariantsFilters] = useState(variantsFiltersMob);
  const [viewIndex, setViewIndex] = useState(1);
  const [filterData, setFilterData] = useState<null | FilterData[]>(null);

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

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (filterData) return;
    fetch("http://192.168.100.6:1337/api/filtros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        setFilterData(data.data);
      });
    });
  }, [filterData]);

  function handleFilterClick( id: number) {
    if (props.activeFilters.includes(id)) {
      props.setActiveFilters(props.activeFilters.filter((item) => item !== id));
    } else {
      props.setActiveFilters([...props.activeFilters, id]);
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
          {filterData &&
            filterData.map((item) => {
              return (
                <div key={item.id} className={`${styles.filter} ${props.activeFilters.includes(item.id) ? styles.active : ""}`} onClick={() => handleFilterClick(item.id)}>
                  <p>{item.attributes.Nombre}</p>
                </div>
              );
            })}
        </div>
        <div className={styles.filterbar_bot}>
          <button onClick={() => {
            setIsOpenFilters(!isOpenFilters)
            props.filteredSearch()
            }}>Aplicar</button>
        </div>
      </motion.div>
    </div>
  );
}
