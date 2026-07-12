import { json } from "@remix-run/node";
import { Link, useLoaderData, useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import stylesUrl from "../styles/landing.css?url";

// ... (getSupabase, loader, action は変更なし)

export default function Index() {
  const { stats } = useLoaderData();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    fetcher.submit({ type: 'view' }, { method: "post" });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude.toFixed(2), lng: pos.coords.longitude.toFixed(2) });
      });
    }
  }, []);

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
    const baseLen = isMobileNow ? 150 : 300;
    const count = isMobileNow ? 10 : 21;
    return Array.from({ length: count }).map((_, i) => ({
      length: baseLen + Math.random() * 100,
      angle: (i - count / 2) * (isMobileNow ? 15 : 3),
      delay: Math.random() * 0.5
    }));
  };

  const [leftNodes] = useState(getNodes());
  const [rightNodes] = useState(getNodes());

  const handleLogoClick = () => {
    !isOpen ? fireSound?.play() : goSound?.play();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.classList.toggle('state1', isOpen);
  }, [isOpen]);

  return (
    <main>
      <div className="viewport">
        <div className={`logo-container ${isOpen ? 'is-active' : ''}`} onClick={handleLogoClick}>
          <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
          
          {!isOpen && (
            <div className="nodes-layer">
              {leftNodes.map((n, i) => (
                <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                  <div className="line" />
                  <Link to="/shop"><img src="/assets/master.png" className="node-img" alt="Master" /></Link>
                  {i === 0 && (
                    <div className="l-line-container" style={{top: '-40px', left: '20px'}}>
                      <div className="l-shape" style={{borderLeft: '1px solid #000', borderBottom: '1px solid #000'}} />
                      <span className="digital-label" style={{left: '25px', top: '10px'}}>SHOP</span>
                    </div>
                  )}
                </div>
              ))}
              {rightNodes.map((n, i) => (
                <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                  <div className="line" />
                  <Link to="/concept"><img src="/assets/dick.png" className="node-img" alt="Dick" /></Link>
                  {i === rightNodes.length - 1 && (
                    <div className="l-line-container" style={{top: '40px', left: '20px'}}>
                      <div className="l-shape" style={{borderLeft: '1px solid #000', borderTop: '1px solid #000'}} />
                      <span className="digital-label" style={{left: '25px', top: '-15px'}}>CONCEPT</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {isOpen && (
            <nav className="menu-layer">
              <Link to="/shop" className="menu-item">SHOP</Link>
              <Link to="/concept" className="menu-item">CONCEPT</Link>
            </nav>
          )}
        </div>
      </div>
    </main>
  );
}