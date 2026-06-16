import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import stylesUrl from "../styles/landing.css?url";

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];
export const meta = () => [{ title: 'WACCA - Your City. Your Culture.' }];

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [fireSound] = useState(() => typeof window !== 'undefined' ? new Audio('/assets/Fire.mp3') : null);
  const [goSound] = useState(() => typeof window !== 'undefined' ? new Audio('/assets/Sm.m4a') : null);

  const getNodes = () => {
    const isMobileNow = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobileNow) {
  return Array.from({ length: 18 }).map((_, i) => ({
    length: 200,
    // i=0,1,2,3 に対して、真横(0度/180度)を中心にした広がりを作る
    // 左(master)は180度を中心に、右(dick)は0度を中心に上下に振る
    angle: (i % 2 === 0) ? (i * 10) : -(i * 13), 
    delay: i * 0.1
  }));
}

    // PC用：従来の動的生成（計21個）
    const baseLen = 300;
    return Array.from({ length: 21 }).map((_, i) => ({
      length: baseLen + Math.random() * 300,
      angle: (i - 10) * 3 + (Math.random() * 4 - 2),
      delay: Math.random() * 0.8 
    }));
  };

  const [leftNodes, setLeftNodes] = useState([]);
  const [rightNodes, setRightNodes] = useState([]);

  useEffect(() => {
    // 画面サイズが変わった時だけ再生成する
    setLeftNodes(getNodes());
    setRightNodes(getNodes());
  }, [isMobile]);

  const handleLogoClick = () => {
    if (!isOpen) { fireSound?.play(); } else { goSound?.play(); }
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
            <div key={`l${i}`} className="node-item left" 
              style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
              <div className="line" />
              <Link to="/products"><img src="/assets/master.png" className="node-img" alt="Master" /></Link>
            </div>
          ))}
          {rightNodes.map((n, i) => (
            <div key={`r${i}`} className="node-item right" 
              style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
              <div className="line" />
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