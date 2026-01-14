import { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Snow = () => {
  const { isDarkMode } = useDarkMode();
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const flakes = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: (Math.random() * 10 + 8).toFixed(2),
        animationDelay: (Math.random() * 5).toFixed(2),
        fontSize: (Math.random() * 10 + 10).toFixed(2),
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`snowflake ${isDarkMode ? 'snowflake-dark' : ''}`}
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.fontSize}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snow;

