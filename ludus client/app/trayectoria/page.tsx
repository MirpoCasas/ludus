import styles from '@/public/styles/trayectoria.module.scss'
import { Azeret_Mono } from "next/font/google";
import Filters from '@/components/filters';
const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Trayectoria() {
  return (
    <div className={`${Azert.className} ${styles.trayectoria}`}>
      <h1>Trayectoria</h1>
      <Filters />
      <div className={styles.trayectoria_items}>
        <div className={styles.trayectoria_item}>
          <h3>Compania, lugar - Titulo o trabajo</h3>
          <p>Mes, año - Mes, año</p>
          <p>Descripcion</p>
          <p>URL</p>
        </div>
        <div className={styles.trayectoria_item}>
          <h3>Compania, lugar - Titulo o trabajo</h3>
          <p>Mes, año - Mes, año</p>
          <p>Descripcion</p>
          <p>URL</p>
        </div>
        <div className={styles.trayectoria_item}>
          <h3>Compania, lugar - Titulo o trabajo</h3>
          <p>Mes, año - Mes, año</p>
          <p>Descripcion</p>
          <p>URL</p>
        </div>
        <div className={styles.trayectoria_item}>
          <h3>Compania, lugar - Titulo o trabajo</h3>
          <p>Mes, año - Mes, año</p>
          <p>Descripcion</p>
          <p>URL</p>
        </div>
        <div className={styles.trayectoria_item}>
          <h3>Compania, lugar - Titulo o trabajo</h3>
          <p>Mes, año - Mes, año</p>
          <p>Descripcion</p>
          <p>URL</p>
        </div>
      </div>
    </div>
  )
}