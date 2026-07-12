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
  await supabase.from('analytics').update({ [updateKey]: (current[updateKey] || 0) + 1 }).eq('id', 1);
  return json({ success: true });
};

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export default function Index() {
  const { stats } = useLoaderData();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    fetcher.submit({ type: 'view' }, { method: "post" });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude.toFixed(2), lng: pos.coords.longitude.toFixed(2) });
      });
    }
  }, []);

  const getNodes = () => {
    const count = 21;
    return Array.from({ length: count }).map((_, i) => ({
      length: 300 + Math.random() * 100,
      angle: (i - count / 2) * 3
    }));
  };

  const [leftNodes] = useState(getNodes());
  const [rightNodes] = useState(getNodes());

  return (
    <main>
      <div className="stats-display">
        {location.lat !== 0 ? `LOC: ${location.lat}, ${location.lng} | ` : ""}
        %＊5: {stats?.view_count} | 2｜6Φ: {stats?.click_count}
      </div>

      <div className="viewport">
        <div className={`logo-container ${isOpen ? 'is-active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <img src="/assets/IN.png" className="main-logo" alt="WACCA" />
          
          {!isOpen && <span className="enter-guide">ENTER</span>}
          
          <div className="nodes-layer">
            {leftNodes.map((n, i) => (
              <div key={`l${i}`} className="node-item left" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg` }}>
                <div className="line" />
                <Link to="/shop">
                  <img src="/assets/master.png" className="node-img" alt="Master" />
                  {i === Math.floor(leftNodes.length / 2) && (
                    <div className="l-line-container" style={{top: '-60px', left: '100px'}}>
                      <div className="l-shape" style={{borderLeft: '1px solid #000', borderBottom: '1px solid #000'}} />
                      <span className="digital-label" style={{left: '35px', top: '15px'}}>SHOP</span>
                    </div>
                  )}
                </Link>
              </div>
            ))}
            {rightNodes.map((n, i) => (
              <div key={`r${i}`} className="node-item right" style={{ '--len': `${n.length}px`, '--ang': `${n.angle}deg` }}>
                <div className="line" />
                <Link to="/concept">
                  <img src="/assets/dick.png" className="node-img" alt="Dick" />
                  {i === Math.floor(rightNodes.length / 2) && (
                    <div className="l-line-container" style={{top: '60px', left: '100px'}}>
                      <div className="l-shape" style={{borderLeft: '1px solid #000', borderTop: '1px solid #000'}} />
                      <span className="digital-label" style={{left: '35px', top: '-25px'}}>CONCEPT</span>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}