import React from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <button 
      className={styles.toggle} 
      onClick={toggleTheme}
      title={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
    >
      {isDark ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V4M12 20V21M4 12H3M6.3 6.3L5.5 5.5M17.7 6.3L18.5 5.5M6.3 17.7L5.5 18.5M17.7 17.7L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.752 15.002C20.5633 15.4975 19.2879 15.7517 18 15.75C13.4436 15.75 9.75 12.0564 9.75 7.5C9.75 6.21213 10.0042 4.93666 10.4997 3.748C5.47061 4.85877 2 9.30322 2 14.25C2 19.6348 6.36522 24 11.75 24C16.6968 24 21.1412 20.5294 22.252 15.5003C22.252 15.5003 22 15.25 21.752 15.002Z" 
            fill="currentColor"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;