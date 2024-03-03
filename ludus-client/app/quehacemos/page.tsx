"use client";

import styles from "@/public/styles/quehacemos.module.scss";
import { Azeret_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";
import Image from "next/image";
import cross from "@/public/cross.svg";
import { PageWrap } from "@/components/pageWrap";
import Formacion  from "@/components/quehacemos/formacion";
import Produccion from "@/components/quehacemos/produccion";
import BackButton from "@/components/backButton";

const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });


type Variant = {
  [key: number]: {
    height?: number | string;
    width?: number | string;
    top?: number;
    left?: number;
    maxWidth?: string;
    maxHeight?: string;
  };
};


const variantsItemOneMob = {
  1: {
    maxHeight: "500px",
    maxWidth: "100%",
  },
  2: {
    maxHeight: "30000px",
    maxWidth: "100%",
    top: 70,
  },
  3: {
    maxHeight: "30000px",
    maxWidth: "155px",
    top: 0,
    left: 0,
  },
};
const variantsItemTwoMob = {
  1: {
    maxHeight: "500px",
    maxWidth: "100%",
    left: 0,
    top: 325,
  },
  2: {
    maxHeight: "30000px",
    maxWidth: "155px",
    top: 0,
    left: 100,
  },
  3: {
    maxHeight: "30000px",
    maxWidth: "100%",
    top: 70,
    left: 0,
  },
};
const variantsItemOneDesk = {
  1: {
    maxHeight: "30000px",
    maxWidth: "1570px",
  },
  2: {
    top: 70,
    maxWidth: "2070px",
    maxHeight: "40000px",
  },
  3: {
    maxHeight: "40000px",
    maxWidth: "190px",
    top: 0,
    left: 0,
  },
};
const variantsItemTwoDesk = {
  1: {
    maxHeight: "30000px",
    maxWidth: "1570px",
    left: 0,
    top: 250,
  },
  2: {
    maxHeight: "30000px",
    maxWidth: "205px",
    top: 0,
    left: 170,
  },
  3: {
    maxHeight: "30000px",
    maxWidth: "2070px",
    top: 70,
    left: 0,
  },
};

export default function QueHacemos() {
  const [variantsItemTwo, setVariantsItemTwo] = useState<Variant>(variantsItemTwoMob);
  const [variantsItemOne, setVariantsItemOne] = useState<Variant>(variantsItemOneMob);
  const [appStatus, setAppStatus] = useState(1);
  const { width } = useViewportContext();
  const [viewIndex, setViewIndex] = useState(1);

  useEffect(() => {
    if (width > 1500) {
      setViewIndex(3);
      setVariantsItemOne(variantsItemOneDesk);
      setVariantsItemTwo(variantsItemTwoDesk);
    } else if (width > 600) {
      setViewIndex(2);
    } else {
      setViewIndex(1);
      setVariantsItemOne(variantsItemOneMob);
      setVariantsItemTwo(variantsItemTwoMob);
    }
  }, [width]);


  return (
    <PageWrap>
      <BackButton href="/"/>
      <div className={`${styles.quehacemos} ${Azert.className}`}>
        <h1>Qué hacemos</h1>
        <motion.div key={viewIndex} className={styles.que_app} initial="start" animate={`${appStatus}`}>
          <div className={styles.que_app_cont}>
            <Image src={cross} alt="close items" onClick={() => setAppStatus(1)} className={appStatus === 1 ? `${styles.exitcross_inactive}` : `${styles.exitcross_active}`}></Image>
            <motion.div className={`${styles.que_item} ${styles.que_item1}`} variants={variantsItemOne} onClick={() => setAppStatus(2)}>
              <Formacion appStatus={appStatus} />
            </motion.div>
            <motion.div className={`${styles.que_item} ${styles.que_item2}`} variants={variantsItemTwo} onClick={() => setAppStatus(3)}>
              <Produccion appStatus={appStatus} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageWrap>
  );
}
