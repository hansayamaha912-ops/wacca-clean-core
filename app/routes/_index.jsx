import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import stylesUrl from "../styles/landing.css?url";

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export const meta = () => [{ title: 'WACCA - Your City. Your Culture.' }];

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const [fireSound] = useState(() => typeof window !== 'undefined' ? new Audio('/assets/Fire.mp3') : null);
  const [goSound] = useState(() => typeof window !== 'undefined' ? new Audio('/assets/Sm.m4a') : null);

  const getNodes = () => Array.from({ length: 21 }).map((_, i) => ({
    length: 300 + Math.random() * 300,
    angle: (i - 10) * 3 + (Math.random() * 4 - 2),
    delay: Math.random() * 0.8 
  }));

  const [leftNodes] = useState(getNodes);
  const [rightNodes] = useState(getNodes);

  const handleLogoClick = () => {
    if (!isOpen) {
      fireSound?.play();
    } else {
      goSound?.play();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.classList.toggle('state1', isOpen);
  }, [isOpen]);

  return (
    <main className="viewport">
      <div className={`logo-container ${isOpen ? 'is-active' : ''}`} onClick={handleLogoClick}>
        <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
        
        <div className="nodes-layer">
          {leftNodes.map((n, i) => (
            <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
              <div className="line" />
              {/* 左側：/products へのリンクを追加 */}
              <Link to="/products">
                <img src="/assets/master.png" className="node-img" alt="Master" />
              </Link>
            </div>
          ))}
          {rightNodes.map((n, i) => (
            <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
              <div className="line" />
              {/* 右側：現状維持（クリックで何か起きる場合はボタン化などが必要） */}
              <img src="/assets/dick.png" className="node-img" alt="Dick" />
            </div>
          ))}
        </div>
      </div>
      <footer className="landing-footer">
        <Link to="/policies">特定商取引法に基づく表記</Link>
      </footer>
    </main>
  );
}