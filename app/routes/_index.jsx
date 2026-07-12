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

  // ... (useEffectのロジックは変更なし)

  const handleLogoClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <div className="viewport">
        <div className={`logo-container ${isOpen ? 'is-active' : ''}`} onClick={handleLogoClick}>
          <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
          
          {/* 通常時：ノード表示 */}
          <div className="nodes-layer">
            {leftNodes.map((n, i) => (
              <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                <div className="line" /><Link to="/shop"><img src="/assets/master.png" className="node-img" /></Link>
              </div>
            ))}
            {rightNodes.map((n, i) => (
              <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                <div className="line" /><Link to="/concept"><img src="/assets/dick.png" className="node-img" /></Link>
              </div>
            ))}
          </div>

          {/* クリック時：メニュー表示 */}
          <nav className="menu-layer">
            <Link to="/shop" className="menu-item">SHOP</Link>
            <Link to="/concept" className="menu-item">CONCEPT</Link>
            <Link to="/contact" className="menu-item">CONTACT</Link>
          </nav>
        </div>
      </div>

      <footer className="landing-footer">
        <Link to="/policies">特定商取引法に基づく表記</Link>
      </footer>
    </main>
  );
}