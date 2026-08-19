import { json } from "@remix-run/node";
import { Link, useLoaderData, useFetcher } from '@remix-run/react';
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

export const action = async ({ request }) => {
  const supabase = getSupabase();
  const formData = await request.formData();
  const type = formData.get("type");
  
  const { data } = await supabase.from('analytics').select('*').eq('id', 1);
  const current = (data && data.length > 0) ? data[0] : { view_count: 0, click_count: 0 };
  
  const updateKey = type === 'click' ? 'click_count' : 'view_count';
  await supabase.from('analytics')
    .update({ [updateKey]: (current[updateKey] || 0) + 1 })
    .eq('id', 1);
  
  return json({ success: true });
};

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];
export const meta = () => [{ title: 'WACCA - Your City. Your Culture.' }];

export default function Index() {
  const { stats } = useLoaderData();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [labels] = useState(() => ({
    view: ['Σ', 'Ψ', 'Φ', 'Δ', 'Ω', 'Ξ'][Math.floor(Math.random() * 6)],
    click: ['α', 'β', 'γ', 'δ', 'ε', 'ζ'][Math.floor(Math.random() * 6)]
  }));

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
    const count = isMobileNow ? 4 : 10;
    return Array.from({ length: count }).map((_, i) => ({
      length: isMobileNow ? 90 + Math.random() * 30 : 250 + Math.random() * 200,
      angle: (i - (count / 2)) * (isMobileNow ? 40 : 15) + (Math.random() * 4 - 2),
      delay: Math.random() * 0.8
    }));
  };

  const [leftNodes, setLeftNodes] = useState([]);
  const [rightNodes, setRightNodes] = useState([]);
  const [topNodes, setTopNodes] = useState([]);
  const [bottomNodes, setBottomNodes] = useState([]);

  useEffect(() => {
    setLeftNodes(getNodes());   // SHOP用
    setRightNodes(getNodes());  // CONCEPT用
    setTopNodes(getNodes());    // ARTICLES用
    setBottomNodes(getNodes()); // REQUEST用
  }, [isMobile]);

  const handleLogoClick = () => {
    if (!isOpen) { fireSound?.play(); fetcher.submit({ type: 'click' }, { method: "post" }); } 
    else { goSound?.play(); }
    setIsOpen(!isOpen);
  };

  useEffect(() => { document.body.classList.toggle('state1', isOpen); }, [isOpen]);

  return (
    <main>
      <div className="stats-display">
        {location.lat !== 0 ? `LOC: ${location.lat}, ${location.lng} | ` : ""}
        %{labels.view}＊5: {stats?.view_count} | 2｜6{labels.click}: {stats?.click_count}
      </div>

      <div className="viewport">
        {isOpen && (
          <>
            <div className="fixed-label shop-label">SHOP</div>
            <div className="fixed-label concept-label">CONCEPT</div>
            <div className="fixed-label articles-label">ARTICLES</div>
            <div className="fixed-label request-label">REQUEST</div>
          </>
        )}
        <div className={`logo-container ${isOpen ? 'is-active' : ''}`} onClick={handleLogoClick}>
          {!isOpen && <div className="enter-guide">［ENTER］</div>}
          <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
          <div className="nodes-layer">
            {/* 左側：SHOP */}
            {leftNodes.map((n, i) => (
              <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                <div className="line" /><Link to="/shop"><img src="/assets/master.png" className="node-img" alt="Shop" /></Link>
              </div>
            ))}
            {/* 右側：CONCEPT */}
            {rightNodes.map((n, i) => (
              <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                <div className="line" /><Link to="/concept"><img src="/assets/dick.png" className="node-img" alt="Concept" /></Link>
              </div>
            ))}
            {/* 上側：ARTICLES */}
            {topNodes.map((n, i) => (
              <div key={`t${i}`} className="node-item top" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                <div className="line" /><Link to="/articles"><img src="/assets/angr正面.png" className="node-img" alt="Articles" /></Link>
              </div>
            ))}
            {/* 下側：REQUEST */}
            {bottomNodes.map((n, i) => (
              <div key={`b${i}`} className="node-item bottom" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
                <div className="line" /><Link to="/request"><img src="/assets/py1.PNG" className="node-img" alt="Request" /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="landing-footer"><Link to="/policies">特定商取引法に基づく表記</Link></footer>
    </main>
  );
}