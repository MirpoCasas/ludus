"use client";

import styles from "@/public/styles/escritura.module.scss";
import { Azeret_Mono } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Filters from "@/components/filters";
import huesero from "@/public/elhuesero.jpeg";
import { useEffect, useState } from "react";
const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ItemEscrituraProps = {
  text: string;
  img: StaticImageData;
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
    <motion.a href="" className={styles.escritura_item} whileHover="active" initial="start">
      <motion.img src={props.img.src} alt="item image" variants={variantsItemEscritura}></motion.img>
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

 /* useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (items.length > 0) return;
    fetch("http://localhost:1337/api/escrituras", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        setItems(data.data);
      });
    });
  }, [items]); */

  return (
    <div className={`${Azert.className} ${styles.escritura}`}>
      <h1>Escritura</h1>
      <Filters />
      <div className={styles.escritura_list}>
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
        <ItemEscritura text={"El huesero"} img={huesero} />
      </div>
    </div>
  );
}
