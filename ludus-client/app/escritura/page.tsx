"use client";

import styles from "@/public/styles/escritura.module.scss";
import { Azeret_Mono } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import Filters from "@/components/filters";
import { useEffect, useState, useRef } from "react";
import { PageWrap } from "@/components/pageWrap";
import BackButton from "@/components/backButton";
import ItemEscritura  from "./ItemEscritura";

type FilterItem = {
  id: number;
  name: string;
};

const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Escritura() {
  const [items, setItems] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [activeFiltersArr, setActiveFiltersArr] = useState<FilterItem[]>([]);
  const [filtersArr, setFiltersArr] = useState<FilterItem[]>([]);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (items.length > 0) return;
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/escrituras?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data.data);
        setItems(data.data);
        setLoaded(true);
      });
    });
  }, [items]);

  // handle updating possible filters to filterbar
  useEffect(() => {
    function checkFilters() {
      let newSetFilters = filtersArr;
      items.map((item: any) => {
        if (item.attributes.filtros) {
          item.attributes.filtros.data.map((filter: any) => {
            if (!newSetFilters.some((obj) => obj.id === filter.id)) {
              let newItem = { id: filter.id, name: filter.attributes.Nombre };
              newSetFilters.push(newItem);
            }
          });
        }
      });
      setFiltersArr(newSetFilters);
    }
    if (items.length > 0) checkFilters();
  }, [items, filtersArr]);

  useEffect(() => {
    console.log("Active filters", activeFiltersArr);
  }, [activeFiltersArr]);

  return (
    <PageWrap>
      <BackButton href="/quienes" />
      <div className={`${Azert.className} ${styles.escritura}`}>
        <h1>Escritura</h1>
        <Filters activeFilters={activeFiltersArr} setActiveFilters={setActiveFiltersArr} filterData={filtersArr} />

        <div className={styles.escritura_list}>
          {!loaded && <div className={styles.loader}></div>}

          {loaded && (
            <AnimatePresence mode="popLayout">
              {items.map((item: any, i: number) => {
                if (activeFiltersArr.length === 0) {
                  return (
                    <ItemEscritura
                      key={item.id}
                      text={item.attributes.Titulo}
                      date={item.attributes.Fecha}
                      filters={item.attributes.filtros.data}
                      img={item.attributes.Image.data ? item.attributes.Image.data.attributes.url : null}
                      link={`/articulo/${item.id}`}
                      i={i}
                      ref={ref}
                      />
                    );
                  } else if (item.attributes.filtros.data.some((obj: any) => activeFiltersArr.some((obj2: any) => obj2.id === obj.id))) {
                    return (
                      <ItemEscritura
                      key={item.id}
                      ref={ref}
                      text={item.attributes.Titulo}
                      date={item.attributes.Fecha}
                      filters={item.attributes.filtros.data}
                      img={item.attributes.Image.data ? item.attributes.Image.data.attributes.url : null}
                      link={`/articulo/${item.id}`}
                      i={i}
                    />
                  );
                }
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </PageWrap>
  );
}
