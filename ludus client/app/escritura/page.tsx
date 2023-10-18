'use client'

import styles from "@/public/styles/escritura.module.scss";
import { Azeret_Mono } from "next/font/google";
import Image, {StaticImageData} from "next/image";
import {motion} from 'framer-motion';
import Link from "next/link";
import Filters from "@/components/filters";
import huesero from "@/public/elhuesero.jpeg";
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
      opacity: 0,
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  }

  return (
    <motion.a href="" className={styles.escritura_item} whileHover='active' initial='start'>
      <p>{props.text}</p>
       <motion.img src={props.img.src} alt="item image" variants={variantsItemEscritura}></motion.img>
    </motion.a>
  );
}

export default function Escritura() {
  return (
    <div className={`${Azert.className} ${styles.escritura}`}>
      <h1>Escritura</h1>
      <Filters />
      <div className={styles.escritura_list}>
        <ItemEscritura text="El Huesero" img={huesero}/>
        <ItemEscritura text="El Huesero" img={huesero}/>
        <ItemEscritura text="El Huesero" img={huesero}/>
        <ItemEscritura text="El Huesero" img={huesero}/>
        <ItemEscritura text="El Huesero" img={huesero}/>
        <ItemEscritura text="El Huesero" img={huesero}/>
      </div>
    </div>
  );
}
