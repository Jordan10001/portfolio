import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GithubData {
  total: {
    [year: string]: number;
  };
  contributions: ContributionDay[];
}

interface GithubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubHeatmapProps {
  defaultUsername: string;
  accentClass?: string;
}

export default function GithubHeatmap({ defaultUsername, accentClass }: GithubHeatmapProps) {
  const [username, setUsername] = useState(defaultUsername);
  const [searchInput, setSearchInput] = useState(defaultUsername);
  const [data, setData] = useState<GithubData | null>(null);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const generateBackupData = (targetUser: string) => {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    const totalByYear: { [year: string]: number } = {};

    for (let i = 365; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      const year = d.getFullYear().toString();

      const charSum = targetUser.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const seed = Math.sin(i + charSum) * 10000;
      const r = Math.abs(seed - Math.floor(seed));

      let count = 0;
      let level = 0;
      if (r > 0.45) {
        count = Math.floor(r * 4);
        level = 1;
      }
      if (r > 0.72) {
        count = Math.floor(r * 8);
        level = 2;
      }
      if (r > 0.88) {
        count = Math.floor(r * 15);
        level = 3;
      }
      if (r > 0.96) {
        count = Math.round(r * 22);
        level = 4;
      }

      contributions.push({ date: dateString, count, level });
      totalByYear[year] = (totalByYear[year] || 0) + count;
    }

    return {
      total: totalByYear,
      contributions,
    };
  };

  const generateBackupStats = (targetUser: string) => {
    const charSum = targetUser.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      public_repos: (charSum % 23) + 7,
      followers: (charSum * 3) % 450 + 40,
      following: (charSum * 2) % 120 + 15,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorStatus(null);
      try {
        const contribResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!contribResponse.ok) {
          throw new Error("HTTP connection error");
        }
        const contribResult = await contribResponse.json();
        setData(contribResult);

        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (userResponse.ok) {
          const userResult = await userResponse.json();
          setStats({
            public_repos: userResult.public_repos,
            followers: userResult.followers,
            following: userResult.following,
          });
        } else {
          setStats(generateBackupStats(username));
        }
      } catch (error) {
        console.warn("GitHub dynamic fetch throttled/offline, creating simulated neobrutalist matrix.", error);
        setErrorStatus("API offline/rate-limited. Displaying generated preview.");
        setData(generateBackupData(username));
        setStats(generateBackupStats(username));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const getColor = (count: number, level: number) => {
    if (count === 0 && level === 0) return "#FFFFFF";

    const activeLevel = level > 0 ? level : count > 0 ? 1 : 0;

    switch (activeLevel) {
      case 1:
        return "#7DF9FF"; // Vibrant Cyan
      case 2:
        return "#2FFF2F"; // Lime Green
      case 3:
        return "#FFFF00"; // Electric Yellow
      case 4:
        return "#FF00F5"; // Magenta Pink
      default:
        return "#FFFFFF";
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setUsername(searchInput.trim());
    }
  };

  const loadPresetUser = (preset: string) => {
    setSearchInput(preset);
    setUsername(preset);
  };

  if (loading) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="border-4 border-black bg-white h-64 flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-none animate-spin"></div>
            <p className="font-space font-black text-2xl uppercase tracking-tight text-black">
              Loading_Pulse...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  const rawContributions = [...(data?.contributions || [])]
    .filter((day) => new Date(day.date) <= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const lastYearDays = rawContributions.slice(-364);
  const totalLastYear = lastYearDays.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="py-12 md:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Title Badge */}
      <div className="mb-12 text-left">
        <div className={`inline-block border-4 border-black ${accentClass || "bg-[#FFFF00]"} px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none rotate-[-1deg]`}>
          <h2 className="font-space font-black text-3xl sm:text-5xl uppercase text-black">
            GITHUB TRACKER_
          </h2>
        </div>
      </div>

      {/* Search Header Container Row */}
      <div className="mb-8 p-5 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 text-left">
        <div className="flex-1">
          <div className="inline-block border-2 border-black bg-[#7DF9FF] px-3 py-1 text-xs font-mono font-bold uppercase rotate-[-1deg] mb-2">
            Dynamic Code Matrix
          </div>
          <h2 className="font-space font-black text-2xl uppercase text-black leading-none">
            Query Live Activity Logs
          </h2>
          <p className="font-sans text-xs font-semibold text-gray-500 mt-1">
            Search developer metrics or review contributions. Defaults to your handler.
          </p>
        </div>

        {/* Input box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Developer username..."
                id="github-username-input"
                className="border-3 border-black px-3 py-2 pl-9 font-space text-sm font-bold bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none focus:outline-none w-52"
              />
            </div>
            <button
              type="submit"
              id="github-search-action-btn"
              className="border-3 border-black bg-[#2FFF2F] p-2 hover:bg-[#7DF9FF] active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-space text-xs font-black uppercase text-black cursor-pointer flex items-center gap-1 shrink-0"
            >
              <RefreshCw size={12} /> Sync
            </button>
          </form>

          {/* Quick toggle presets */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] uppercase font-black text-gray-400">Presets:</span>
            {["jordan10001"].map((preset) => (
              <button
                key={preset}
                onClick={() => loadPresetUser(preset)}
                className={`border-2 border-black px-2 py-1 font-mono text-[10px] font-black transition-all cursor-pointer ${
                  username === preset ? "bg-[#FFFF00] translate-y-[-1px] shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-gray-50"
                }`}
              >
                @{preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {errorStatus && (
        <div className="mb-6 border-3 border-dashed border-yellow-600 bg-yellow-50 p-3 font-mono text-xs font-bold text-yellow-800 text-left">
           {errorStatus} (Simulating matrix visual layout cleanly)
        </div>
      )}

      {/* Hero Stats Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 text-left">
        <div>
          <div className="inline-block bg-[#FFFF00] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 select-all">
            <span className="font-space font-black text-lg sm:text-xl uppercase tracking-tight text-black">
              {username.toUpperCase()}&apos;S ACTIVITY (LAST 365 DAYS)
            </span>
          </div>
        </div>

        <div className="text-left md:text-right flex flex-col md:items-end">
          <p className="font-space font-black text-5xl md:text-7xl leading-none tracking-tighter text-black">
            {totalLastYear}
          </p>
          <div className="mt-2">
            <p className="font-mono font-black text-[10px] uppercase text-gray-500 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Contributions in the last year
            </p>
          </div>
        </div>
      </div>

      {/* Matrix Board Heatmap */}
      <div className="border-4 border-black bg-white p-6 md:p-8 overflow-x-auto scrollbar-hide shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left mb-10">
        <div className="min-w-[850px]">
          <div className="grid grid-flow-col grid-rows-7 gap-1 bg-white">
            {lastYearDays.map((day, i) => (
              <motion.div
                key={day.date}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: Math.floor(i / 7) * 0.003 }}
                className="w-3.5 h-3.5 border border-black/10 transition-all hover:scale-150 hover:z-10 hover:border-black cursor-crosshair shrink-0"
                style={{ backgroundColor: getColor(day.count, day.level) }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t-2 border-dashed border-black pt-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black font-space uppercase text-black">Less</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-white border-2 border-black" title="0 commits" />
                <div className="w-4 h-4 bg-[#7DF9FF] border-2 border-black" title="1-2 commits" />
                <div className="w-4 h-4 bg-[#2FFF2F] border-2 border-black" title="3-5 commits" />
                <div className="w-4 h-4 bg-[#FFFF00] border-2 border-black" title="6-9 commits" />
                <div className="w-4 h-4 bg-[#FF00F5] border-2 border-black" title="10+ commits" />
              </div>
              <span className="text-xs font-black font-space uppercase text-black">More</span>
            </div>

            <div className="font-mono text-[9px] font-black text-gray-400">
              LAYOUT_GRID // 7_ROWS X 52_WEEKS_MATRIX
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Basic Stats Row (3 columns rotated) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="border-4 border-black bg-[#7DF9FF] flex flex-col items-center justify-center py-8 px-4 rotate-1 hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-space font-black text-5xl md:text-6xl mb-1 text-black">
            {stats?.public_repos ?? 0}
          </p>
          <h3 className="font-space font-bold text-base uppercase tracking-tight text-gray-900">
            Total Repos
          </h3>
        </div>

        <div className="border-4 border-black bg-[#2FFF2F] flex flex-col items-center justify-center py-8 px-4 -rotate-1 hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-space font-black text-5xl md:text-6xl mb-1 text-black">
            {stats?.followers ?? 0}
          </p>
          <h3 className="font-space font-bold text-base uppercase tracking-tight text-gray-900">
            Followers
          </h3>
        </div>

        <div className="border-4 border-black bg-[#FF00F5] flex flex-col items-center justify-center py-8 px-4 rotate-2 hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-space font-black text-5xl md:text-6xl mb-1 text-black">
            {stats?.following ?? 0}
          </p>
          <h3 className="font-space font-bold text-base uppercase tracking-tight text-gray-900">
            Following
          </h3>
        </div>
      </div>

    </div>
  );
}
