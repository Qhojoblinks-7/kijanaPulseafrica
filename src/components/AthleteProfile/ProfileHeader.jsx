import React from 'react';

// Import athlete-specific images from your assets
// Ensure these paths are correct based on your project structure.

// --- Stat Configuration Definitions ---
const BASKETBALL_STATS_CONFIG = [
  { key: 'mp', label: 'MP' },
  { key: 'fg', label: 'FG%' },
  { key: '3p', label: '3P%' },
  { key: 'ft', label: 'FT%' },
  { key: 'ppg', label: 'PPG' },
  { key: 'rpg', label: 'RPG' },
  { key: 'apg', label: 'APG' },
  { key: 'bpg', label: 'BPG' },
];

const FOOTBALL_STATS_CONFIG = [
  { key: 'appearances', label: 'App' },
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Ast' },
  { key: 'passAccuracy', label: 'Pass%' },
  { key: 'tackles', label: 'Tkl' },
  { key: 'yellowCards', label: 'YC' },
  { key: 'redCards', label: 'RC' },
  { key: 'cleanSheets', label: 'CS' },
];

const ATHLETICS_STATS_CONFIG = [
  { key: 'events', label: 'Events' },
  { key: 'pb100m', label: 'PB 100m' },
  { key: 'pb200m', label: 'PB 200m' },
  { key: 'medals', label: 'Medals' },
  { key: 'rank', label: 'Rank' },
  { key: 'avgSpeed', label: 'Avg Spd' },
  { key: 'starts', label: 'Starts' },
  { key: 'form', label: 'Form' },
];

const VOLLEYBALL_STATS_CONFIG = [
  { key: 'sets', label: 'Sets' },
  { key: 'assists', label: 'Assists' },
  { key: 'blocks', label: 'Blocks' },
  { key: 'aces', label: 'Aces' },
  { key: 'digs', label: 'Digs' },
  { key: 'serviceEff', label: 'Serv Eff' },
  { key: 'attackingPct', label: 'Atk %' },
  { key: 'games', label: 'Games' },
];

const SWIMMING_STATS_CONFIG = [
  { key: 'events', label: 'Events' },
  { key: 'pb50m', label: 'PB 50m' },
  { key: 'pb100m', label: 'PB 100m' },
  { key: 'medals', label: 'Medals' },
  { key: 'rank', label: 'Rank' },
  { key: 'strokes', label: 'Strokes' },
  { key: 'starts', label: 'Starts' },
  { key: 'turns', label: 'Turns' },
];

const HANDBALL_STATS_CONFIG = [
  { key: 'games', label: 'Games' },
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'steals', label: 'Steals' },
  { key: 'blocks', label: 'Blocks' },
  { key: 'shots', label: 'Shots' },
  { key: 'penalties', label: 'Pens' },
  { key: 'discipline', label: 'Disc' },
];

const TENNIS_STATS_CONFIG = [
  { key: 'matches', label: 'Matches' },
  { key: 'wins', label: 'Wins' },
  { key: 'losses', label: 'Losses' },
  { key: 'tournaments', label: 'Tours' },
  { key: 'aces', label: 'Aces' },
  { key: 'forehand', label: 'F.Hand' },
  { key: 'backhand', label: 'B.Hand' },
  { key: 'serveWin', label: 'Serv Win%' },
];

const TABLE_TENNIS_STATS_CONFIG = [
  { key: 'matches', label: 'Matches' },
  { key: 'wins', label: 'Wins' },
  { key: 'losses', label: 'Losses' },
  { key: 'tournaments', label: 'Tours' },
  { key: 'serves', label: 'Serves' },
  { key: 'smashes', label: 'Smashes' },
  { key: 'spins', label: 'Spins' },
  { key: 'defVolley', label: 'Def Volley' },
];

