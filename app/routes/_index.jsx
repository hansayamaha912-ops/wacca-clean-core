import { json } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import stylesUrl from "../styles/landing.css?url";

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key);
};

export const loader = async () => {
  const supabase = getSupabase();
  const { data } = await supabase.from('analytics').select('*').eq('id', 1);
  const stats = (data && data.length > 0) ? data[0] : { view_count: 0, click_count: 0 };
  return json({ stats });
};

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export default function Index() {
  const { stats } = useLoaderData();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getNodes = () => {
    const isMobileNow = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileNow ? 10 : 21;
    const baseLen = isMobileNow ? 150 : 300;
    return Array.from({ length: count }).map((_, i) => ({
      length: baseLen + Math.random() * 100,
      angle: (i - count/2) * (isMobileNow ? 15 : 3)
    }));
  };

  const [leftNodes] = useState(getNodes());
  const [rightNodes] = useState(getNodes());

  return (
    <main>
      <div className="viewport">
        <div className="logo-container">
          <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
          
          {/* 画像ノード：常時表示 */}
          <div className="nodes-layer">
            {leftNodes.map((n, i) => (
              <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg` }}>
                <div className="line" />
                <Link to="/shop"><img src="/assets/master.png" className="node-img" alt="Master" /></Link>
              </div>
            ))}
            {rightNodes.map((n, i) => (
              <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg` }}>
                <div className="line" />
                <Link to="/concept"><img src="/assets/dick.png" className="node-img" alt="Dick" /></Link>
              </div>
            ))}
          </div>

          {/* ナビゲーションメニュー：常時表示 */}
          <nav className="menu-layer">
            <Link to="/shop" className="menu-item">SHOP</Link>
            <Link to="/concept" className="menu-item">CONCEPT</Link>
          </nav>
        </div>
      </div>

      <footer className="landing-footer">
        <Link to="/policies">特定商取引法に基づく表記</Link>
      </footer>
    </main>
  );
}