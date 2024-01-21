import styles from "@/public/styles/quehacemos.module.scss";
import { useState, useEffect } from "react";


function ItemProduccion(props: any) {
  return (
    <div className={styles.itemproduccion}>
      <h3>Cliente: {props.attributes.Cliente}</h3>
      <h3>Producto: {props.attributes.Producto}</h3>
      {props.attributes.Activo ? <p className={styles.produccion_status_on}>Finalizado</p> : <p className={styles.produccion_status_off}>En progreso</p>}
      <p>{props.attributes.Descripcion}</p>
      <p>{props.attributes.Fecha}</p>
      {props.attributes.Activo && <button className={styles.produccion_btn}>Leer Articulo</button>}
    </div>
  );
}


export default function Produccion({ appStatus }: any) {
    const [itemsProduccion, setItemsProduccion] = useState([]);

    // Fetch formacion
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
        <div className={styles.produccion_grid}>
          {itemsProduccion.map((item: any) => {
            return <ItemProduccion key={item.id} attributes={item.attributes} />;
          })}
        </div>
      </div>
    </>
  );
}