const RUGBY_STATS_CONFIG = [
  { key: 'matches', label: 'Matches' },
  { key: 'tries', label: 'Tries' },
  { key: 'tackles', label: 'Tackles' },
  { key: 'carries', label: 'Carries' },
  { key: 'metersRun', label: 'Meters Run' },
  { key: 'turnovers', label: 'Turnovers' },
  { key: 'lineouts', label: 'Lineouts' },
  { key: 'scrum', label: 'Scrum' },
];

const BADMINTON_STATS_CONFIG = [
  { key: 'matches', label: 'Matches' },
  { key: 'wins', label: 'Wins' },
  { key: 'losses', label: 'Losses' },
  { key: 'tournaments', label: 'Tours' },
  { key: 'smashes', label: 'Smashes' },
  { key: 'drops', label: 'Drops' },
  { key: 'netPlay', label: 'Net Play' },
  { key: 'defense', label: 'Defense' },
];

const FIELD_HOCKEY_STATS_CONFIG = [
  { key: 'games', label: 'Games' },
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'tackles', label: 'Tackles' },
  { key: 'passes', label: 'Passes' },
  { key: 'interceptions', label: 'Interc' },
  { key: 'penaltyCorners', label: 'PC' },
  { key: 'fieldCoverage', label: 'Coverage' },
];

const TAEKWONDO_STATS_CONFIG = [
  { key: 'matches', label: 'Matches' },
  { key: 'wins', label: 'Wins' },
  { key: 'losses', label: 'Losses' },
  { key: 'medals', label: 'Medals' },
  { key: 'belts', label: 'Belts' },
  { key: 'kicks', label: 'Kicks' },
  { key: 'punches', label: 'Punches' },
  { key: 'defense', label: 'Defense' },
];


