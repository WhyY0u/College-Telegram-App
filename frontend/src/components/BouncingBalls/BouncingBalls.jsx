import React, { useRef, useEffect } from 'react';

const BouncingBalls = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balls = [];
    const colors = [
      'rgba(255, 255, 255, 1)', // белый
      'rgba(79, 62, 231, 1)', // темно-фиолетовый
      'rgb(231, 62, 62)', // светло-розовый
      'rgb(62, 231, 161)', // светло-зеленый
      'rgb(231, 208, 62)', // светло-желтый
    ];
    const randomNumber = Math.floor(Math.random() * 5) + 1; // Случайное число от 1 до 5

    // Создаем 5 случайных шариков
    for (let i = 0; i < 5; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 40,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        blur: 20, // Максимально блюр для всех шариков
        color: `rgba(${Math.min(Math.max(Math.random() * 255 , 0), 255)}, ${Math.min(Math.max(Math.random() * 255 , 0), 255)}, ${Math.min(Math.max(Math.random() * 255 , 0), 255)}, 1)`, // Случайный цвет
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => {
        // Двигаем шарики
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Проверка на границы и отскакивание
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.dy = -ball.dy;
        }

        // Рисуем шарик с блюром
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
        ctx.shadowBlur = ball.blur;
        ctx.shadowColor = ball.color; // Увеличиваем непрозрачность тени
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Убираем canvas из потока событий
    canvas.style.pointerEvents = 'none';

    return () => {  
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <canvas 
    ref={canvasRef} 
    style={{ 
      position: 'fixed', // Используйте fixed, чтобы занять всю область
      top: 0, 
      left: 0, 
      width: '100vw', // Занимает всю ширину окна
      height: '100vh', // Занимает всю высоту окна
      zIndex: -1,
    }} 
  />
};

export default BouncingBalls;
