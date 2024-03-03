import styles from "@/public/styles/quehacemos.module.scss";
import { useState, useEffect } from "react";
import Filters from "../filters";
import { motion, AnimatePresence } from "framer-motion";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

function ItemProduccion(props: any) {
  return (
    <motion.div initial="hidden" animate="visible" exit="exit" transition={{ duration: 1 }} variants={animationVariants} className={styles.itemproduccion} key={props.key}>
      <h3>Cliente: {props.attributes.Cliente}</h3>
      <h3>Producto: {props.attributes.Producto}</h3>
      {props.attributes.Activo ? <p className={styles.produccion_status_on}>Finalizado</p> : <p className={styles.produccion_status_off}>En progreso</p>}
      <p>{props.attributes.Descripcion}</p>
      <p>{props.attributes.Fecha}</p>
      {props.attributes.Activo && <button className={styles.produccion_btn}>Leer Articulo</button>}
    </motion.div>
  );
}

type FilterItem = {
  id: number;
  name: string;
};

export default function Produccion({ appStatus }: any) {
  const [itemsProduccion, setItemsProduccion] = useState([]);
  const [filtersArr, setFiltersArr] = useState<FilterItem[]>([]);
  const [activeFiltersArr, setActiveFiltersArr] = useState<FilterItem[]>([]);

  // Initial Fetch formacion
  useEffect(() => {
    let ignoreOne = false;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!ignoreOne) {
      console.log("Calling Produccion");
      fetch("http://localhost:1337/api/produccions?populate=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log("Produccion response got", data.data);
          setItemsProduccion(data.data);
        });
      });
    }
    return () => {
      ignoreOne = true;
    };
  }, []);

  // handle updating possible filters to filterbar
  useEffect(() => {
    function checkFilters() {
      let newSetFilters = filtersArr;
      itemsProduccion.map((item: any) => {
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
    if (itemsProduccion.length > 0) checkFilters();
  }, [itemsProduccion, filtersArr]);

  useEffect(() => {
    console.log("Active filters", activeFiltersArr);
  }, [activeFiltersArr]);

  return (
    <>
      <div className={styles.produccion_top}>
        <h3 className={appStatus === 3 ? styles.subtitle_active : styles.subtitle_inactive}>Producción</h3>
        {appStatus === 1 && (
          <p className={styles.que_item_text}>
            Si encuentras el corazón de un texto, puedes escribir lo que sea. En Ludus hemos creado contenidos publicitarios, periodísticos, didácticos, narrativos, estratégicos, académicos y críticos
            para instituciones, empresas y personas. Estamos ansiosos por conocer nuestro próximo desafío.
          </p>
        )}
      </div>
      <div className={styles.produccion} style={{ display: `${appStatus === 3 ? "flex" : "none"}` }}>
        <Filters activeFilters={activeFiltersArr} setActiveFilters={setActiveFiltersArr} filterData={filtersArr} />
        <div className={styles.produccion_grid}>
          <AnimatePresence mode="wait" initial={false}>
            {itemsProduccion.map((item: any) => {
              if (activeFiltersArr.length === 0) {
                return <ItemProduccion key={item.id} attributes={item.attributes} />;
              } else if (item.attributes.filtros.data.some((obj: any) => activeFiltersArr.some((obj2: any) => obj2.id === obj.id))) {
                return <ItemProduccion key={item.id} attributes={item.attributes} />;
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