const ProfileHeader = ({ athlete }) => {
  if (!athlete) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-900 min-h-[50vh] flex items-center justify-center">
        Loading athlete profile header...
      </div>
    );
  }

  // Function to get the correct stat configuration based on sportType
  const getStatConfig = (sportType) => {
    switch (sportType) {
      case 'basketball': return BASKETBALL_STATS_CONFIG;
      case 'football': return FOOTBALL_STATS_CONFIG;
      case 'athletics': return ATHLETICS_STATS_CONFIG;
      case 'volleyball': return VOLLEYBALL_STATS_CONFIG;
      case 'swimming': return SWIMMING_STATS_CONFIG;
      case 'handball': return HANDBALL_STATS_CONFIG;
      case 'tennis': return TENNIS_STATS_CONFIG;
      case 'table_tennis': return TABLE_TENNIS_STATS_CONFIG;
      case 'rugby': return RUGBY_STATS_CONFIG;
      case 'badminton': return BADMINTON_STATS_CONFIG;
      case 'field_hockey': return FIELD_HOCKEY_STATS_CONFIG;
      case 'taekwondo': return TAEKWONDO_STATS_CONFIG;
      default:
        console.warn(`No specific stat configuration for sportType: ${sportType}. Displaying generic stats.`);
        // Fallback to a generic config or empty array if no match
        return [
          { key: 'games', label: 'Games' },
          { key: 'wins', label: 'Wins' },
          { key: 'losses', label: 'Losses' },
          { key: 'score', label: 'Score' },
        ];
    }
  };

  const currentStatConfig = getStatConfig(athlete.sportType);

  // Helper function to render stat row with BLURRED background image
  // This function will now always try to lay out items horizontally based on responsive grid columns.
  const renderStatRow = (stats, imageUrl, statConfig) => {
    if (!stats || !statConfig || statConfig.length === 0) {
      return null;
    }

    // The grid columns are now defined to make sure they always display horizontally,
    // wrapping based on standard Tailwind breakpoints.
    // We aim for 2 columns on small, 4 on medium, and 8 on desktop.
    // The inner flex-col ensures label is above value for each stat.
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-x-0.5 gap-y-1 text-center font-bold text-sm md:text-lg relative overflow-hidden p-2 rounded-lg">
        {/* Blurred background image element */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Athlete background"
            className="absolute inset-0 w-full h-full object-cover filter blur-md z-[-1]"
          />
        )}

        {/* Dark overlay for readability */}
        {imageUrl && <div className="absolute inset-0 bg-black opacity-70 z-0"></div>}

        {/* Combined Headers and Values: Each stat (header + value) is now a single grid item/column */}
        {statConfig.map((item, index) => (
          <div key={`stat-col-${item.key}-${index}`} className="flex flex-col items-center justify-center relative z-10 p-1">
            {/* Header */}
            <span className="text-xs md:text-sm text-gray-400 font-bold mb-1">
              {item.label}
            </span>
            {/* Value */}
            <span className="text-white text-xs md:text-xl">
              {stats[item.key] !== undefined ? stats[item.key] : '-'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="relative mt-4 lg:mt-16 w-full min-h-[50vh] md:min-h-[70vh] bg-gray-900 backdrop-blur-3xl text-white flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 py-4">

      {/* Container for Div1 and Div2: Always flex-row */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-row items-stretch justify-between gap-x-2 md:gap-x-4 lg:gap-x-8">

        {/* Div 1: Left content (Athlete's Core Info) */}
        <div className="flex-1 min-w-0 p-2 md:p-4 lg:p-6 rounded-l-lg shadow-xl bg-gradient-to-t from-black/20 to-transparent">
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <div>
              <p className="text-base md:text-xl font-normal text-gray-300">{athlete.firstName}</p>
              <h1 className="text-2xl md:text-5xl font-extrabold leading-tight text-white uppercase">
                {athlete.lastName}
              </h1>
            </div>
            {/* Right Side of Div1: Current school Logo | Team Logo | position | Jersey Number */}
            <div className="flex flex-col items-end text-right text-xs md:text-sm">
              <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                {athlete.schoolLogo && <img src={athlete.schoolLogo} alt="School Logo" className="w-15 h-15 md:w-25 md:h-25 rounded-full bg-transparent p-0.5 md:p-1" />}
                {athlete.teamLogo && <img src={athlete.teamLogo} alt="Team Logo" className="w-15 h-15 md:w-25 md:h-25 rounded-full bg-transparent -ml-10 p-0.5 md:p-1" />}
              </div>
              <p className="font-semibold text-base md:text-xl text-gamepulse-yellow">{athlete.position}</p>
              <p className="text-gray-300 text-base md:text-xl">{athlete.jerseyNumber}</p>
            </div>
          </div>

          <hr className="border-t border-gamepulse-orange mb-2" />

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm md:text-lg font-semibold text-gray-300 mb-2">
            <p>Height: <span className="font-bold text-white">{athlete.height}</span></p>
            <p>Weight: <span className="font-bold text-white">{athlete.weight}</span></p>
          </div>

          <hr className="border-t border-gray-700 mb-2" />

          <div className="space-y-1 text-xs md:text-base text-gray-300">
            <p>Born: <span className="font-semibold text-white">{athlete.bornDate}</span></p>
            <p>From: <span className="font-bold text-white">{athlete.fromLocation}</span></p>
            <p>Sports Debut: <span className="font-bold text-white">{athlete.sportsDebut}</span></p>
            <p>Previous location: <span className="font-bold text-white">{athlete.previousLocation}</span></p>
          </div>
        </div>

        {/* Div 2: Right content (Full Athlete Image) */}
        <div className="flex-1 relative z-20 min-w-0 overflow-hidden rounded-r-lg shadow-xl min-h-[200px] md:min-h-[300px] lg:min-h-0">
          {athlete.athleteFullImage && (
            <img
              src={athlete.athleteFullImage}
              alt={`${athlete.fullName}`}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
      </div>

      {/* Div 3: Stats (bottom row, higher z-index, overlaps) - BLURRED */}
      <div className="relative z-40 mt-4 w-full max-w-7xl mx-auto md:-mt-24 lg:-mt-48 p-3 md:p-8 rounded-lg shadow-xl backdrop-filter backdrop-blur-md mb-20">
        {/* Postseason Stats */}
        <h2 className="font-bold text-sm md:text-xl lg:text-2xl text-white mb-1">Postseason</h2>
        <hr className="border-t border-gamepulse-yellow mb-1" />
        {athlete.postseasonStats && currentStatConfig.length > 0 ? (
          <>
            {/* Mobile View (Below MD breakpoint): Display in chunks of 4 if possible,
                otherwise adapt using the renderStatRow's internal grid. */}
            <div className="md:hidden">
              {/* If you want exactly 2 stats per row on very small screens, you'd apply grid-cols-2 here
                  and ensure renderStatRow is simple or always uses grid-cols-2.
                  Given your screenshot, it looks like 2x2 blocks are desired on mobile.
                  Let's make sure the `renderStatRow`'s grid-cols for smaller screens aligns with `chunkSize`. */}

              {(() => {
                // Determine chunkSize based on available stats for better distribution.
                // If currentStatConfig has 8, and we want 2 rows of 4 on mobile, chunkSize is 4.
                // If it has 6, and we want 2 rows of 3, chunkSize is 3.
                // Let's set a default of 4, but be mindful of smaller total stat counts.
                const mobileChunkSize = Math.min(4, currentStatConfig.length > 0 ? currentStatConfig.length : 1);
                const rows = [];
                for (let i = 0; i < currentStatConfig.length; i += mobileChunkSize) {
                  const chunk = currentStatConfig.slice(i, i + mobileChunkSize);
                  rows.push(
                    <React.Fragment key={`postseason-mobile-row-${i}`}>
                      {/* renderStatRow itself defines how many columns based on its grid-cols rules.
                          We pass the chunk, and its internal grid will arrange those items. */}
                      {renderStatRow(athlete.postseasonStats, athlete.athleteFullImage, chunk)}
                      {i + mobileChunkSize < currentStatConfig.length && <div className="mt-4"></div>}
                    </React.Fragment>
                  );
                }
                return rows;
              })()}
            </div>

            {/* Desktop View (MD breakpoint and above): Single row, using the full config */}
            <div className="hidden md:block">
              {renderStatRow(athlete.postseasonStats, athlete.athleteFullImage, currentStatConfig)}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-xs md:text-base">No postseason stats available.</p>
        )}

        {/* Career Stats */}
        <h2 className="font-bold text-sm md:text-xl lg:text-2xl text-white mt-4 mb-1">Career Stats</h2>
        <hr className="border-t border-gamepulse-orange mb-1" />
        {athlete.careerStats && currentStatConfig.length > 0 ? (
          <>
            {/* Mobile View (Below MD breakpoint): Display in chunks.
                Adjust chunkSize for career stats if different from postseason. */}
            <div className="md:hidden">
              {(() => {
                const mobileChunkSize = Math.min(4, currentStatConfig.length > 0 ? currentStatConfig.length : 1); // Using 4 for consistency, adjust if 3 is preferred.
                const rows = [];
                for (let i = 0; i < currentStatConfig.length; i += mobileChunkSize) {
                  const chunk = currentStatConfig.slice(i, i + mobileChunkSize);
                  rows.push(
                    <React.Fragment key={`career-mobile-row-${i}`}>
                      {renderStatRow(athlete.careerStats, athlete.athleteFullImage, chunk)}
                      {i + mobileChunkSize < currentStatConfig.length && <div className="mt-4"></div>}
                    </React.Fragment>
                  );
                }
                return rows;
              })()}
            </div>

            {/* Desktop View (MD breakpoint and above): Single row */}
            <div className="hidden md:block">
              {renderStatRow(athlete.careerStats, athlete.athleteFullImage, currentStatConfig)}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-xs md:text-base">No career stats available.</p>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;