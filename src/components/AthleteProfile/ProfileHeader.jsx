// src/components/AthleteProfile/ProfileHeader.jsx
import backdropImageUrl from '../../assets/profileOne.png';

const ProfileHeader = ({ athlete }) => {
  if (!athlete) {
    return <div className="text-center py-8 text-gray-500">Loading profile header...</div>;
  }

  // Helper function to render stat row (MPG, FG%, etc.)
  // Helper function to render stat row with BLURRED background image
  const renderStatRow = (stats, imageUrl) => (
    // Removed backgroundImage and backdrop-filter from here
    <div className="grid grid-cols-8 gap-0.5 text-center font-bold text-sm md:text-lg relative overflow-hidden">
      
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

      {/* Headers: Each span needs 'relative z-10' to appear above the background and overlay */}
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">MPG</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">FG%</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">3P%</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">FT%</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">PPG</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">RPG</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">APG</span>
      <span className="text-xs md:text-sm text-gray-400 font-bold relative z-10">BPG</span>

      {/* Values: Each span needs 'relative z-10' */}
      <span className="text-white text-xs md:text-xl relative z-10">{stats.mp}</span>
      <span className="text-white text-xs md:text-xl relative z-10">{stats.fg}</span>
      <span className="text-white text-xs md:text-xl relative z-10">{stats['3p']}</span>
      <span className="text-white text-xs md:text-xl font-bold relative z-10">{stats.ft}</span>
      <span className="text-white text-xs md:text-xl relative z-10">{stats.ppg}</span>
      <span className="text-white text-xs md:text-xl relative z-10">{stats.rpg}</span>
      <span className="text-white text-xs md:text-xl relative z-10">{stats.apg}</span>
      <span className="text-white text-xs md:text-xl relative z-10">{stats.bpg}</span>
    </div>
  );

  return (
    <section className="relative mt-4 lg:mt-16 w-full min-h-[50vh] md:min-h-[70vh] bg-gray-900 backdrop-blur-3xl text-white flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 py-4"
    >

      {/* Container for Div1 and Div2: Now ALWAYS flex-row */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-row items-stretch justify-between gap-x-2 md:gap-x-4 lg:gap-x-8"
      
      >

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
        <div className="flex-1 relative z-20 min-w-0 overflow-hidden rounded-r-lg shadow-xl min-h-[200px] md:min-h-[300px] lg:min-h-0
        ">
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
      <div className="relative z-40 mt-4 w-full max-w-7xl mx-auto  md:-mt-24 lg:-mt-48 p-3 md:p-8 transparent rounded-lg shadow-xl backdrop-filter backdrop-blur-md mb-20">
        {/* H2 Headers: Now text-sm for mobile, scaling up */}
        <h2 className="font-bold text-sm md:text-xl lg:text-2xl text-white mb-1">Postseason</h2>
        <hr className="border-t border-gamepulse-yellow mb-1" />
        {athlete.postseasonStats ? (
          renderStatRow(athlete.postseasonStats)
        ) : (
          <p className="text-gray-400 text-xs md:text-base">No postseason stats available.</p>
        )}

        {/* H2 Headers: Now text-sm for mobile, scaling up */}
        <h2 className="font-bold text-sm md:text-xl lg:text-2xl text-white mt-2 mb-1">Career Stats</h2>
        <hr className="border-t border-gamepulse-orange mb-1" />
        {athlete.careerStats ? (
          renderStatRow(athlete.careerStats)
        ) : (
          <p className="text-gray-400 text-xs md:text-base">No career stats available.</p>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;