import { useEffect, useState } from "react";
import styles from "@/public/styles/recommended.module.scss";
import Image from "next/image";
import cross from "@/public/cross.svg";
import navarrow from "@/public/navarrow.svg";
import { motion } from "framer-motion";
import { initialize } from "next/dist/server/lib/render-server";
import Link from "next/link";

interface RecommendedItem {
  id: string;
  attributes: {
    Titulo: string;
    Colaboradores: object;
    Subtitulo: string | null;
    Fecha: string;
    Destacado: boolean;
    publishedAt: string;
    updatedAt: string;
    Image: {
      url: string;
    };
  };
}

const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`;
};

function RecommendedCard({ title, id }: { title: string; id: string }) {
  return (
    <div className={styles.Recommended_card}>
      <h3>{title}</h3>
      <Link href={`/articulo/${id}`}>
        <button>Leer</button>
      </Link>
    </div>
  );
}

export default function Recommended() {
  const [recommended, setRecommended] = useState<RecommendedItem[] | null>(
    null
  );
  const [animationState, setAnimationState] = useState("0");
  const [isOpen, setIsOpen] = useState("closed");

  async function getRecommended() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    let results = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/escrituras?filters[Destacado][$eq]=true&populate[Image][fields][0]=url`,
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

  const tabVariants = {
    open: {
      y: +370,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  function handleTabClick() {
    if (isOpen === "open") {
      setIsOpen("closed");
    } else {
      setIsOpen("open");
    }
  }

  useEffect(() => {
    getRecommended();
  }, []);

  const contVariants = {
    "0": {
      x: 0,
    },
    "1": {
      x: -385,
    },
    "2": {
      x: -770,
    },
    "3": {
      x: -1155,
    },
    "4": {
      x: -1540,
    },
    "5": {
      x: -1925,
    },
  };

  function handleLeft() {
    if (recommended === null) {
      return;
    }
    let current = Number(animationState);
    if (current === 0) {
      return;
    } else {
      setAnimationState(String(current - 1));
    }
  }

  function handleRight() {
    if (recommended === null) {
      return;
    }
    let current = Number(animationState);
    if (current === recommended.length - 1) {
      return;
    } else {
      setAnimationState(String(current + 1));
    }
  }

  return (
    <motion.div
      className={styles.Recommended}
      variants={tabVariants}
      initial="open"
      animate={isOpen}
    >
      <div className={styles.Recommended_topbar} onClick={handleTabClick}>
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
        <h2>Articulos recomendados:</h2>
        <div className={styles.Recommended_holder}>
          {Number(animationState) != 0 && (
            <Image
              src={navarrow}
              alt="nav arrow"
              className={styles.Recommended_navArrow_left}
              onClick={handleLeft}
            />
          )}
          <motion.div
            className={styles.Recommended_grid}
            variants={contVariants}
            initial={"0"}
            animate={animationState}
          >
            {recommended &&
              recommended.map((item) => (
                <RecommendedCard
                  key={item.id}
                  title={item.attributes.Titulo}
                  id={item.id}
                />
              ))}
          </motion.div>
          <Image
            src={navarrow}
            alt="nav arrow"
            className={styles.Recommended_navArrow_right}
            onClick={handleRight}
          />
        </div>
      </div>
    </motion.div>
  );
}
