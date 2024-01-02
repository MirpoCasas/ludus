"use client";

import styles from "@/public/styles/escritura.module.scss";
import { Azeret_Mono } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Filters from "@/components/filters";
import huesero from "@/public/elhuesero.jpeg";
import { useEffect, useState } from "react";
import qs from "qs";
import { PageWrap } from "@/components/pageWrap";
import backarrow from "@/public/backarrow.svg";

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
  const variantsItemEscritura = {
    start: {
      opacity: 1,
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.a href={props.link} className={styles.escritura_item} whileHover="active" initial="start">
      <motion.img src={`http://localhost:1337${props.img}`} alt="item image" variants={variantsItemEscritura}></motion.img>
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

  function filteredSearch() {
    console.log("filtered search");
    console.log(activeFilters);
    const query = qs.stringify(
      {
        filters: {
          id: {
            $in: activeFilters,
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    fetch(`http://localhost:1337/api/escrituras?populate=*&${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    });
  }

  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  return (
    <PageWrap>
      <Link href="/">
        <Image src={backarrow} alt="go back" className={styles.backarrow}></Image>
      </Link>
      <div className={`${Azert.className} ${styles.escritura}`}>
        <h1>Escritura</h1>
        <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} filteredSearch={filteredSearch} />
        <div className={styles.escritura_list}>
          {!loaded && <div className={styles.loader}></div>}

          {loaded &&
            items.map((item: any) => {
              return (
                <ItemEscritura
                  key={item.id}
                  text={item.attributes.Title}
                  img={item.attributes.Image.data ? item.attributes.Image.data.attributes.url : huesero.src}
                  link={`http://localhost:3000/articulo/${item.id}`}
                />
              );
            })}
        </div>
      </div>
    </PageWrap>
  );
}
