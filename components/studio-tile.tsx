import type { ComponentType, ReactNode } from "react";
import styles from "./studio-tile.module.css";

type StudioTileProps = {
  label: string;
  title: string;
  copy: ReactNode;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  meta?: string;
  blue?: boolean;
};

export function StudioTile({ label, title, copy, Icon, meta, blue = false }: StudioTileProps) {
  return (
    <article className={`${styles.tile}${blue ? ` ${styles.tileBlue}` : ""}`}>
      <span className={styles.slash} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        {label}
      </span>
      <div className={styles.top}>
        <span className={styles.index}>
          <i className={styles.indexDot} aria-hidden="true" />
          {label}
        </span>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={20} strokeWidth={2.1} />
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.copy}>{copy}</p>
        {meta ? <p className={styles.meta}>{meta}</p> : null}
      </div>
    </article>
  );
}

export const studioTileGridClass = styles.grid;
