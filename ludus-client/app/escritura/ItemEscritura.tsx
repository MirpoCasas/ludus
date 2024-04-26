"use client";
import styles from "@/public/styles/escritura.module.scss";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import React, { Ref } from "react";

type ItemEscrituraProps = {
  text: string;
  date: string;
  filters: object[];
  img: StaticImageData;
  link: string;
  i: number;
  ref: Ref<HTMLAnchorElement>;
};

const ItemEscritura = React.forwardRef(function ItemEscrituraComponent(props: ItemEscrituraProps, ref: Ref<HTMLAnchorElement>) {
  const myLoader = ({ src }: { src: string; }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`;
  };

  return (
    <motion.a href={props.link}
      className={styles.escritura_item}
      layout
      whileHover="active"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, delay: props.i * 0.1 } }}
      exit={{ opacity: 0, scale: 0.9 }}
      ref={ref}
    >
      {props.img && (
        <div className={styles.escritura_item_imgHolder}>
          <Image src={props.img} loader={myLoader} alt="Image" layout="fill" objectFit="cover"></Image>
        </div>
      )}
      <div className={styles.escritura_item_contenido}>
        <h3>{props.text}</h3>
        <div className={styles.escritura_item_low}>
          <p>{props.date}</p>
          <div className={styles.escritura_item_low_tags}>
            {props.filters &&
              props.filters.map((filter: any) => {
                return <p key={filter.id}># {filter.attributes.Nombre}</p>;
              })}
          </div>
        </div>
      </div>
    </motion.a>
  );
});

export default ItemEscritura;