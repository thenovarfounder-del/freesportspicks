// FreeSportsPicks.pro — AI Blog Topic Queue
// 365 rotating topics organized by season, sport, and search intent

const BLOG_TOPICS = [
  // ── NFL (highest traffic — prioritize Sept-Feb) ──
  { slug:'how-to-read-nfl-point-spreads', title:'How to Read NFL Point Spreads Like a Pro', sport:'NFL', tags:['nfl','spreads','betting basics'], priority:10 },
  { slug:'nfl-ats-betting-guide', title:'NFL Against the Spread (ATS) Betting: Complete Guide', sport:'NFL', tags:['nfl','ats','guide'], priority:10 },
  { slug:'best-nfl-week-1-betting-strategies', title:'Best NFL Week 1 Betting Strategies That Actually Work', sport:'NFL', tags:['nfl','week 1','strategy'], priority:10 },
  { slug:'how-sharp-bettors-pick-nfl-games', title:'How Sharp Bettors Pick NFL Games: The Inside Approach', sport:'NFL', tags:['nfl','sharp money','strategy'], priority:9 },
  { slug:'nfl-home-underdog-betting-strategy', title:'Why Betting NFL Home Underdogs Is One of the Best Strategies', sport:'NFL', tags:['nfl','underdog','home field'], priority:9 },
  { slug:'nfl-divisional-games-betting-trends', title:'NFL Divisional Games Betting Trends You Need to Know', sport:'NFL', tags:['nfl','divisional','trends'], priority:8 },
  { slug:'how-weather-affects-nfl-betting', title:'How Weather Affects NFL Betting: Rain, Wind & Cold', sport:'NFL', tags:['nfl','weather','totals'], priority:8 },
  { slug:'nfl-injury-report-betting-guide', title:'How to Use the NFL Injury Report to Gain a Betting Edge', sport:'NFL', tags:['nfl','injuries','edge'], priority:9 },
  { slug:'monday-night-football-betting-trends', title:'Monday Night Football Betting Trends: What the Data Shows', sport:'NFL', tags:['nfl','mnf','primetime'], priority:8 },
  { slug:'nfl-over-under-betting-strategies', title:'NFL Over/Under Betting Strategies: When to Go Over vs Under', sport:'NFL', tags:['nfl','totals','over under'], priority:9 },
  { slug:'nfl-survivor-pool-strategy', title:'NFL Survivor Pool Strategy: How to Last All Season', sport:'NFL', tags:['nfl','survivor','pools'], priority:7 },
  { slug:'nfl-playoff-betting-guide', title:'NFL Playoff Betting Guide: Spreads, Totals & Best Bets', sport:'NFL', tags:['nfl','playoffs','postseason'], priority:9 },
  { slug:'super-bowl-prop-bets-guide', title:'Super Bowl Prop Bets: The Best Props to Bet Every Year', sport:'NFL', tags:['nfl','super bowl','props'], priority:10 },
  { slug:'nfl-bye-week-betting-strategy', title:'How NFL Bye Weeks Affect Betting Lines and What to Do', sport:'NFL', tags:['nfl','bye week','rest'], priority:7 },
  { slug:'best-nfl-betting-systems', title:'Best NFL Betting Systems With Proven Track Records', sport:'NFL', tags:['nfl','systems','profitable'], priority:8 },
  { slug:'nfl-quarterback-injuries-betting', title:'How to Bet When an NFL Quarterback Gets Injured', sport:'NFL', tags:['nfl','qb','injuries'], priority:8 },
  { slug:'nfl-line-movement-guide', title:'NFL Line Movement: How to Track and Profit From It', sport:'NFL', tags:['nfl','line movement','sharp'], priority:9 },
  { slug:'nfl-primetime-betting-trends', title:'NFL Primetime Games Betting Trends: SNF, MNF, TNF Data', sport:'NFL', tags:['nfl','primetime','trends'], priority:7 },
  { slug:'fading-the-public-nfl', title:'Fading the Public in NFL Betting: Does It Really Work?', sport:'NFL', tags:['nfl','public','contrarian'], priority:8 },
  { slug:'nfl-totals-weather-guide', title:'NFL Totals and Weather: The Wind Speed Betting Guide', sport:'NFL', tags:['nfl','weather','totals'], priority:7 },

  // ── NBA ──
  { slug:'nba-betting-guide-beginners', title:'NBA Betting Guide for Beginners: Spreads, Totals & Moneylines', sport:'NBA', tags:['nba','guide','beginners'], priority:9 },
  { slug:'nba-back-to-back-betting-strategy', title:'NBA Back-to-Back Betting Strategy: Fading Tired Teams', sport:'NBA', tags:['nba','back to back','fatigue'], priority:9 },
  { slug:'best-nba-betting-systems', title:'Best NBA Betting Systems That Beat the Closing Line', sport:'NBA', tags:['nba','systems','clv'], priority:8 },
  { slug:'nba-home-court-advantage-betting', title:'How Much Is NBA Home Court Advantage Actually Worth?', sport:'NBA', tags:['nba','home court','advantage'], priority:7 },
  { slug:'nba-totals-betting-guide', title:'NBA Totals Betting: Over/Under Strategy and Key Trends', sport:'NBA', tags:['nba','totals','pace'], priority:8 },
  { slug:'march-madness-betting-guide', title:'March Madness Betting Guide: Brackets, Upsets & Best Bets', sport:'CBB', tags:['ncaab','march madness','upsets'], priority:10 },
  { slug:'nba-playoffs-betting-trends', title:'NBA Playoffs Betting Trends: What History Tells Us', sport:'NBA', tags:['nba','playoffs','trends'], priority:8 },
  { slug:'nba-player-props-guide', title:'NBA Player Props Betting: How to Find the Best Values', sport:'NBA', tags:['nba','props','player'], priority:9 },
  { slug:'fade-nba-favorites-strategy', title:'Why Fading Heavy NBA Favorites Is a Profitable Strategy', sport:'NBA', tags:['nba','favorites','contrarian'], priority:7 },
  { slug:'nba-live-betting-guide', title:'NBA Live Betting Strategy: How to Win Betting In-Game', sport:'NBA', tags:['nba','live betting','in-game'], priority:8 },

  // ── BETTING FUNDAMENTALS (evergreen, high search volume) ──
  { slug:'what-is-a-parlay-bet', title:'What Is a Parlay Bet? Complete Guide to Parlays in Sports Betting', sport:'General', tags:['parlay','basics','guide'], priority:10 },
  { slug:'how-to-read-betting-odds', title:'How to Read Sports Betting Odds: American, Decimal & Fractional', sport:'General', tags:['odds','basics','how to'], priority:10 },
  { slug:'what-is-a-point-spread', title:'What Is a Point Spread? The Complete Beginner\'s Guide', sport:'General', tags:['spread','basics','guide'], priority:10 },
  { slug:'moneyline-betting-guide', title:'Moneyline Betting Guide: How Moneylines Work and When to Bet Them', sport:'General', tags:['moneyline','guide','basics'], priority:9 },
  { slug:'what-is-a-push-in-betting', title:'What Is a Push in Sports Betting? Everything You Need to Know', sport:'General', tags:['push','tie','basics'], priority:8 },
  { slug:'juice-vig-explained', title:'What Is the Juice (Vig) in Sports Betting and How to Minimize It', sport:'General', tags:['juice','vig','house edge'], priority:8 },
  { slug:'bankroll-management-sports-betting', title:'Bankroll Management for Sports Bettors: The Complete System', sport:'General', tags:['bankroll','money management','discipline'], priority:10 },
  { slug:'unit-betting-system-explained', title:'The Unit Betting System: How Pros Manage Their Bankroll', sport:'General', tags:['units','bankroll','system'], priority:9 },
  { slug:'closing-line-value-explained', title:'Closing Line Value (CLV): The Most Important Metric in Betting', sport:'General', tags:['clv','closing line','advanced'], priority:8 },
  { slug:'sharp-vs-public-betting', title:'Sharp vs Public Betting: How to Tell the Difference', sport:'General', tags:['sharp','public','smart money'], priority:9 },
  { slug:'best-sportsbooks-comparison', title:'Best Sportsbooks Compared: Where to Bet for the Best Lines', sport:'General', tags:['sportsbooks','comparison','review'], priority:9 },
  { slug:'line-shopping-sports-betting', title:'Line Shopping: How to Find the Best Odds Every Single Day', sport:'General', tags:['line shopping','odds','value'], priority:9 },
  { slug:'what-is-a-teaser-bet', title:'What Is a Teaser Bet? When Teasers Are Worth It', sport:'General', tags:['teaser','nfl','guide'], priority:7 },
  { slug:'live-betting-strategy-guide', title:'Live Betting Strategy: How to Win Betting In-Play', sport:'General', tags:['live betting','in-game','strategy'], priority:8 },
  { slug:'parlay-strategy-guide', title:'Parlay Strategy: How to Build Parlays That Actually Win', sport:'General', tags:['parlay','strategy','legs'], priority:9 },
  { slug:'prop-betting-guide', title:'Prop Bet Guide: How to Find Value in Player and Game Props', sport:'General', tags:['props','player props','value'], priority:9 },
  { slug:'sports-betting-mistakes-beginners', title:'10 Sports Betting Mistakes Beginners Always Make (And How to Avoid Them)', sport:'General', tags:['mistakes','beginners','tips'], priority:10 },
  { slug:'expected-value-sports-betting', title:'Expected Value (+EV) in Sports Betting: How to Find Profitable Bets', sport:'General', tags:['ev','value','advanced'], priority:8 },
  { slug:'how-to-beat-the-closing-line', title:'How to Beat the Closing Line: The Secret Pros Use', sport:'General', tags:['closing line','sharp','edge'], priority:7 },
  { slug:'arbitrage-betting-explained', title:'Arbitrage Betting Explained: How to Lock In Guaranteed Profit', sport:'General', tags:['arbitrage','arb','guaranteed'], priority:7 },

  // ── MLB ──
  { slug:'mlb-betting-guide', title:'MLB Betting Guide: Run Lines, Totals & Moneylines Explained', sport:'MLB', tags:['mlb','guide','basics'], priority:9 },
  { slug:'mlb-run-line-betting-strategy', title:'MLB Run Line Betting Strategy: When to Take -1.5 or +1.5', sport:'MLB', tags:['mlb','run line','strategy'], priority:8 },
  { slug:'mlb-starting-pitcher-betting', title:'How Starting Pitchers Affect MLB Betting Lines', sport:'MLB', tags:['mlb','pitcher','analysis'], priority:9 },
  { slug:'mlb-totals-betting-guide', title:'MLB Totals Betting: Weather, Ballparks & Pitching Matchups', sport:'MLB', tags:['mlb','totals','over under'], priority:8 },
  { slug:'best-mlb-ballparks-for-over', title:'Best MLB Ballparks to Bet the Over (and Which to Fade)', sport:'MLB', tags:['mlb','ballpark','totals'], priority:7 },
  { slug:'mlb-first-five-innings-betting', title:'MLB First Five Innings Betting: Strategy and Best Situations', sport:'MLB', tags:['mlb','f5','first five'], priority:8 },

  // ── COLLEGE FOOTBALL ──
  { slug:'college-football-betting-guide', title:'College Football Betting Guide: How to Bet CFB Spreads and Totals', sport:'CFB', tags:['cfb','guide','college'], priority:9 },
  { slug:'best-cfb-betting-systems', title:'Best College Football Betting Systems With Documented Results', sport:'CFB', tags:['cfb','systems','trends'], priority:8 },
  { slug:'cfb-home-underdog-strategy', title:'College Football Home Underdog Strategy: A Bettor\'s Edge', sport:'CFB', tags:['cfb','underdog','home'], priority:8 },
  { slug:'ncaa-football-totals-betting', title:'College Football Totals Betting: Trends That Win Every Season', sport:'CFB', tags:['cfb','totals','over under'], priority:7 },
  { slug:'college-football-bowl-game-betting', title:'College Football Bowl Game Betting: Motivation and Trends', sport:'CFB', tags:['cfb','bowl','postseason'], priority:8 },

  // ── STRATEGY & ADVANCED ──
  { slug:'how-to-track-betting-record', title:'How to Track Your Sports Betting Record Properly', sport:'General', tags:['record keeping','tracking','discipline'], priority:8 },
  { slug:'sports-betting-for-beginners', title:'Sports Betting for Beginners: Everything You Need to Start', sport:'General', tags:['beginners','guide','start'], priority:10 },
  { slug:'how-to-read-steam-moves', title:'What Are Steam Moves in Sports Betting? How to React', sport:'General', tags:['steam','line movement','sharp'], priority:7 },
  { slug:'reverse-line-movement-guide', title:'Reverse Line Movement: The Most Powerful Signal in Sports Betting', sport:'General', tags:['rlm','sharp','movement'], priority:8 },
  { slug:'kelly-criterion-betting', title:'The Kelly Criterion: The Math Behind Perfect Bet Sizing', sport:'General', tags:['kelly','math','advanced'], priority:6 },
  { slug:'nfl-best-bets-week-guide', title:'How We Pick Our Best NFL Bets Each Week (Our Process)', sport:'NFL', tags:['nfl','process','methodology'], priority:9 },
  { slug:'sports-betting-discipline', title:'Sports Betting Discipline: The Hardest Part and How to Master It', sport:'General', tags:['discipline','psychology','tilt'], priority:9 },
  { slug:'avoiding-tilt-sports-betting', title:'How to Avoid Tilt in Sports Betting: The Mental Game', sport:'General', tags:['tilt','psychology','mental'], priority:8 },
  { slug:'understanding-public-betting-percentages', title:'Understanding Public Betting Percentages and How to Use Them', sport:'General', tags:['public','percentages','data'], priority:8 },
  { slug:'nfl-picks-how-we-make-them', title:'Free NFL Picks: Our Exact Process From Line Open to Release', sport:'NFL', tags:['nfl','methodology','transparent'], priority:9 },

  // ── NHL ──
  { slug:'nhl-betting-guide', title:'NHL Betting Guide: Puck Lines, Totals & Moneylines Explained', sport:'NHL', tags:['nhl','guide','hockey'], priority:8 },
  { slug:'nhl-goalie-betting-strategy', title:'How NHL Goalie Matchups Should Change Your Betting Approach', sport:'NHL', tags:['nhl','goalie','strategy'], priority:7 },

  // ── UFC / MMA ──
  { slug:'ufc-betting-guide', title:'UFC Betting Guide: How to Bet MMA Fights and Find Value', sport:'MMA', tags:['ufc','mma','guide'], priority:8 },
  { slug:'how-to-bet-ufc-props', title:'UFC Prop Bets: Method of Victory, Round Betting & More', sport:'MMA', tags:['ufc','props','method'], priority:7 },

  // ── SEASONAL ANCHORS ──
  { slug:'nfl-season-preview-betting', title:'NFL Season Preview: Best Futures, Win Totals & Division Picks', sport:'NFL', tags:['nfl','futures','season preview'], priority:10 },
  { slug:'super-bowl-futures-guide', title:'How to Bet Super Bowl Futures: Timing, Value & Picks', sport:'NFL', tags:['super bowl','futures','longshots'], priority:9 },
  { slug:'nba-championship-futures', title:'NBA Championship Futures: Best Bets and Long Shots', sport:'NBA', tags:['nba','futures','championship'], priority:8 },
  { slug:'march-madness-upsets-guide', title:'March Madness Upsets: Seeds, Trends & Profitable Patterns', sport:'CBB', tags:['march madness','upsets','seeds'], priority:9 },
  { slug:'world-series-betting-guide', title:'World Series Betting Guide: Spreads, Totals & Series Props', sport:'MLB', tags:['mlb','world series','postseason'], priority:8 },
];

if (typeof module !== 'undefined') module.exports = { BLOG_TOPICS };
