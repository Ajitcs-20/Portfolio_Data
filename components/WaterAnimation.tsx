import React, { useEffect, useRef } from 'react';

export const WaterAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Water wave parameters
    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.05, yOffset: canvas.height * 0.7 },
      { amplitude: 20, frequency: 0.015, speed: 0.03, yOffset: canvas.height * 0.75 },
      { amplitude: 15, frequency: 0.01, speed: 0.02, yOffset: canvas.height * 0.8 },
    ];

    let time = 0;

    const draw = () => {
      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.1)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each wave
      waves.forEach((wave, waveIndex) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.yOffset);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            wave.yOffset +
            wave.amplitude *
              Math.sin(
                x * wave.frequency +
                  time * wave.speed +
                  (waveIndex * Math.PI) / 3
              );
          ctx.lineTo(x, y);
        }

        // Complete the wave path
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Fill with gradient
        const waveGradient = ctx.createLinearGradient(0, wave.yOffset, 0, canvas.height);
        waveGradient.addColorStop(
          0,
          `rgba(59, 130, 246, ${0.15 - waveIndex * 0.03})`
        );
        waveGradient.addColorStop(
          0.5,
          `rgba(37, 99, 235, ${0.1 - waveIndex * 0.02})`
        );
        waveGradient.addColorStop(
          1,
          `rgba(30, 58, 138, ${0.05 - waveIndex * 0.01})`
        );
        ctx.fillStyle = waveGradient;
        ctx.fill();

        // Draw wave outline
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - waveIndex * 0.08})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw a small boat riding the first wave
      if (waves.length > 0) {
        const w = waves[0];
        const bx = canvas.width * 0.5 + Math.sin(time * 0.006) * (canvas.width * 0.18);
        const by =
          w.yOffset +
          w.amplitude * Math.sin(bx * w.frequency + time * w.speed + 0) -
          8;

        // boat shadow/reflection
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = 'rgba(10,20,40,0.3)';
        ctx.beginPath();
        ctx.ellipse(bx, by + 14, 24, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // boat hull
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.moveTo(bx - 28, by + 4);
        ctx.quadraticCurveTo(bx - 12, by + 18, bx + 28, by + 4);
        ctx.lineTo(bx + 18, by - 2);
        ctx.quadraticCurveTo(bx, by + 10, bx - 18, by - 2);
        ctx.closePath();
        ctx.fill();

        // mast
        ctx.strokeStyle = '#fde68a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx, by - 2);
        ctx.lineTo(bx, by - 26);
        ctx.stroke();

        // small waving flag attached to mast
        (function () {
          const mastX = bx;
          const mastY = by - 26; // top of mast
          const flagW = 22;
          const flagH = 10;
          const segments = 6;
          const speed = 0.18;
          const baseAmp = 3;

          const topPts = [];
          const bottomPts = [];
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const px = mastX + 2 + t * flagW;
            const amp = baseAmp * (0.3 + 0.7 * t);
            const phase = time * speed + i * 0.5;
            const pyTop = mastY + Math.sin(phase) * amp - i * 0.15;
            const pyBottom = mastY + flagH + Math.sin(phase + 0.5) * (amp * 0.7) + i * 0.08;
            if (i === 0) {
              topPts.push({ x: mastX, y: mastY });
              bottomPts.push({ x: mastX, y: mastY + flagH });
            } else {
              topPts.push({ x: px, y: pyTop });
              bottomPts.push({ x: px, y: pyBottom });
            }
          }

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(topPts[0].x, topPts[0].y);
          for (let i = 1; i < topPts.length; i++) {
            const p = topPts[i];
            ctx.lineTo(p.x, p.y);
          }
          for (let i = bottomPts.length - 1; i >= 0; i--) {
            const p = bottomPts[i];
            ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(0,0,0,0.25)';
          ctx.stroke();
          ctx.restore();
        })();

        // small person sitting in the boat (head + body) with gentle bobbing
        const headX = bx - 6;
        const headY = by - 2 + Math.sin(time * 0.08) * 1.5; // bobbing
        ctx.fillStyle = '#fde68a';
        ctx.beginPath();
        ctx.arc(headX, headY - 6, 4, 0, Math.PI * 2);
        ctx.fill();

        // body
        ctx.strokeStyle = 'rgba(0,0,0,0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(headX, headY - 2);
        ctx.lineTo(headX, headY + 6);
        ctx.stroke();
      }

      time += 1;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};
