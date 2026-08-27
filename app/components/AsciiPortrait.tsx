"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";
import styles from "./AsciiPortrait.module.css";

const SOURCE = "/amal-portrait-ascii.jpg";
const GLYPHS = " .:-=+*#%@";
const SCATTER_RAW_START = 0.025;
const SCATTER_RAW_END = 0.525;
const TRAJECTORY_LOCK_RAW_PROGRESS = 0.231;
const TRAJECTORY_LOCK_LINEAR =
  (TRAJECTORY_LOCK_RAW_PROGRESS - SCATTER_RAW_START) /
  (SCATTER_RAW_END - SCATTER_RAW_START);
const TRAJECTORY_LOCK_PROGRESS =
  TRAJECTORY_LOCK_LINEAR *
  TRAJECTORY_LOCK_LINEAR *
  (3 - 2 * TRAJECTORY_LOCK_LINEAR);
const TRAJECTORY_LOCK_ARC = Math.sin(TRAJECTORY_LOCK_PROGRESS * Math.PI);
const TRAJECTORY_LOCK_REMAINDER = 1 - TRAJECTORY_LOCK_PROGRESS;
const subscribeToClient = () => () => {};

export type AboutFigureProgress = {
  clipBottom: number;
  clipTop: number;
  exit: number;
  surface: number;
  waveOne: number;
  waveTwo: number;
  waveThree: number;
};

type AboutParticle = {
  darkness: number;
  glyphIndex: number;
  phase: 0 | 1 | 2;
  seedA: number;
  seedB: number;
  seedC: number;
  seedD: number;
  targetX: number;
  targetY: number;
};

type Sample = {
  column: number;
  continuationDirectionX: number;
  continuationDirectionY: number;
  continuationDistance: number;
  continuationInitialRate: number;
  continuesAfterLock: boolean;
  darkness: number;
  glyphIndex: number;
  lockOffsetX: number;
  lockOffsetY: number;
  row: number;
  scatterCurveX: number;
  scatterCurveY: number;
  scatterX: number;
  scatterY: number;
};

const getSamplePosition = (
  sample: Sample,
  progress: number,
  baseX: number,
  baseY: number,
) => {
  if (progress <= TRAJECTORY_LOCK_PROGRESS) {
    const arc = Math.sin(progress * Math.PI);

    return {
      x: baseX + sample.scatterX * progress + sample.scatterCurveX * arc,
      y: baseY + sample.scatterY * progress + sample.scatterCurveY * arc,
    };
  }

  const continuationProgress =
    (progress - TRAJECTORY_LOCK_PROGRESS) / TRAJECTORY_LOCK_REMAINDER;
  const continuationDistance =
    sample.continuationInitialRate * continuationProgress +
    (sample.continuationDistance - sample.continuationInitialRate) *
      continuationProgress *
      continuationProgress;

  return {
    x:
      baseX +
      sample.lockOffsetX +
      sample.continuationDirectionX * continuationDistance,
    y:
      baseY +
      sample.lockOffsetY +
      sample.continuationDirectionY * continuationDistance,
  };
};

type EraseRect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type AsciiPortraitProps = {
  aboutProgressRef?: RefObject<AboutFigureProgress>;
  className?: string;
  embedded?: boolean;
  scrollProgressRef?: RefObject<number>;
};

