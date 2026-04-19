import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Radio } from 'lucide-react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
}

const FALLBACK_ARTICLES: Article[] = [
  { title: "Grok-3 architecture breakthrough in multimodal inference", link: "#", pubDate: "2024-03-20" },
  { title: "EU AI Act: Implications for Balkan tech corridors", link: "#", pubDate: "2024-03-19" },
  { title: "Anthropic releases Claude 4 preview for enterprise partners", link: "#", pubDate: "2024-03-18" },
];

export const RSSFeed = () => {
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const target = 'https://hnrss.org/frontpage?q=AI';
      let success = false;

      // Strategy 1: RSS2JSON (Direct JSON conversion, highly reliable)
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(target)}`, {
          signal: AbortSignal.timeout(5000)
        });
        const data = await response.json();
        if (data.status === 'ok' && data.items?.length > 0) {
          const mapped = data.items.slice(0, 5).map((item: any) => ({
            title: item.title || 'Untitled',
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString()
          }));
          setArticles(mapped);
          success = true;
        }
      } catch (e) {
        console.warn("Strategy 1 (RSS2JSON) failed, trying fallbacks...");
      }

      // Strategy 2: AllOrigins JSON Wrapper (More robust than /raw)
      if (!success) {
        try {
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`, {
            signal: AbortSignal.timeout(5000)
          });
          const data = await response.json();
          if (data.contents) {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, 'text/xml');
            const items = Array.from(xml.querySelectorAll('item')).slice(0, 5);
            if (items.length > 0) {
              const mapped = items.map(item => ({
                title: item.querySelector('title')?.textContent || 'Untitled',
                link: item.querySelector('link')?.textContent || '#',
                pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString()
              }));
              setArticles(mapped);
              success = true;
            }
          }
        } catch (e) {
          console.warn("Strategy 2 (AllOrigins JSON) failed, trying raw proxies...");
        }
      }

      // Strategy 3: Raw Proxies (Legacy fallback)
      if (!success) {
        const rawProxies = [
          'https://corsproxy.io/?',
          'https://api.codetabs.com/v1/proxy?quest='
        ];

        for (const proxy of rawProxies) {
          try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 6000);
            const response = await fetch(`${proxy}${encodeURIComponent(target)}`, {
              signal: controller.signal
            });
            clearTimeout(id);
            if (!response.ok) throw new Error('Proxy failed');
            const text = await response.text();
            if (!text || text.length < 100) throw new Error('Invalid response');
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'text/xml');
            const items = Array.from(xml.querySelectorAll('item')).slice(0, 5);
            if (items.length > 0) {
              const mapped = items.map(item => ({
                title: item.querySelector('title')?.textContent || 'Untitled',
                link: item.querySelector('link')?.textContent || '#',
                pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString()
              }));
              setArticles(mapped);
              success = true;
              break;
            }
          } catch (e) {
            console.warn(`Raw Proxy ${proxy} failed.`);
          }
        }
      }

      if (!success) {
        console.error("All RSS strategies exhausted. Operating on localized fallback data cache.");
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <section className="py-32 container mx-auto px-6 max-w-4xl">
      <div className="border border-white/10 bg-white/[0.01] overflow-hidden">
        <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-neon-orchid animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/60">
              GLOBAL_DATA_STREAM
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white/20" />
            <div className="w-1 h-1 bg-white/20" />
            <div className="w-1 h-1 bg-white/40" />
          </div>
        </div>

        <div className="divide-y divide-white/10">
          <AnimatePresence mode="popLayout">
            {articles.map((article, i) => (
              <motion.a
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 hover:bg-white/[0.03] transition-colors group"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-white/30 uppercase">
                    {new Date(article.pubDate).toLocaleDateString()}
                  </span>
                  <h3 className="text-sm md:text-lg font-bold group-hover:text-neon-orchid transition-colors leading-tight pr-4">
                    {article.title}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors shrink-0" />
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-white/[0.02] text-center">
            <button 
              onClick={() => window.location.reload()}
              className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors relative z-50 pointer-events-auto cursor-none"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? 'SYNCING...' : '[ REFRESH_STREAM ]'}
              </span>
            </button>
        </div>
      </div>
    </section>
  );
};
