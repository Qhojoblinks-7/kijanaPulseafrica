// src/components/AthleteProfile/ProfileHeader.jsx
// Removed backdropImageUrl import as it's not used in the provided code's logic.
import React from 'react'; // Import React for React.Fragment

const ProfileHeader = ({ athlete }) => {
  if (!athlete) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-900 min-h-[50vh] flex items-center justify-center">
        Loading athlete profile header...
      </div>
    );
  }

  // --- Stat Configurations for Different Sports ---
  // Each object defines a stat label (what's displayed) and its corresponding key in the athlete's stats object.
  const BASKETBALL_STATS_CONFIG = [
    { label: 'MPG', key: 'mp' }, { label: 'FG%', key: 'fg' }, { label: '3P%', key: '3p' },
    { label: 'FT%', key: 'ft' }, { label: 'PPG', key: 'ppg' }, { label: 'RPG', key: 'rpg' },
    { label: 'APG', key: 'apg' }, { label: 'BPG', key: 'bpg' },
  ];

  const FOOTBALL_STATS_CONFIG = [
    { label: 'Apps', key: 'appearances' }, { label: 'Goals', key: 'goals' }, { label: 'Assists', key: 'assists' },
    { label: 'Pass%', key: 'passAccuracy' }, { label: 'Tackles', key: 'tackles' }, { label: 'YC', key: 'yellowCards' },
    { label: 'RC', key: 'redCards' }, { label: 'CS', key: 'cleanSheets' },
  ];

  const ATHLETICS_STATS_CONFIG = [
    { label: 'Events', key: 'events' }, { label: 'PB (100m)', key: 'pb100m' }, { label: 'PB (200m)', key: 'pb200m' },
    { label: 'Medals', key: 'medals' }, { label: 'Rank', key: 'rank' }, { label: 'Avg Speed', key: 'avgSpeed' },
    { label: 'Starts', key: 'starts' }, { label: 'Form', key: 'form' },
  ];

  const VOLLEYBALL_STATS_CONFIG = [
    { label: 'Games', key: 'games' }, { label: 'Sets', key: 'sets' }, { label: 'Assists', key: 'assists' },
    { label: 'Blocks', key: 'blocks' }, { label: 'Aces', key: 'aces' }, { label: 'Digs', key: 'digs' },
    { label: 'Service Eff', key: 'serviceEff' }, { label: 'Att%', key: 'attackingPct' },
  ];

  const SWIMMING_STATS_CONFIG = [
    { label: 'Events', key: 'events' }, { label: 'PB (50m)', key: 'pb50m' }, { label: 'PB (100m)', key: 'pb100m' },
    { label: 'Medals', key: 'medals' }, { label: 'Rank', key: 'rank' }, { label: 'Strokes', key: 'strokes' },
    { label: 'Starts', key: 'starts' }, { label: 'Turns', key: 'turns' },
  ];

  const HANDBALL_STATS_CONFIG = [
    { label: 'Games', key: 'games' }, { label: 'Goals', key: 'goals' }, { label: 'Assists', key: 'assists' },
    { label: 'Steals', key: 'steals' }, { label: 'Blocks', key: 'blocks' }, { label: 'Shots', key: 'shots' },
    { label: 'Penalties', key: 'penalties' }, { label: 'Discipline', key: 'discipline' },
  ];

  const TENNIS_STATS_CONFIG = [
    { label: 'Matches', key: 'matches' }, { label: 'Wins', key: 'wins' }, { label: 'Losses', key: 'losses' },
    { label: 'Tournaments', key: 'tournaments' }, { label: 'Aces', key: 'aces' }, { label: 'Forehand', key: 'forehand' },
    { label: 'Backhand', key: 'backhand' }, { label: 'Serve Win%', key: 'serveWin' },
  ];

  const TABLE_TENNIS_STATS_CONFIG = [
    { label: 'Matches', key: 'matches' }, { label: 'Wins', key: 'wins' }, { label: 'Losses', key: 'losses' },
    { label: 'Tournaments', key: 'tournaments' }, { label: 'Serves', key: 'serves' }, { label: 'Smashes', key: 'smashes' },
    { label: 'Spins', key: 'spins' }, { label: 'Def. Volley', key: 'defVolley' },
  ];

  const RUGBY_STATS_CONFIG = [
    { label: 'Matches', key: 'matches' }, { label: 'Tries', key: 'tries' }, { label: 'Tackles', key: 'tackles' },
    { label: 'Carries', key: 'carries' }, { label: 'Meters Run', key: 'metersRun' }, { label: 'Turnovers', key: 'turnovers' },
    { label: 'Lineouts', key: 'lineouts' }, { label: 'Scrum', key: 'scrum' },
  ];

  const BADMINTON_STATS_CONFIG = [
    { label: 'Matches', key: 'matches' }, { label: 'Wins', key: 'wins' }, { label: 'Losses', key: 'losses' },
    { label: 'Tournaments', key: 'tournaments' }, { label: 'Smashes', key: 'smashes' }, { label: 'Drops', key: 'drops' },
    { label: 'Net Play', key: 'netPlay' }, { label: 'Defense', key: 'defense' },
  ];

  const FIELD_HOCKEY_STATS_CONFIG = [
    { label: 'Games', key: 'games' }, { label: 'Goals', key: 'goals' }, { label: 'Assists', key: 'assists' },
    { label: 'Tackles', key: 'tackles' }, { label: 'Passes', key: 'passes' }, { label: 'Interceptions', key: 'interceptions' },
    { label: 'PC', key: 'penaltyCorners' }, { label: 'Coverage', key: 'fieldCoverage' },
  ];

  const TAEKWONDO_STATS_CONFIG = [
    { label: 'Matches', key: 'matches' }, { label: 'Wins', key: 'wins' }, { label: 'Losses', key: 'losses' },
    { label: 'Medals', key: 'medals' }, { label: 'Belts', key: 'belts' }, { label: 'Kicks', key: 'kicks' },
    { label: 'Punches', key: 'punches' }, { label: 'Defense', key: 'defense' },
  ];

  // --- Helper function to get the correct stat configuration based on athlete's sportType ---
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
      // Default case if sportType is not recognized or missing
      default:
        console.warn(`No specific stat configuration for sportType: ${sportType}. Displaying generic stats.`);
        return []; // Return empty array or a generic config if you have one
    }
  };

  const currentStatConfig = getStatConfig(athlete.sportType);

  // Helper function to render a single stat row (already existing)
  // This function now just takes the exact subset of statConfig it needs to render a single row
  const renderStatRow = (stats, imageUrl, statConfigToRender) => {
    if (!stats || !statConfigToRender || statConfigToRender.length === 0) {
      return null; // Don't render anything if no stats or config provided for this specific row
    }

    // Determine the grid columns dynamically based on the number of stats in THIS specific row
    const gridColsClass = `grid-cols-${statConfigToRender.length}`;

    return (
      <div className={`grid ${gridColsClass} gap-0.5 text-center font-bold text-sm md:text-lg relative overflow-hidden`}>
        {/* Blurred background image element */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Athlete background"
            className="absolute inset-0 w-full h-full object-cover filter blur-md z-[-1]" // Image with blur and lower z-index
          />
        )}

        {/* Dark overlay for readability, positioned above the blurred image but below text */}
        {imageUrl && <div className="absolute inset-0 bg-black opacity-70 z-0"></div>} {/* Adjust opacity as needed */}

        {/* Headers: Map through the statConfigToRender to display labels */}
        {statConfigToRender.map((item, index) => (
          <span key={`header-${item.key}-${index}`} className="text-xs md:text-sm text-gray-400 font-bold relative z-10">
            {item.label}
          </span>
        ))}

        {/* Values: Map through statConfigToRender to display values from the stats object */}
        {statConfigToRender.map((item, index) => (
          <span key={`value-${item.key}-${index}`} className="text-white text-xs md:text-xl relative z-10">
            {/* Display the value, or '-' if the stat is missing or undefined */}
            {stats[item.key] !== undefined && stats[item.key] !== null ? stats[item.key] : '-'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="relative mt-4 lg:mt-16 w-full min-h-[50vh] md:min-h-[70vh] bg-gray-900 backdrop-blur-3xl text-white flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 py-4">

      {/* Container for Div1 and Div2: Now ALWAYS flex-row */}
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
            <p>From: <span className="font-semibold text-white">{athlete.fromLocation}</span></p>
            <p>Sports Debut: <span className="font-semibold text-white">{athlete.sportsDebut}</span></p>
            <p>Previous location: <span className="font-semibold text-white">{athlete.previousLocation}</span></p>
          </div>
        </div>

        {/* Div 2: Right content (Full Athlete Image) - Z-index reverted to z-20 for correct overlap with Div3 */}
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
      <div className="relative z-40 mt-4 w-full max-w-7xl mx-auto md:-mt-24 lg:-mt-48 p-3 md:p-8 transparent rounded-lg shadow-xl backdrop-filter backdrop-blur-md mb-20">
        {/* Postseason Stats */}
        <h2 className="font-bold text-sm md:text-xl lg:text-2xl text-white mb-1">Postseason</h2>
        <hr className="border-t border-gamepulse-yellow mb-1" />
        {athlete.postseasonStats && currentStatConfig.length > 0 ? (
          <>
            {/* Mobile View (Below MD breakpoint): Split into chunks of 4 stats */}
            <div className="md:hidden">
              {(() => {
                const chunkSize = 4; // Number of stats per row on mobile
                const rows = [];
                for (let i = 0; i < currentStatConfig.length; i += chunkSize) {
                  const chunk = currentStatConfig.slice(i, i + chunkSize);
                  rows.push(
                    <React.Fragment key={`postseason-mobile-row-${i}`}>
                      {renderStatRow(athlete.postseasonStats, athlete.athleteFullImage, chunk)}
                      {/* Add some vertical margin between stat rows on mobile */}
                      {i + chunkSize < currentStatConfig.length && <div className="mt-2 md:mt-0"></div>}
                    </React.Fragment>
                  );
                }
                return rows;
              })()}
            </div>

            {/* Desktop View (MD breakpoint and above): Single row */}
            <div className="hidden md:block">
              {renderStatRow(athlete.postseasonStats, athlete.athleteFullImage, currentStatConfig)}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-xs md:text-base">No postseason stats available.</p>
        )}

        {/* Career Stats */}
        <h2 className="font-bold text-sm md:text-xl lg:text-2xl text-white mt-2 mb-1">Career Stats</h2>
        <hr className="border-t border-gamepulse-orange mb-1" />
        {athlete.careerStats && currentStatConfig.length > 0 ? (
          <>
            {/* Mobile View (Below MD breakpoint): Split into chunks of 4 stats */}
            <div className="md:hidden">
              {(() => {
                const chunkSize = 4; // Number of stats per row on mobile
                const rows = [];
                for (let i = 0; i < currentStatConfig.length; i += chunkSize) {
                  const chunk = currentStatConfig.slice(i, i + chunkSize);
                  rows.push(
                    <React.Fragment key={`career-mobile-row-${i}`}>
                      {renderStatRow(athlete.careerStats, athlete.athleteFullImage, chunk)}
                      {/* Add some vertical margin between stat rows on mobile */}
                      {i + chunkSize < currentStatConfig.length && <div className="mt-2 md:mt-0"></div>}
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