export function AsciiPortrait({
  aboutProgressRef,
  className = "",
  embedded = false,
  scrollProgressRef,
}: AsciiPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const canUseDOM = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const portalTarget = !embedded && canUseDOM ? document.body : null;

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!frame || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const source = new window.Image();
    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });

    let animationFrame = 0;
    const frameInterval = coarsePointer.matches ? 24 : 16;
    let lastFrame = 0;
    let isVisible = true;
    let eraseRects: EraseRect[] = [];
    let samples: Sample[] = [];
    let columns = 0;
    let rows = 0;
    let cellWidth = 0;
    let cellHeight = 0;
    let width = 0;
    let height = 0;
    let aboutGlyphSize = 7;
    let aboutEraseRects: EraseRect[] = [];
    let aboutParticles: AboutParticle[] = [];
    let aboutSources: EraseRect[] = [];
    let aboutWasActive = false;
    const colorPalette = Array.from({ length: 9 }, (_, index) => {
      const mix = index / 8;
      const channel = Math.round(17 + (112 - 17) * mix);
      return `rgb(${channel} ${channel} ${channel})`;
    });

    const pointer = {
      active: false,
      strength: 0,
      x: 0,
      y: 0,
    };

    const updateEraseRects = () => {
      eraseRects = [...document.querySelectorAll<HTMLElement>("[data-particle-erase]")]
        .map((target) => target.getBoundingClientRect())
        .filter(
          (rect) =>
            rect.width > 0 &&
            rect.height > 0 &&
            rect.right > 0 &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.top < window.innerHeight,
        )
        .map((rect) => ({
          height: rect.height,
          width: rect.width,
          x: rect.left,
          y: rect.top,
        }));
    };

    const sampleAboutFigure = () => {
      aboutEraseRects = [
        ...document.querySelectorAll<HTMLElement>("[data-about-particle-erase]"),
      ].map((target) => {
        const rect = target.getBoundingClientRect();

        return {
          height: rect.height,
          width: rect.width,
          x: rect.left,
          y: rect.top,
        };
      });
      aboutSources = [
        ...document.querySelectorAll<HTMLElement>("[data-about-particle-source]"),
      ].map((sourceElement) => {
        const rect = sourceElement.getBoundingClientRect();

        return {
          height: rect.height,
          width: rect.width,
          x: rect.left,
          y: rect.top,
        };
      });

      aboutParticles = [];
      if (!samples.length) return;

      const minColumn = Math.min(...samples.map((sample) => sample.column));
      const maxColumn = Math.max(...samples.map((sample) => sample.column));
      const minRow = Math.min(...samples.map((sample) => sample.row));
      const maxRow = Math.max(...samples.map((sample) => sample.row));
      const sampleWidth = Math.max(1, (maxColumn - minColumn + 1) * cellWidth);
      const sampleHeight = Math.max(1, (maxRow - minRow + 1) * cellHeight);
      const isNarrow = width <= 720;
      const figureHeight = Math.min(
        height * (isNarrow ? 0.62 : 0.92),
        isNarrow ? 560 : 820,
      );
      const figureWidth = figureHeight * (sampleWidth / sampleHeight);
      const figureCenterX = isNarrow
        ? width * 0.82
        : width - figureWidth * 0.82;
      const figureBottom = height + (isNarrow ? 10 : 14);
      const figureTop = figureBottom - figureHeight;
      const targetCellWidth = figureWidth / Math.max(1, maxColumn - minColumn + 1);

      aboutGlyphSize = Math.max(isNarrow ? 5.8 : 7, targetCellWidth * 1.08);

      samples.forEach((sample) => {
        const seedA =
          (Math.sin(sample.column * 91.17 + sample.row * 47.31) + 1) * 0.5;
        const seedB =
          (Math.sin(sample.column * 37.71 + sample.row * 113.93) + 1) * 0.5;
        const phaseSeed =
          (Math.sin(sample.column * 173.17 + sample.row * 61.73) + 1) * 0.5;
        const seedC =
          (Math.sin(sample.column * 211.13 + sample.row * 29.47) + 1) * 0.5;
        const seedD =
          (Math.sin(sample.column * 53.81 + sample.row * 197.33) + 1) * 0.5;

        if (isNarrow && seedA < 0.18) return;

        const phase = Math.min(2, Math.floor(phaseSeed * 3)) as 0 | 1 | 2;
        const normalizedX =
          (sample.column - minColumn + 0.5) / Math.max(1, maxColumn - minColumn + 1);
        const normalizedY =
          (sample.row - minRow + 0.5) / Math.max(1, maxRow - minRow + 1);

        aboutParticles.push({
          darkness: sample.darkness,
          glyphIndex: sample.glyphIndex,
          phase,
          seedA,
          seedB,
          seedC,
          seedD,
          targetX:
            figureCenterX +
            (normalizedX - 0.5) * figureWidth,
          targetY:
            figureTop +
            normalizedY * figureHeight,
        });
      });

      aboutParticles.sort(
        (first, second) =>
          first.phase - second.phase || first.seedC - second.seedC,
      );
    };

    const drawAboutFigure = (aboutProgress: AboutFigureProgress, phase: number) => {
      if (!aboutParticles.length) return;

      const waveProgress = [
        aboutProgress.waveOne,
        aboutProgress.waveTwo,
        aboutProgress.waveThree,
      ];
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `600 ${aboutGlyphSize}px var(--font-geist-mono), monospace`;
      context.save();
      context.beginPath();
      context.rect(
        0,
        aboutProgress.clipTop,
        width,
        Math.max(0, aboutProgress.clipBottom - aboutProgress.clipTop),
      );
      context.clip();

      const getExitState = (particle: AboutParticle) => {
        const normalizedExit = Math.min(1, aboutProgress.exit / 0.76);
        const exitStagger = particle.seedC * 0.12;
        const exitLinear = Math.min(
          1,
          Math.max(
            0,
            (normalizedExit - exitStagger) / Math.max(0.001, 1 - exitStagger),
          ),
        );
        let exitProgress = exitLinear * exitLinear * (3 - 2 * exitLinear);
        const verticalBand = Math.min(2, Math.floor(particle.seedA * 3));
        const verticalDirection = [-0.64, 0, 0.64][verticalBand];
        const destinationX = -width * (0.08 + particle.seedD * 0.28);
        let destinationY =
          particle.targetY +
          verticalDirection * height +
          (particle.seedB - 0.5) * height * 0.24;

        if (particle.seedB < 0.2 && aboutEraseRects.length) {
          const routedLinear = Math.min(1, exitLinear * 1.45);
          exitProgress = routedLinear * routedLinear * (3 - 2 * routedLinear);
          const eraseRect = aboutEraseRects[
            Math.min(
              aboutEraseRects.length - 1,
              Math.floor(particle.seedD * aboutEraseRects.length),
            )
          ];
          const crossingX = eraseRect.x + eraseRect.width * (0.2 + particle.seedA * 0.6);
          const crossingY = eraseRect.y + eraseRect.height * (0.16 + particle.seedC * 0.68);
          const crossingProgress = Math.min(
            0.96,
            Math.max(
              0.12,
              (crossingX - particle.targetX) / (destinationX - particle.targetX),
            ),
          );

          destinationY =
            particle.targetY +
            (crossingY - particle.targetY) / crossingProgress;
        }

        return {
          progress: exitProgress,
          x: particle.targetX + (destinationX - particle.targetX) * exitProgress,
          y: particle.targetY + (destinationY - particle.targetY) * exitProgress,
        };
      };

      if (aboutProgress.exit > 0 && aboutEraseRects.length) {
        context.save();
        context.beginPath();
        aboutEraseRects.forEach((rect) => {
          context.rect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2);
        });
        context.clip();
        context.beginPath();
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = Math.max(7.5, aboutGlyphSize * 1.04);
        context.strokeStyle = "#ffffff";
        context.globalAlpha = 1;

        aboutParticles.forEach((particle) => {
          const exitState = getExitState(particle);
          if (exitState.progress <= 0) return;

          context.moveTo(particle.targetX, particle.targetY);
          context.lineTo(exitState.x, exitState.y);
        });

        context.stroke();

        const cleanupLinear = Math.min(
          1,
          Math.max(0, (aboutProgress.exit - 0.62) / 0.1),
        );
        const cleanupProgress =
          cleanupLinear * cleanupLinear * (3 - 2 * cleanupLinear);

        if (cleanupProgress > 0) {
          context.globalAlpha = cleanupProgress;
          context.fillStyle = "#ffffff";
          aboutEraseRects.forEach((rect) => {
            context.fillRect(rect.x - 2, rect.y - 2, rect.width + 4, rect.height + 4);
          });
        }

        context.restore();
      }

      let activeAboutFontSize = -1;

      aboutParticles.forEach((particle) => {
        const wave = waveProgress[particle.phase];
        const stagger = particle.seedC * 0.26;
        const linear = Math.min(
          1,
          Math.max(0, (wave - stagger) / Math.max(0.001, 1 - stagger)),
        );

        if (linear <= 0) return;

        const progress = linear * linear * (3 - 2 * linear);
        const scatterEnvelope = Math.sin(progress * Math.PI);
        const crossEnvelope = Math.sin(progress * Math.PI * 2) * (1 - progress);
        const source = aboutSources[particle.phase];
        const sourceX = source
          ? source.x + source.width
          : width * 0.62;
        const sourceY = source
          ? source.y + source.height * 0.5 + (particle.seedB - 0.5) * 2.4
          : height * (0.3 + particle.phase * 0.2);
        const scatterAngle = (particle.seedD - 0.5) * Math.PI * 0.95;
        const scatterDistance =
          Math.min(width, height) * (0.075 + particle.seedA * 0.18);
        const crossDistance =
          Math.min(width, height) * (particle.seedB - 0.5) * 0.12;
        const scatterX =
          Math.cos(scatterAngle) * scatterDistance * scatterEnvelope +
          Math.cos(scatterAngle * 2.37) * crossDistance * crossEnvelope;
        const scatterY =
          Math.sin(scatterAngle) * scatterDistance * scatterEnvelope +
          Math.sin(scatterAngle * 1.91) * crossDistance * crossEnvelope;
        const fanLinear = Math.min(1, Math.max(0, (progress - 0.035) / 0.245));
        const fanProgress = fanLinear * fanLinear * (3 - 2 * fanLinear);
        const horizontalFan = 0.06 + fanProgress * 0.94;
        let x =
          sourceX +
          (particle.targetX - sourceX) * progress * horizontalFan +
          scatterX * horizontalFan;
        let y =
          sourceY +
          (particle.targetY - sourceY) * progress * fanProgress +
          scatterY * fanProgress;
        let colorInfluence = 0;
        const exitState = getExitState(particle);
        const settledLinear = Math.min(1, Math.max(0, (linear - 0.96) / 0.04));
        const settled = settledLinear * settledLinear * (3 - 2 * settledLinear);
        const idleStrength = settled * (1 - exitState.progress);

        if (idleStrength > 0) {
          x +=
            Math.sin(particle.targetY * 0.021 + phase * 1.15) *
            (0.45 + particle.darkness * 1.25) *
            idleStrength;
          y +=
            Math.cos(particle.targetX * 0.016 + phase * 0.82) *
            particle.darkness *
            0.55 *
            idleStrength;
        }

        if (exitState.progress > 0) {
          x += exitState.x - particle.targetX;
          y += exitState.y - particle.targetY;
        }

        if (pointer.strength > 0 && exitState.progress < 0.84) {
          const deltaX = particle.targetX - pointer.x;
          const deltaY = particle.targetY - pointer.y;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance > 0 && distance < width * 0.24) {
            const force =
              (1 - distance / (width * 0.24)) ** 2 *
              pointer.strength *
              Math.min(1, linear * 1.25) *
              (1 - exitState.progress);
            x += (deltaX / distance) * force * 9;
            y += (deltaY / distance) * force * 9;
            colorInfluence = force;
          }
        }
        const flicker = Math.round(
          ((Math.sin(phase * 1.7 + particle.seedA * 7 + particle.seedB * 11) + 1) *
            0.35) *
            idleStrength,
        );
        const textureOffset = Math.round(particle.seedA * 2) - flicker;
        const glyph =
          GLYPHS[
            Math.max(
              1,
              Math.min(GLYPHS.length - 1, particle.glyphIndex - textureOffset),
            )
          ];

        const departureDistance = Math.hypot(x - sourceX, y - sourceY);
        const sizeLinear = Math.min(
          1,
          Math.max(0, (departureDistance - 3) / 30),
        );
        const sizeProgress = sizeLinear * sizeLinear * (3 - 2 * sizeLinear);
        const launchScale = 0.045 + sizeProgress * 0.955;
        const particleFontSize = Math.max(
          0.6,
          Math.round(aboutGlyphSize * launchScale * 4) / 4,
        );

        if (particleFontSize !== activeAboutFontSize) {
          context.font = `600 ${particleFontSize}px var(--font-geist-mono), monospace`;
          activeAboutFontSize = particleFontSize;
        }

        const departureLinear = Math.min(
          1,
          Math.max(0, (departureDistance - 3) / 14),
        );
        const departureVisibility =
          departureLinear * departureLinear * (3 - 2 * departureLinear);

        context.globalAlpha =
          Math.min(1, linear * 7) *
          (0.38 + particle.darkness * 0.62) *
          departureVisibility;
        context.fillStyle = colorPalette[
          Math.min(
            colorPalette.length - 1,
            Math.round((1 - particle.darkness) * 3 + colorInfluence * 4),
          )
        ];
        context.fillText(glyph, x, y);
      });

      if (aboutProgress.exit <= 0.001) {
        waveProgress.forEach((wave, index) => {
          const source = aboutSources[index];
          if (!source || wave <= 0.125 || wave >= 0.255) return;

          const pointInLinear = Math.min(
            1,
            Math.max(0, (wave - 0.125) / 0.035),
          );
          const pointIn = pointInLinear * pointInLinear * (3 - 2 * pointInLinear);
          const pointOutLinear = Math.min(
            1,
            Math.max(0, (wave - 0.205) / 0.05),
          );
          const pointOut =
            pointOutLinear * pointOutLinear * (3 - 2 * pointOutLinear);
          const pointOpacity = pointIn * (1 - pointOut);

          if (pointOpacity <= 0) return;

          context.beginPath();
          context.arc(
            source.x + source.width,
            source.y + source.height * 0.5,
            width <= 720 ? 1.35 : 1.65,
            0,
            Math.PI * 2,
          );
          context.fillStyle = "#242424";
          context.globalAlpha = pointOpacity;
          context.fill();
        });
      }

      context.restore();
      context.globalAlpha = 1;
    };

    const draw = (time = 0) => {
      if (!width || !height || !samples.length) return;

      context.clearRect(0, 0, width, height);
      context.fillStyle = colorPalette[0];
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `600 ${Math.max(7, cellWidth * 1.08)}px var(--font-geist-mono), monospace`;

      const animate = !reducedMotion.matches;
      const phase = time * 0.001;
      const influenceRadius = width * 0.24;
      const pointerTarget = pointer.active ? 1 : 0;
      const rawScrollProgress = reducedMotion.matches
        ? 0
        : Math.min(1, Math.max(0, scrollProgressRef?.current ?? 0));
      const aboutProgress = aboutProgressRef?.current ?? {
        clipBottom: 0,
        clipTop: 0,
        exit: 0,
        surface: 0,
        waveOne: 0,
        waveTwo: 0,
        waveThree: 0,
      };
      const aboutIsActive = animate && aboutProgress.surface > 0.001;

      if (animate) {
        const response = pointerTarget > pointer.strength ? 0.075 : 0.032;
        pointer.strength += (pointerTarget - pointer.strength) * response;

        if (!pointer.active && pointer.strength < 0.001) pointer.strength = 0;
      } else {
        pointer.strength = 0;
      }

      if (aboutIsActive) {
        if (!aboutWasActive) {
          // Route destinations mount below the opaque SiteShell surface. Refresh the
          // DOM geometry only when About actually becomes visible so font/layout
          // settling cannot leave the emitter points and erase clips at mount-time
          // coordinates. Particle seeds and flight math remain deterministic.
          sampleAboutFigure();
        }
        aboutWasActive = true;

        if (aboutProgress.exit >= 0.78) {
          canvas.style.zIndex = "2";
          canvas.dataset.scene = "idle";
          return;
        }

        const aboutIsExiting = aboutProgress.exit > 0.001;
        canvas.style.zIndex = aboutIsExiting ? "99" : "6";
        canvas.dataset.scene = aboutIsExiting ? "about-exit" : "about";
        drawAboutFigure(aboutProgress, phase);
        return;
      }

      aboutWasActive = false;

      const scatterLinear = Math.min(
        1,
        Math.max(
          0,
          (rawScrollProgress - SCATTER_RAW_START) /
            (SCATTER_RAW_END - SCATTER_RAW_START),
        ),
      );
      const scatterProgress = scatterLinear * scatterLinear * (3 - 2 * scatterLinear);
      if (rawScrollProgress >= SCATTER_RAW_END) {
        canvas.style.zIndex = "2";
        canvas.dataset.scene = "idle";
        context.globalAlpha = 1;
        return;
      }

      canvas.dataset.scene = "hero";

      if (rawScrollProgress >= SCATTER_RAW_START - 0.005 && rawScrollProgress < SCATTER_RAW_END) {
        updateEraseRects();
      }

      canvas.style.zIndex =
        rawScrollProgress >= SCATTER_RAW_START && rawScrollProgress < SCATTER_RAW_END
          ? "160"
          : "2";

      const drawEraseTrails = () => {
        if (
          !animate ||
          scatterProgress <= 0 ||
          rawScrollProgress >= TRAJECTORY_LOCK_RAW_PROGRESS ||
          !eraseRects.length
        ) {
          return;
        }

        const trailWidth = Math.max(8.2, cellWidth * 0.94);
        const trailStep = 0.018;
        const eraseClipBleed = 1.5;

        context.save();
        context.beginPath();
        for (const rect of eraseRects) {
          context.rect(
            rect.x - eraseClipBleed,
            rect.y - eraseClipBleed,
            rect.width + eraseClipBleed * 2,
            rect.height + eraseClipBleed * 2,
          );
        }
        context.clip();
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = trailWidth;
        context.strokeStyle = "#ffffff";
        context.globalAlpha = 1;
        context.beginPath();

        for (const sample of samples) {
          const baseX = (sample.column + 0.5) * cellWidth;
          const baseY = (sample.row + 0.5) * cellHeight;
          let crossesEraseTarget = false;

          for (
            let trailProgress = trailStep;
            trailProgress <= scatterProgress;
            trailProgress += trailStep
          ) {
            const trailPosition = getSamplePosition(
              sample,
              trailProgress,
              baseX,
              baseY,
            );
            const trailX = trailPosition.x;
            const trailY = trailPosition.y;

            crossesEraseTarget = eraseRects.some(
              (rect) =>
                trailX >= rect.x - trailWidth &&
                trailX <= rect.x + rect.width + trailWidth &&
                trailY >= rect.y - trailWidth &&
                trailY <= rect.y + rect.height + trailWidth,
            );

            if (crossesEraseTarget) break;
          }

          if (!crossesEraseTarget) continue;

          context.moveTo(baseX, baseY);

          for (
            let trailProgress = trailStep;
            trailProgress < scatterProgress;
            trailProgress += trailStep
          ) {
            const trailPosition = getSamplePosition(
              sample,
              trailProgress,
              baseX,
              baseY,
            );
            context.lineTo(trailPosition.x, trailPosition.y);
          }

          const currentPosition = getSamplePosition(
            sample,
            scatterProgress,
            baseX,
            baseY,
          );
          context.lineTo(currentPosition.x, currentPosition.y);
        }

        context.stroke();
        context.restore();
      };

      drawEraseTrails();

      for (const sample of samples) {
        if (scatterProgress > TRAJECTORY_LOCK_PROGRESS && !sample.continuesAfterLock) {
          continue;
        }

        const baseX = (sample.column + 0.5) * cellWidth;
        const baseY = (sample.row + 0.5) * cellHeight;
        const position = getSamplePosition(sample, scatterProgress, baseX, baseY);
        let x = position.x;
        let y = position.y;
        let colorInfluence = 0;

        if (animate) {
          const wave = Math.sin(sample.row * 0.21 + phase * 1.15);
          x += wave * (0.45 + sample.darkness * 1.25);
          y += Math.cos(sample.column * 0.16 + phase * 0.82) * sample.darkness * 0.55;

          if (pointer.strength > 0 && scatterProgress < 0.92) {
            const deltaX = baseX - pointer.x;
            const deltaY = baseY - pointer.y;
            const distance = Math.hypot(deltaX, deltaY);

            if (distance > 0 && distance < influenceRadius) {
              const force =
                (1 - distance / influenceRadius) ** 2 *
                pointer.strength *
                (1 - scatterProgress);
              x += (deltaX / distance) * force * 9;
              y += (deltaY / distance) * force * 9;
              colorInfluence = force;
            }
          }
        }

        const flicker = animate
          ? Math.round((Math.sin(phase * 1.7 + sample.row * 0.31 + sample.column * 0.13) + 1) * 0.35)
          : 0;
        const textureOffset = (sample.row * 7 + sample.column * 11) % 3;
        const glyph =
          GLYPHS[
            Math.max(
              1,
              Math.min(GLYPHS.length - 1, sample.glyphIndex - textureOffset + flicker),
            )
          ];

        context.globalAlpha = 0.3 + sample.darkness * 0.7;
        context.fillStyle =
          colorPalette[Math.round(colorInfluence * (colorPalette.length - 1))];
        context.fillText(glyph, x, y);
      }

      context.globalAlpha = 1;
    };

    const tick = (time: number) => {
      if (!isVisible || reducedMotion.matches) {
        animationFrame = 0;
        return;
      }

      if (time - lastFrame >= frameInterval) {
        draw(time);
        lastFrame = time;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      window.cancelAnimationFrame(animationFrame);

      if (reducedMotion.matches || !isVisible) {
        animationFrame = 0;
        draw(0);
        return;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const samplePortrait = () => {
      if (!source.complete || !source.naturalWidth || !sampleContext) return;

      const bounds = frame.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      updateEraseRects();

      const dpr = Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.15 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(42, Math.min(coarsePointer.matches ? 54 : 96, Math.round(width / 9)));
      cellWidth = width / columns;
      cellHeight = cellWidth * 1.18;
      rows = Math.max(1, Math.floor(height / cellHeight));
      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      sampleContext.clearRect(0, 0, columns, rows);

      const sourceX = 0;
      const sourceY = 0;
      const sourceWidth = source.naturalWidth;
      const sourceHeight = source.naturalHeight;
      const sourceAspect = sourceWidth / sourceHeight;
      let drawHeight = rows * (embedded ? 0.9 : 0.8);
      let drawWidth = drawHeight * sourceAspect;

      const widthLimit = columns * (embedded ? 0.96 : 0.9);

      if (drawWidth > widthLimit) {
        drawWidth = widthLimit;
        drawHeight = drawWidth / sourceAspect;
      }

      const drawX = (columns - drawWidth) / 2;
      const drawY = rows - drawHeight;

      sampleContext.drawImage(
        source,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
      );

      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      samples = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const pixelIndex = (row * columns + column) * 4;
          const alpha = pixels[pixelIndex + 3];

          if (alpha < 16) continue;

          const red = pixels[pixelIndex];
          const green = pixels[pixelIndex + 1];
          const blue = pixels[pixelIndex + 2];
          const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
          const saturation = Math.max(red, green, blue) - Math.min(red, green, blue);
          const tonalInk = Math.max(0, (188 - luminance) / 170);
          const skinInk = Math.max(0, (saturation - 10) / 115) * 0.72;
          const darkness = Math.min(1, Math.max(tonalInk, skinInk)) ** 1.18;

          if (darkness < 0.07) continue;

          samples.push({
            column,
            continuationDirectionX: 0,
            continuationDirectionY: 0,
            continuationDistance: 0,
            continuationInitialRate: 0,
            continuesAfterLock: false,
            darkness,
            glyphIndex: Math.max(1, Math.round(darkness * (GLYPHS.length - 1))),
            lockOffsetX: 0,
            lockOffsetY: 0,
            row,
            scatterCurveX: 0,
            scatterCurveY: 0,
            scatterX: 0,
            scatterY: 0,
          });
        }
      }

      sampleAboutFigure();

      for (const sample of samples) {
        const angleSeed =
          (Math.sin(sample.column * 91.17 + sample.row * 47.31) + 1) * 0.5;
        const speedSeed =
          (Math.sin(sample.column * 37.71 + sample.row * 113.93) + 1) * 0.5;
        const curveSeed =
          (Math.sin(sample.column * 157.31 + sample.row * 19.43) + 1) * 0.5;
        const angle = angleSeed * Math.PI * 2;
        const directionX = Math.cos(angle);
        const directionY = Math.sin(angle);
        const baseX = (sample.column + 0.5) * cellWidth;
        const baseY = (sample.row + 0.5) * cellHeight;
        const margin = Math.max(width, height) * (coarsePointer.matches ? 0.035 : 0.06);
        const travelX =
          directionX > 0
            ? (width + margin - baseX) / directionX
            : (-margin - baseX) / directionX;
        const travelY =
          directionY > 0
            ? (height + margin - baseY) / directionY
            : (-margin - baseY) / directionY;
        const travel = Math.min(travelX, travelY) * (1.04 + speedSeed * 0.32);
        const curveAmount =
          (curveSeed - 0.5) *
          Math.min(width, height) *
          (coarsePointer.matches ? 0.2 : 0.34);

        sample.scatterX = directionX * travel;
        sample.scatterY = directionY * travel;
        sample.scatterCurveX = -directionY * curveAmount;
        sample.scatterCurveY = directionX * curveAmount;
      }

      const usedEraseSamples = new Set<Sample>();

      eraseRects.forEach((rect, rectIndex) => {
        const targetCount = Math.max(
          128,
          Math.min(176, Math.round(rect.width / 0.9)),
        );
        const candidates = samples
          .filter((sample) => sample.darkness > 0.18 && !usedEraseSamples.has(sample))
          .sort((a, b) => {
            const hashA =
              Math.sin(a.column * 31.73 + a.row * 79.19 + rectIndex * 137.11) *
              0.5 +
              0.5;
            const hashB =
              Math.sin(b.column * 31.73 + b.row * 79.19 + rectIndex * 137.11) *
              0.5 +
              0.5;
            return hashA - hashB;
          })
          .slice(0, targetCount);

        candidates.forEach((sample, candidateIndex) => {
          usedEraseSamples.add(sample);

          const baseX = (sample.column + 0.5) * cellWidth;
          const baseY = (sample.row + 0.5) * cellHeight;
          const crossingSeed =
            Math.sin(sample.column * 67.41 + sample.row * 23.17 + rectIndex * 53.09) *
              0.5 +
            0.5;
          const horizontalSeed =
            (candidateIndex * 0.61803398875 + rectIndex * 0.17320508076) % 1;
          const verticalSeed =
            (candidateIndex * 0.41421356237 + rectIndex * 0.27182818284) % 1;
          const crossingProgress = 0.24 + crossingSeed * 0.46;
          const crossingArc = Math.sin(crossingProgress * Math.PI);
          const targetX = rect.x + rect.width * (0.03 + horizontalSeed * 0.94);
          const targetY = rect.y + rect.height * (0.06 + verticalSeed * 0.88);

          sample.scatterCurveX =
            (targetX - baseX - sample.scatterX * crossingProgress) / crossingArc;
          sample.scatterCurveY =
            (targetY - baseY - sample.scatterY * crossingProgress) / crossingArc;
        });
      });

      for (const sample of samples) {
        const baseX = (sample.column + 0.5) * cellWidth;
        const baseY = (sample.row + 0.5) * cellHeight;
        const lockOffsetX =
          sample.scatterX * TRAJECTORY_LOCK_PROGRESS +
          sample.scatterCurveX * TRAJECTORY_LOCK_ARC;
        const lockOffsetY =
          sample.scatterY * TRAJECTORY_LOCK_PROGRESS +
          sample.scatterCurveY * TRAJECTORY_LOCK_ARC;
        const arcVelocity =
          Math.PI * Math.cos(TRAJECTORY_LOCK_PROGRESS * Math.PI);
        let tangentX = sample.scatterX + sample.scatterCurveX * arcVelocity;
        let tangentY = sample.scatterY + sample.scatterCurveY * arcVelocity;
        let tangentLength = Math.hypot(tangentX, tangentY);

        if (tangentLength < 0.001) {
          tangentX = sample.scatterX;
          tangentY = sample.scatterY;
          tangentLength = Math.max(0.001, Math.hypot(tangentX, tangentY));
        }

        const directionX = tangentX / tangentLength;
        const directionY = tangentY / tangentLength;
        const lockX = baseX + lockOffsetX;
        const lockY = baseY + lockOffsetY;
        const margin = Math.max(width, height) * (coarsePointer.matches ? 0.04 : 0.07);
        const alreadyOutside =
          lockX < -margin ||
          lockX > width + margin ||
          lockY < -margin ||
          lockY > height + margin;
        const exitDistances = [
          directionX > 0.0001
            ? (width + margin - lockX) / directionX
            : Number.POSITIVE_INFINITY,
          directionX < -0.0001
            ? (-margin - lockX) / directionX
            : Number.POSITIVE_INFINITY,
          directionY > 0.0001
            ? (height + margin - lockY) / directionY
            : Number.POSITIVE_INFINITY,
          directionY < -0.0001
            ? (-margin - lockY) / directionY
            : Number.POSITIVE_INFINITY,
        ].filter((distance) => distance > 0 && Number.isFinite(distance));
        const edgeDistance = !alreadyOutside && exitDistances.length
          ? Math.min(...exitDistances)
          : 0;
        const speedSeed =
          (Math.sin(sample.column * 37.71 + sample.row * 113.93) + 1) * 0.5;
        const initialRate = tangentLength * TRAJECTORY_LOCK_REMAINDER;

        sample.lockOffsetX = lockOffsetX;
        sample.lockOffsetY = lockOffsetY;
        sample.continuationDirectionX = directionX;
        sample.continuationDirectionY = directionY;
        sample.continuationInitialRate = initialRate;
        sample.continuesAfterLock = directionY < -0.02;
        sample.continuationDistance = Math.max(
          initialRate,
          edgeDistance * (1.05 + speedSeed * 0.12),
        );
      }

      draw(0);
      setIsReady(true);
      startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (coarsePointer.matches || reducedMotion.matches) return;

      const bounds = frame.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      pointer.active = isInside;
      if (!isInside) return;

      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleMotionChange = () => {
      pointer.active = false;
      pointer.strength = 0;
      startAnimation();
    };

    const resizeObserver = new ResizeObserver(samplePortrait);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (!isVisible) {
        context.clearRect(0, 0, width, height);
        canvas.style.zIndex = "2";
        canvas.dataset.scene = "idle";
      }

      startAnimation();
    });

    source.decoding = "async";
    source.addEventListener("load", samplePortrait, { once: true });
    source.src = SOURCE;

    resizeObserver.observe(frame);
    intersectionObserver.observe(frame);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      source.removeEventListener("load", samplePortrait);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, [aboutProgressRef, embedded, portalTarget, scrollProgressRef]);

  return (
    <>
      <div
        ref={frameRef}
        className={`${styles.frame} ${className}`.trim()}
        aria-hidden={embedded ? "true" : undefined}
        data-embedded={embedded ? "true" : "false"}
        data-ready={isReady ? "true" : "false"}
      >
        <Image
          alt={embedded ? "" : "Portrait of Amal E"}
          className={styles.fallback}
          fill
          loading="eager"
          sizes={embedded ? "(max-width: 900px) 0px, 470px" : "100vw"}
          src={SOURCE}
        />

        {embedded ? (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`${styles.canvas} ${styles.embeddedCanvas} ${isReady ? styles.canvasReady : ""}`.trim()}
          />
        ) : null}
      </div>

      {!embedded && portalTarget
        ? createPortal(
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className={`${styles.canvas} ${isReady ? styles.canvasReady : ""}`.trim()}
            />,
            portalTarget,
          )
        : null}
    </>
  );
}
