import Link from "next/link";
import Image from "next/image";
import backarrow from "@/public/backarrow.svg";

import styles from "@/public/styles/backbutton.module.scss";

interface Props {
  href: string;
}

export default function BackButton( props: Props ) {
  return (
  <Link href={props.href}>
    <Image src={backarrow} alt="go back" className={styles.backarrow}></Image>
  </Link>
  );
}