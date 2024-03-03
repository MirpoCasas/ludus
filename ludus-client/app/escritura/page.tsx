"use client";

import styles from "@/public/styles/escritura.module.scss";
import { Azeret_Mono } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Filters from "@/components/filters";
import { useEffect, useState } from "react";
import { PageWrap } from "@/components/pageWrap";
import BackButton from "@/components/backButton";

type FilterItem = {
  id: number;
  name: string;
};

const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ItemEscrituraProps = {
  text: string;
  img: StaticImageData;
  link: string;
};

function ItemEscritura(props: ItemEscrituraProps) {
  const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`;
  };

  return (
    <motion.a href={props.link} className={styles.escritura_item} whileHover="active" initial="start">
      {props.img && (
        <div className={styles.escritura_item_imgHolder}>
          <Image src={props.img} loader={myLoader} alt="Image" layout="fill"></Image>
        </div>
      )}
      <div className={styles.escritura_item_contenido}>
        <h3>{props.text}</h3>
        <div className={styles.escritura_item_low}>
          <p>11 Dic. 2015</p>
          <div className={styles.escritura_item_low_tags}>
            <p>#TV</p>
            <p>#Comedia</p>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Escritura() {
  const [items, setItems] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [activeFiltersArr, setActiveFiltersArr] = useState<FilterItem[]>([]);
  const [filtersArr, setFiltersArr] = useState<FilterItem[]>([]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (items.length > 0) return;
    fetch("http://localhost:1337/api/escrituras?populate=*", {
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

          {loaded &&
            items.map((item: any) => {
              if (activeFiltersArr.length === 0) {
                return (
                  <ItemEscritura
                    key={item.id}
                    text={item.attributes.Title}
                    img={item.attributes.Image.data ? item.attributes.Image.data.attributes.url : null}
                    link={`http://localhost:3000/articulo/${item.id}`}
                  />
                );
              } else if (
                item.attributes.filtros.data.some((obj: any) => activeFiltersArr.some((obj2: any) => obj2.id === obj.id))) {
                return (
                  <ItemEscritura
                    key={item.id}
                    text={item.attributes.Title}
                    img={item.attributes.Image.data ? item.attributes.Image.data.attributes.url : null}
                    link={`http://localhost:3000/articulo/${item.id}`}
                  />
                );
              }
            })}
        </div>
      </div>
    </PageWrap>
  );
}
