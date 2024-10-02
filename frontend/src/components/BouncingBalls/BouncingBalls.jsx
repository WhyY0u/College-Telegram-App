import React, { useRef, useEffect } from 'react';

const BouncingBalls = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balls = [];

    for (let i = 0; i < 5; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 40,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        blur: 20, 
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        for (let j = i + 1; j < balls.length; j++) {  
            const ball2 = balls[j];
            
            const distX = ball.x - ball2.x;
            const distY = ball.y - ball2.y;
            const distSquared = distX * distX + distY * distY;  
            const radiusSum = ball.radius + ball2.radius;
            const radiusSumSquared = radiusSum * radiusSum; 
            
            if (distSquared < radiusSumSquared) {
                const distance = Math.sqrt(distSquared); 
                const overlap = radiusSum - distance;
                const totalRadius = radiusSum;
                
                const normalX = distX / distance;
                const normalY = distY / distance;
    
                ball.x += normalX * overlap * (ball.radius / totalRadius);
                ball.y += normalY * overlap * (ball.radius / totalRadius);
                ball2.x -= normalX * overlap * (ball2.radius / totalRadius);
                ball2.y -= normalY * overlap * (ball2.radius / totalRadius);
    
                [ball.dx, ball2.dx] = [-ball2.dx, -ball.dx];
                [ball.dy, ball2.dy] = [-ball2.dy, -ball.dy];
            }
        }
    }
    
      balls.forEach((ball) => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.dy = -ball.dy ;
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 62, 231, 0.2)`;
        ctx.filter = 'blur(30px)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeфight;
    });

    canvas.style.pointerEvents = 'none';

    return () => {  
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <canvas 
    ref={canvasRef} 
    style={{ 
      position: 'fixed',
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1,
    }} 
  />
};

export default BouncingBalls;