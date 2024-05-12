import { useEffect, useState } from "react";
import styles from "@/public/styles/recommended.module.scss";
import Image from "next/image";
import cross from "@/public/cross.svg";
import navarrow from "@/public/navarrow.svg";
import {motion} from "framer-motion";

function RecommendedCard({title}) {
  return (
    <div className={styles.Recommended_card}>
      <h3>{title}</h3>
    </div>
  );
}

export default function Recommended() {
  const [recommended, setRecommended] = useState([]);
  async function getRecommended() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    let results = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/escrituras?filters[Destacado][$eq]=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await results.json();
    console.log(data.data);
    setRecommended(data.data);
  }


  useEffect(() => {
    getRecommended();
  }, []);

  return (
    <div className={styles.Recommended}>
      <div className={styles.Recommended_topbar}>
        <div className={styles.Recommended_topbar_deco}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <button className={styles.Recommended_topbar_button}>
          <Image src={cross} alt="close" />
        </button>
      </div>
      <div className={styles.Recommended_content}>
        <h2>Recommended</h2>
        <div className={styles.Recommended_holder}>
          <div className={styles.Recommended_grid}>
            {recommended.map((item) => (
              <RecommendedCard key={item.id} title={item.attributes.Titulo} />
            ))}
          </div>
          <Image
            src={navarrow}
            alt="nav arrow"
            className={styles.Recommended_navArrow}
          />
        </div>
      </div>
    </div>
  );
}
