"use client";

import styles from "@/public/styles/quehacemos.module.scss";
import { Azeret_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useViewportContext } from "@/public/assets/viewportcontext";
import Image from "next/image";
import Filters from "@/components/filters";
import cross from "@/public/cross.svg";
import qs from "qs";
import Link from "next/link";
import { PageWrap } from "@/components/pageWrap";
import backarrow from "@/public/backarrow.svg";
import Formacion  from "@/components/quehacemos/formacion";
import Produccion from "@/components/quehacemos/produccion";

const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type ItemProduccionProps = {
  done: boolean;
};

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

type Variant = {
  [key: number]: {
    height: number | string;
    width?: string;
    top?: number;
    left?: number;
    maxWidth?: string;
    flexDirection?: FlexDirection;
  };
};


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
    maxWidth: "1570px",
  },
  2: {
    top: 70,
    maxWidth: "1570px",
    height: "fit-content",
    flexDirection: "column" as FlexDirection,
  },
  3: {
    height: "fit-content",
    maxWidth: "205px",
    top: 0,
    left: 0,
  },
};
const variantsItemTwoDesk = {
  1: {
    height: 200,
    maxWidth: "1570px",
    left: 0,
    top: 250,
  },
  2: {
    height: "fit-content",
    maxWidth: "205px",
    top: 0,
    left: 170,
  },
  3: {
    flexDirection: "column" as FlexDirection,
    top: 70,
    left: 0,
    maxWidth: "1570px",
    height: "fit-content",
  },
};

export default function QueHacemos() {
  const [variantsItemTwo, setVariantsItemTwo] = useState<Variant>(variantsItemTwoMob);
  const [variantsItemOne, setVariantsItemOne] = useState<Variant>(variantsItemOneMob);
  const [appStatus, setAppStatus] = useState(1);
  const { width } = useViewportContext();
  const [viewIndex, setViewIndex] = useState(1);

  /*
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
        console.log(data.data);
      });
    });
  }
*/
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
      <Link href="/">
        <Image src={backarrow} alt="go back" className={styles.backarrow}></Image>
      </Link>
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
