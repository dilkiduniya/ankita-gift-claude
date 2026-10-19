import React, { useEffect, useRef } from 'react';

export default function FloatingParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for gentle wind push
    let mouse = { x: width / 2, y: height / 2, radius: 120 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Particle Classes: Sparkles, Rose Petals, and Marigold Petals
    const isMobile = width < 768;
    const sparkleCount = isMobile ? 35 : 70;
    const petalCount = isMobile ? 18 : 36;

    class Sparkle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedY = -(Math.random() * 0.7 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.03 + Math.random() * 0.04;
        this.color = Math.random() > 0.3 ? '#ffd700' : '#ff9900';
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += this.pulseSpeed;

        // Subtle mouse push
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }
      draw() {
        const curAlpha = Math.max(0, this.opacity + Math.sin(this.pulse) * 0.25);
        ctx.save();
        ctx.globalAlpha = curAlpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Petal {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = Math.random() * 9 + 6;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = 0.02 + Math.random() * 0.03;
        // Marigold (orange/yellow) vs Rose petal (crimson/pink)
        this.isMarigold = Math.random() > 0.45;
        this.color1 = this.isMarigold ? '#ff9900' : '#d81b60';
        this.color2 = this.isMarigold ? '#ffd700' : '#880e4f';
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.flip) * 0.7;
        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.scale(1, Math.cos(this.flip));

        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size);
        grad.addColorStop(0, this.color2);
        grad.addColorStop(1, this.color1);

        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.75;
        ctx.shadowColor = this.color1;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        // Elegant organic petal curve
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.7, -this.size * 0.6, this.size * 0.8, this.size * 0.6, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.6, -this.size * 0.7, -this.size * 0.6, 0, -this.size);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    const sparkles = Array.from({ length: sparkleCount }, () => new Sparkle());
    const petals = Array.from({ length: petalCount }, () => new Petal());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw all sparkles
      for (let i = 0; i < sparkles.length; i++) {
        sparkles[i].update();
        sparkles[i].draw();
      }

      // Draw all falling petals
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
}
