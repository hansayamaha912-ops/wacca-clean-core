import { json } from "@remix-run/node";
import { Link, useLoaderData, useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import stylesUrl from "../styles/landing.css?url";

// サーバーサイドでのみ初期化（Vercel環境変数を利用）
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const loader = async () => {
  const { data } = await supabase.from('analytics').select('*').eq('id', 1).single();
  return json({ stats: data });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get("type");
  const { data } = await supabase.from('analytics').select('*').eq('id', 1).single();
  
  await supabase.from('analytics').update({
    [type === 'click' ? 'click_count' : 'view_count']: data[type === 'click' ? 'click_count' : 'view_count'] + 1
  }).eq('id', 1);
  return json({ success: true });
};

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];
export const meta = () => [{ title: 'WACCA - Your City. Your Culture.' }];

export default function Index() {
  const { stats } = useLoaderData();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 初回訪問のカウントアップ
  useEffect(() => {
    fetcher.submit({ type: 'view' }, { method: "post" });
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
    if (isMobileNow) {
      return Array.from({ length: 10 }).map((_, i) => ({
        length: 200,
        angle: (i % 2 === 0) ? (i * 5) : -(i * 5),
        delay: i * 0.1
      }));
    }
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
    setLeftNodes(getNodes());
    setRightNodes(getNodes());
  }, [isMobile]);

  const handleLogoClick = () => {
    if (!isOpen) { 
      fireSound?.play(); 
      // クリック時にカウントアップ
      fetcher.submit({ type: 'click' }, { method: "post" });
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
      {/* カウンター表示エリア */}
      <div className="stats-display">
        Views: {stats?.view_count} | Clicks: {stats?.click_count}
      </div>

      <div className={`logo-container ${isOpen ? 'is-active' : ''}`} onClick={handleLogoClick}>
        {/* ...以下、ロゴとノードのレンダリング... */}
        <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
        <div className="nodes-layer">
          {leftNodes.map((n, i) => (
            <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
              <div className="line" /><Link to="/products"><img src="/assets/master.png" className="node-img" alt="Master" /></Link>
            </div>
          ))}
          {rightNodes.map((n, i) => (
            <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg`, '--delay': `${n.delay}s` }}>
              <div className="line" /><img src="/assets/dick.png" className="node-img" alt="Dick" />
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