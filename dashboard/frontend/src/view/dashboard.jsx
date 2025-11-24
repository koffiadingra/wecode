import { useState } from "react";
import SearchMoviesIMDBForm from "./searchMovieIMDB";
import SearchMoviesTVmazeForm from "./searchMovieTVmaze";
import WidgetTemperature from "./widgetTemperature";
import CountryInfo from "./countryInfo";
import PlayerApp from "../components_anime/PlayerApp";
import Player from "../components/PlayerApp";

function Dashboard() {
  const [activeMenu, setActiveMennu] = useState(null);
  const [widgets, setWidgets] = useState({
    searchIMDB: false,
    searcheTVmaze: false,
    weatherTemperature: false,
    countryInfo: false,
    animeWidget: false,
    playerWidget: false,
  });
  const toggleMenu = (menuName) => {
    setActiveMennu(activeMenu === menuName ? null : menuName);
  };

  const displayWidgets = (widgetName) => {
    setWidgets((prev) => ({ ...prev, [widgetName]: true }));
  };

  const closeWidgets = (widgetName) => {
    setWidgets((prev) => ({ ...prev, [widgetName]: false }));
  };
  return (
    <div className="bg-gray-100">
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-900 text-white">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <img
                src="https://tailwindflex.com/images/logo.svg"
                alt="Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Dashboard</span>
            </div>
          </div>

          <nav className="mt-5 px-2">
            <div className="space-y-4">
              <span className="text-xl font-bold">Services</span>

              <div className="space-y-1">
                <button
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                  aria-expanded="true"
                  aria-controls="analytics-dropdown"
                  onClick={() => toggleMenu("movies")}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      width={25}
                    >
                      <path
                        fill="#ffffff"
                        d="M96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM144 432L144 464C144 472.8 151.2 480 160 480L192 480C200.8 480 208 472.8 208 464L208 432C208 423.2 200.8 416 192 416L160 416C151.2 416 144 423.2 144 432zM448 416C439.2 416 432 423.2 432 432L432 464C432 472.8 439.2 480 448 480L480 480C488.8 480 496 472.8 496 464L496 432C496 423.2 488.8 416 480 416L448 416zM144 304L144 336C144 344.8 151.2 352 160 352L192 352C200.8 352 208 344.8 208 336L208 304C208 295.2 200.8 288 192 288L160 288C151.2 288 144 295.2 144 304zM448 288C439.2 288 432 295.2 432 304L432 336C432 344.8 439.2 352 448 352L480 352C488.8 352 496 344.8 496 336L496 304C496 295.2 488.8 288 480 288L448 288zM144 176L144 208C144 216.8 151.2 224 160 224L192 224C200.8 224 208 216.8 208 208L208 176C208 167.2 200.8 160 192 160L160 160C151.2 160 144 167.2 144 176zM448 160C439.2 160 432 167.2 432 176L432 208C432 216.8 439.2 224 448 224L480 224C488.8 224 496 216.8 496 208L496 176C496 167.2 488.8 160 480 160L448 160z"
                      />
                    </svg>
                    Movies
                  </div>
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {activeMenu === "movies" && (
                  <div className="space-y-1 pl-11" id="analytics-dropdown">
                    <button
                      onClick={() => displayWidgets("searchIMDB")}
                      className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      IMDB
                    </button>
                    <button
                      onClick={() => displayWidgets("searcheTVmaze")}
                      className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      TV Maze
                    </button>
                    <button
                      onClick={() => displayWidgets("animeWidget")}
                      className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      Search Anime
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <button
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                  aria-expanded="true"
                  aria-controls="analytics-dropdown"
                  onClick={() => toggleMenu("weather")}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      width={25}
                    >
                      <path
                        fill="#ffffff"
                        d="M32 400C32 479.5 96.5 544 176 544L480 544C550.7 544 608 486.7 608 416C608 364.4 577.5 319.9 533.5 299.7C540.2 286.6 544 271.7 544 256C544 203 501 160 448 160C430.3 160 413.8 164.8 399.6 173.1C375.5 127.3 327.4 96 272 96C192.5 96 128 160.5 128 240C128 248 128.7 255.9 129.9 263.5C73 282.7 32 336.6 32 400z"
                      />
                    </svg>
                    Weather
                  </div>
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {activeMenu === "weather" && (
                  <div className="space-y-1 pl-11" id="analytics-dropdown">
                    <button
                      onClick={() => displayWidgets("weatherTemperature")}
                      className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      Temperature
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <button
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                  aria-expanded="true"
                  aria-controls="analytics-dropdown"
                  onClick={() => toggleMenu("country")}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      width={25}
                    >
                      <path
                        fill="#ffffff"
                        d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"
                      />
                    </svg>
                    Location
                  </div>
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {activeMenu === "country" && (
                  <div className="space-y-1 pl-11" id="analytics-dropdown">
                    <button
                      onClick={() => displayWidgets("countryInfo")}
                      className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      Country Info
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <button
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                  aria-expanded="true"
                  aria-controls="analytics-dropdown"
                  onClick={() => toggleMenu("player")}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={25}>
                    <path fill="#ffffff" d="M320.3 192L235.7 51.1C229.2 40.3 215.6 36.4 204.4 42L117.8 85.3C105.9 91.2 101.1 105.6 107 117.5L176.6 256.6C146.5 290.5 128.3 335.1 128.3 384C128.3 490 214.3 576 320.3 576C426.3 576 512.3 490 512.3 384C512.3 335.1 494 290.5 464 256.6L533.6 117.5C539.5 105.6 534.7 91.2 522.9 85.3L436.2 41.9C425 36.3 411.3 40.3 404.9 51L320.3 192zM351.1 334.5C352.5 337.3 355.1 339.2 358.1 339.6L408.2 346.9C415.9 348 418.9 357.4 413.4 362.9L377.1 398.3C374.9 400.5 373.9 403.5 374.4 406.6L383 456.5C384.3 464.1 376.3 470 369.4 466.4L324.6 442.8C321.9 441.4 318.6 441.4 315.9 442.8L271.1 466.4C264.2 470 256.2 464.2 257.5 456.5L266.1 406.6C266.6 403.6 265.6 400.5 263.4 398.3L227.1 362.9C221.5 357.5 224.6 348.1 232.3 346.9L282.4 339.6C285.4 339.2 288.1 337.2 289.4 334.5L311.8 289.1C315.2 282.1 325.1 282.1 328.6 289.1L351 334.5z"/>
                    </svg>
                    Sport
                  </div>
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {activeMenu === "player" && (
                  <div className="space-y-1 pl-11" id="analytics-dropdown">
                    <button
                      onClick={() => displayWidgets("playerWidget")}
                      className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                      Search Player
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <div className="mt-auto p-4 border-t border-gray-800">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Tom Cook</p>
                <p className="text-xs text-gray-400">View profile</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="p-6 bg-gray-100 overflow-auto">
          <h1 className="text-2xl font-semibold text-gray-900">WidGets</h1>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {widgets.searchIMDB && (
                <SearchMoviesIMDBForm
                  onClose={() => closeWidgets("searchIMDB")}
                />
              )}
              {widgets.searcheTVmaze && (
                <SearchMoviesTVmazeForm
                  onClose={() => closeWidgets("searcheTVmaze")}
                />
              )}
              {widgets.weatherTemperature && (
                <WidgetTemperature
                  onClose={() => closeWidgets("weatherTemperature")}
                />
              )}
              {widgets.countryInfo && (
                <CountryInfo onClose={() => closeWidgets("countryInfo")} />
              )}
              {widgets.animeWidget && (
                <PlayerApp onClose={() => closeWidgets("animeWidget")} />
              )}
              {widgets.playerWidget && (
                <Player onClose={() => closeWidgets("playerWidget")}/>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
