import { useState, useEffect, use } from "react";
import styles from "@/public/styles/quehacemos.module.scss";
import Image from "next/image";

function ItemFormacion(props: any) {
  const myLoader = ({ src, width }: { src: string, width : number }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}?w${width}`;
  };

  return (
    <div className={props.attributes.Activo ? `${styles.formacion_item_active} ${styles.formacion_item}` : `${styles.formacion_item_inactive} ${styles.formacion_item}`}>
      <div className={styles.formacion_pic}>
      <Image loader={myLoader} src={props.attributes.Foto.data.attributes.url} fill sizes="280px" alt=""></Image>
      </div>
      <div className={styles.formacion_item_content}>
        <h3>{props.attributes.Titulo}</h3>
        <p>{props.attributes.Horario}</p>
        <button className={styles.formacion_button}>{props.attributes.Activo ? "Inscribirme" : "Quisiera saber mas sobre este curso"}</button>
      </div>
    </div>
  );
}

export default function Formacion({ appStatus }: any) {
  const [activeFormacion, setActiveFormacion] = useState([]);
  const [inactiveFormacion, setInactiveFormacion] = useState([]);
  const [itemsFormacion, setItemsFormacion] = useState([]);

  // i need a useeffect that, on change of itemsformacion, sets activeformacion and inactiveformacion based on attributes.activo
  useEffect(() => {

    if (itemsFormacion.length > 0) {
      console.log("Items formacion changed");
      const active = itemsFormacion.filter((item: any) => item.attributes.Activo);
      const inactive = itemsFormacion.filter((item: any) => !item.attributes.Activo);
      setActiveFormacion(active);
      setInactiveFormacion(inactive);
    }
  }, [itemsFormacion]);

  // Fetch formacion
  useEffect(() => {
    let ignoreOne = false;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!ignoreOne) {
      console.log("Calling Formacion");
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/formacions?populate=*`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log("Formacion response got", data.data);
          setItemsFormacion(data.data);
        });
      });
    }
    return () => {
      ignoreOne = true;
    };
  }, []);

  //see what filters are applicable

  return (
    <>
      <div className={styles.formacion_top}>
        <h3 className={appStatus === 2 ? styles.subtitle_active : styles.subtitle_inactive}>Formación</h3>
        {appStatus === 1 && (
          <p className={styles.que_item_text}>
            Si encuentras el corazón de un texto, puedes escribir lo que sea. En Ludus hemos creado contenidos publicitarios, periodísticos, didácticos, narrativos, estratégicos, académicos y críticos
            para instituciones, empresas y personas. Estamos ansiosos por conocer nuestro próximo desafío.
          </p>
        )}
      </div>
      <div className={styles.formacion} style={{ display: `${appStatus === 2 ? "flex" : "none"}` }}>
        <h2>En curso</h2>
        {activeFormacion.length > 0 &&
          activeFormacion.map((item: any) => {
            return <ItemFormacion key={item.id} attributes={item.attributes} />;
          })}
        <h2>Finalizados</h2>
        {inactiveFormacion.length > 0 &&
          inactiveFormacion.map((item: any) => {
            return <ItemFormacion key={item.id} attributes={item.attributes} />;
          })}
      </div>
    </>
  );
}
