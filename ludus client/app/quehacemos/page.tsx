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

const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type ItemProduccionProps = {
  done: boolean;
};

type Variant = {
  [key: number]: {
    height: number | string;
    width?: string;
    top?: number;
    left?: number;
    maxWidth?: string;
    flexDirection?: string;
  };
};

function ItemProduccion(props: any) {
  return (
    <div className={styles.itemproduccion}>
      <h3>Cliente: {props.Cliente}</h3>
      <h3>Producto: {props.Producto}</h3>
      {props.done ? <p>Finalizado</p> : <p>En progreso</p>}
      <p>{props.Descripcion}</p>
      <p>{props.Fecha}</p>
      {props.Activo && <button>Leer Articulo</button>}
    </div>
  );
}

function ItemFormacion(props: any) {
  return (
    <div className={`${styles.formacion_item_active} ${styles.formacion_item}`}>
      <div className={styles.formacion_pic}></div>
      <div className={styles.formacion_item_content}>
        <h3>{props.Titulo}</h3>
        <p>{props.Horario}</p>
        <button>{props.Activo ? "Inscribirme" : "Quisiera saber mas sobre este curso"}</button>
      </div>
    </div>
  );
}

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
    flexDirection: "column",
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
    flexDirection: "column",
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
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [itemsProduccion, setItemsProduccion] = useState<any>([]);
  const [itemsFormacion, setItemsFormacion] = useState<any>([]);
  const [activeFormacion, setActiveFormacion] = useState<any>([]);
  const [inactiveFormacion, setInactiveFormacion] = useState<any>([]);
  const [loadedProduccion, setLoadedProduccion] = useState<boolean>(false);
  const [loadedFormacion, setLoadedFormacion] = useState<boolean>(false);

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

  function handleItemsProduccion(items: any[]) {
    console.log("handleItemsProduccion");

    let activeItems = items.filter((item) => item.attributes.Activo);
    let inactiveItems = items.filter((item) => !item.attributes.Activo);

    console.log("Active Items", activeItems);
    console.log("Inactive Items", inactiveItems);

    setActiveFormacion(activeItems);
    setInactiveFormacion(inactiveItems);
    setLoadedFormacion(true);
  }

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

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (loadedFormacion && loadedProduccion) {
      console.log("Both loaded");
    }
    if (!loadedFormacion) {
      console.log("Calling Formacion");
      fetch("http://localhost:1337/api/formacions?populate=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log("Formacion response", data.data);
          setItemsFormacion(data.data);
        });
      });
    }
    if (!loadedProduccion) {
      console.log("Calling Produccion");

      fetch("http://localhost:1337/api/produccions?populate=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log("Produccion response", data.data);
          handleItemsProduccion(data.data);
        });
      });
    }
    console.log("loadedFormacion", loadedFormacion);
    console.log("loadedProduccion", loadedProduccion);
  }, [loadedFormacion, loadedProduccion]);

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
              <div className={styles.formacion_top}>
                <h3 className={appStatus === 2 ? styles.subtitle_active : styles.subtitle_inactive}>Formación</h3>
                {appStatus === 1 && (
                  <p className={styles.que_item_text}>
                    Si encuentras el corazón de un texto, puedes escribir lo que sea. En Ludus hemos creado contenidos publicitarios, periodísticos, didácticos, narrativos, estratégicos, académicos y
                    críticos para instituciones, empresas y personas. Estamos ansiosos por conocer nuestro próximo desafío.
                  </p>
                )}
              </div>
              <div className={styles.formacion} style={{ display: `${appStatus === 2 ? "flex" : "none"}` }}>
                <h2>En curso</h2>
                {loadedFormacion &&
                  activeFormacion.map((item: any) => {
                    console.log(item.attributes);
                    console.log(item.attributes);
                    return <ItemFormacion key={item.id} {...item.attributes} />;
                  })}
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
              <div className={styles.produccion_top}>
                <h3 className={appStatus === 3 ? styles.subtitle_active : styles.subtitle_inactive}>Producción</h3>
                {appStatus === 1 && (
                  <p className={styles.que_item_text}>
                    Si encuentras el corazón de un texto, puedes escribir lo que sea. En Ludus hemos creado contenidos publicitarios, periodísticos, didácticos, narrativos, estratégicos, académicos y
                    críticos para instituciones, empresas y personas. Estamos ansiosos por conocer nuestro próximo desafío.
                  </p>
                )}
              </div>
              <div className={styles.produccion} style={{ display: `${appStatus === 3 ? "flex" : "none"}` }}>
                <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} filteredSearch={filteredSearch} />
                <div className={styles.produccion_grid}>
                  <ItemProduccion done={false} />
                  <ItemProduccion done={false} />
                  <ItemProduccion done={false} />
                  <ItemProduccion done={true} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageWrap>
  );
}
