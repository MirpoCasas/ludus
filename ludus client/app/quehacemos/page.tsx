"use client";

import styles from "@/public/styles/quehacemos.module.scss";
import { Azeret_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";
import Image from "next/image";
import Filters from "@/components/filters";
import cross from "@/public/cross.svg";

const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type ItemProduccionProps = {
  done: boolean;
};

function ItemProduccion(props: ItemProduccionProps) {
  return (
    <div className={styles.itemproduccion}>
      <h3>Cliente: La noveleria</h3>
      <h3>Producto: Libro Testimonial</h3>
      {props.done ? <p>Finalizado</p> : <p>En progreso</p>}
      
      <p>Olga es una mujer mexicana que recuerda su vida mientras su marido se encuentra gravemente enfermo. En Ludus trabajamos junto a ella y su familia para encontrar los fragmentos literarios y las formas narrativas que representen esta historia de una manera conmovedora y matizada de magia, pensando en los futuros lectores de este título.</p>
      <p>17 dec. 2020</p>
      {props.done &&
      <button>Leer Articulo</button>
      }
    </div>
  );
}

export default function QueHacemos() {
  const variantsItemOneMob = {
    1: {
      height: 200,
      width: "100%",
    },
    2: {
      top: 70,
      width: "100%",
      height: "fit-content",
    },
    3: {
      height: "fit-content",
      width: "fit-content",
      top: 0,
      left: 0,
    },
  };
  const variantsItemTwoMob = {
    1: {
      height: 200,
      width: "100%",
      left: 0,
      top: 250,
    },
    2: {
      height: "fit-content",
      width: "fit-content",
      top: 0,
      left: 100,
    },
    3: {
      top: 70,
      left: 0,
      width: "100%",
      height: "fit-content",
    },
  };
  const variantsItemOneDesk = {
    1: {
      height: 200,
      width: "100%",
    },
    2: {
      top: 70,
      width: "100%",
      height: "fit-content",
    },
    3: {
      height: "fit-content",
      width: "fit-content",
      top: 0,
      left: 0,
    },
  };
  const variantsItemTwoDesk = {
    1: {
      height: 200,
      width: "100%",
      left: 0,
      top: 250,
    },
    2: {
      height: "fit-content",
      width: "fit-content",
      top: 0,
      left: 170,
    },
    3: {
      top: 70,
      left: 0,
      width: "100%",
      height: "fit-content",
    },
  };

  const [variantsItemTwo, setVariantsItemTwo] = useState(variantsItemTwoMob);
  const [variantsItemOne, setVariantsItemOne] = useState(variantsItemOneMob);
  const [appStatus, setAppStatus] = useState(1);
  const { width } = useViewportContext();
  const [viewIndex, setViewIndex] = useState(1)

  useEffect(() => {
    if (width > 1500){
      setViewIndex(3)
      setVariantsItemOne(variantsItemOneDesk);
      setVariantsItemTwo(variantsItemTwoDesk);
    }else if ( width > 600) {
      setViewIndex(2)
    } else {
      setViewIndex(1)
      setVariantsItemOne(variantsItemOneMob);
      setVariantsItemTwo(variantsItemTwoMob);
    }
  }, [width])


  return (
    <div className={`${styles.quehacemos} ${Azert.className}`}>
      <h1>Que hacemos</h1>
      <motion.div key={viewIndex} className={styles.que_app} initial="start" animate={`${appStatus}`}>
        <div className={styles.que_app_cont}>
          <Image src={cross} alt="close items" onClick={() => setAppStatus(1)} className={appStatus === 1 ? `${styles.exitcross_inactive}` : `${styles.exitcross_active}`}></Image>
          <motion.div className={`${styles.que_item} ${styles.que_item1}`} variants={variantsItemOne} onClick={() => setAppStatus(2)}>
            <h3 className={appStatus === 2 ? styles.subtitle_active : styles.subtitle_inactive}>Formacion</h3>
            <div className={styles.formacion} style={{ display: `${appStatus === 2 ? "flex" : "none"}` }}>
              <h2>En curso</h2>
              <div className={`${styles.formacion_item_active} ${styles.formacion_item}`}>
                <div className={styles.formacion_pic}></div>
                <div className={styles.formacion_item_content}>
                  <h3>Taller de Poesia contemporanea Roma Norte</h3>
                  <p>Lunes 19hs precencial</p>
                  <button>Inscribirme</button>
                </div>
              </div>
              <h2>Finalizados</h2>
              <div className={`${styles.formacion_item_inactive} ${styles.formacion_item}`}>
                <div className={styles.formacion_pic}></div>
                <div className={styles.formacion_item_content}>
                  <h3>Taller de Poesia contemporanea Roma Norte</h3>
                  <p>Lunes 19hs precencial</p>
                  <button>Quisiera saber mas sobre este curso</button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className={`${styles.que_item} ${styles.que_item2}`} variants={variantsItemTwo} onClick={() => setAppStatus(3)}>
            <h3 className={appStatus === 3 ? styles.subtitle_active : styles.subtitle_inactive}>Produccion</h3>
            <div className={styles.produccion} style={{ display: `${appStatus === 3 ? "flex" : "none"}`}}>
              <Filters />
              <div className={styles.produccion_grid} >
                <ItemProduccion done={false}/>
                <ItemProduccion done={false}/>
                <ItemProduccion done={false}/>
                <ItemProduccion done={true}/>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
