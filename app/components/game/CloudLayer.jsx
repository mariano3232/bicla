"use client";

import { useEffect, useRef } from "react";

import {
  START_RIGHT,
  cloudSpawnGapPx,
  cloudTopPx,
  defaultCloudSpeed,
  pickCloudType,
} from "./clouds";
import styles from "./cloudLayer.module.css";

/**
 * @param {{ active?: boolean, className?: string, getSpeed?: () => number }} props
 */
export default function CloudLayer({ active = true, className = "", getSpeed }) {
  const containerRef = useRef(null);
  const cloudsRef = useRef(null);
  const getSpeedRef = useRef(getSpeed);
  getSpeedRef.current = getSpeed;

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    const cloudRoot = cloudsRef.current;
    if (!container || !cloudRoot) return;

    const clouds = [];
    let nextCloudGap = 120;
    let frame = 0;
    let last = performance.now();

    const spawnCloud = () => {
      const type = pickCloudType();
      const fieldH = container.clientHeight || 200;
      const scale = fieldH < 170 ? 0.65 : 1;
      const sized = { ...type, w: type.w * scale, h: type.h * scale };
      const el = document.createElement("div");
      el.className = styles.cloud;
      el.style.width = `${sized.w}px`;
      el.style.height = `${sized.h}px`;
      el.style.backgroundImage = `url(${type.src})`;
      el.style.top = `${cloudTopPx(sized, Math.max(8, fieldH * 0.38))}px`;
      el.style.right = `${START_RIGHT}px`;
      cloudRoot.appendChild(el);
      clouds.push({ el, right: START_RIGHT, w: sized.w });
    };

    const tick = (now) => {
      const dt = now - last;
      last = now;

      const cloudSpeed =
        getSpeedRef.current?.() ?? defaultCloudSpeed(container.clientWidth);

      const newestCloud = clouds[clouds.length - 1];
      if (!newestCloud || newestCloud.right > nextCloudGap) {
        spawnCloud();
        nextCloudGap = cloudSpawnGapPx();
      }

      for (let i = clouds.length - 1; i >= 0; i--) {
        const cloud = clouds[i];
        cloud.right += cloudSpeed * dt;
        cloud.el.style.right = `${cloud.right}px`;

        if (cloud.right >= container.clientWidth + cloud.w) {
          cloud.el.remove();
          clouds.splice(i, 1);
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      cloudRoot.replaceChildren();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.layer} ${className}`.trim()}
      aria-hidden="true"
    >
      <div className={styles.clouds} ref={cloudsRef} />
    </div>
  );
}
