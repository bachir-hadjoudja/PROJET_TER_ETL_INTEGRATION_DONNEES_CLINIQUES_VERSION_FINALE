import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const [state, setState] = useState(false);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);
  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <Link to="/">
        <svg
          width="110"
          viewBox="0 0 517 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5906 81.853C10.5619 65.4657 13.2845 41.6194 29.6717 28.5906V28.5906C46.0589 15.5619 69.9053 18.2845 82.934 34.6717L115.995 76.2554C129.024 92.6426 126.301 116.489 109.914 129.518V129.518C93.527 142.546 69.6807 139.824 56.6519 123.437L23.5906 81.853Z"
            fill="#6CFFC1"
          />
          <path
            d="M87.6 37.0916C99.06 19.5713 122.553 14.6586 140.073 26.1186V26.1186C157.594 37.5786 162.506 61.0716 151.046 78.5919L121.966 123.051C110.506 140.571 87.0127 145.484 69.4925 134.024V134.024C51.9723 122.564 47.0595 99.0705 58.5195 81.5502L87.6 37.0916Z"
            fill="#36B697"
          />
          <path
            d="M192.792 38.4C194.84 38.4 196.632 39.168 198.168 40.704C199.789 42.1547 200.6 43.9893 200.6 46.208V120.192C200.6 122.411 199.789 124.288 198.168 125.824C196.547 127.275 194.669 128 192.536 128C190.147 128 188.227 127.275 186.776 125.824C185.325 124.288 184.6 122.411 184.6 120.192V46.208C184.6 43.9893 185.368 42.1547 186.904 40.704C188.44 39.168 190.403 38.4 192.792 38.4ZM249.496 38.4C251.885 38.4 253.805 39.168 255.256 40.704C256.707 42.1547 257.432 43.9893 257.432 46.208V120.192C257.432 122.411 256.664 124.288 255.128 125.824C253.677 127.275 251.715 128 249.24 128C247.192 128 245.357 127.275 243.736 125.824C242.2 124.288 241.432 122.411 241.432 120.192V46.208C241.432 43.9893 242.243 42.1547 243.864 40.704C245.485 39.168 247.363 38.4 249.496 38.4ZM192.408 75.648H249.496V90.368H192.408V75.648ZM315.384 38.4C323.576 38.4 329.677 40.32 333.688 44.16C337.699 48 339.704 53.6747 339.704 61.184C339.704 65.1947 338.723 68.736 336.76 71.808C334.797 74.7947 331.896 77.1413 328.056 78.848C324.216 80.4693 319.48 81.28 313.848 81.28L314.36 75.52C317.005 75.52 320.035 75.904 323.448 76.672C326.861 77.3547 330.147 78.6347 333.304 80.512C336.547 82.304 339.192 84.864 341.24 88.192C343.373 91.4347 344.44 95.616 344.44 100.736C344.44 106.368 343.501 110.976 341.624 114.56C339.832 118.144 337.443 120.917 334.456 122.88C331.469 124.843 328.269 126.208 324.856 126.976C321.443 127.659 318.157 128 315 128H283.128C280.909 128 279.032 127.275 277.496 125.824C276.045 124.288 275.32 122.411 275.32 120.192V46.208C275.32 43.9893 276.045 42.1547 277.496 40.704C279.032 39.168 280.909 38.4 283.128 38.4H315.384ZM313.08 53.504H290.296L291.96 51.456V74.624L290.424 73.472H313.464C315.939 73.472 318.157 72.6613 320.12 71.04C322.083 69.4187 323.064 67.072 323.064 64C323.064 60.3307 322.125 57.6853 320.248 56.064C318.456 54.3573 316.067 53.504 313.08 53.504ZM314.104 88.576H290.808L291.96 87.552V114.56L290.68 113.28H315C318.925 113.28 322.04 112.256 324.344 110.208C326.648 108.075 327.8 104.917 327.8 100.736C327.8 96.896 327.032 94.1227 325.496 92.416C323.96 90.7093 322.125 89.6427 319.992 89.216C317.859 88.7893 315.896 88.576 314.104 88.576ZM407.323 113.024C409.542 113.024 411.376 113.749 412.827 115.2C414.363 116.565 415.131 118.357 415.131 120.576C415.131 122.709 414.363 124.501 412.827 125.952C411.376 127.317 409.542 128 407.323 128H365.723C363.504 128 361.627 127.275 360.091 125.824C358.64 124.288 357.915 122.411 357.915 120.192V46.208C357.915 43.9893 358.683 42.1547 360.219 40.704C361.755 39.168 363.718 38.4 366.107 38.4C368.155 38.4 369.947 39.168 371.483 40.704C373.104 42.1547 373.915 43.9893 373.915 46.208V115.2L371.099 113.024H407.323ZM489.054 38.4C490.931 38.4 492.766 39.0827 494.558 40.448C496.435 41.8133 497.374 43.648 497.374 45.952C497.374 47.5733 496.777 49.1947 495.582 50.816L446.558 113.792L445.022 113.28H487.774C489.993 113.28 491.827 113.963 493.278 115.328C494.814 116.608 495.582 118.357 495.582 120.576C495.582 122.709 494.814 124.501 493.278 125.952C491.827 127.317 489.993 128 487.774 128H431.582C429.363 128 427.443 127.232 425.822 125.696C424.201 124.075 423.39 122.325 423.39 120.448C423.39 118.827 423.987 117.205 425.182 115.584L474.334 52.352L475.486 53.12H436.702C434.483 53.12 432.606 52.4373 431.07 51.072C429.619 49.7067 428.894 47.9147 428.894 45.696C428.894 43.4773 429.619 41.728 431.07 40.448C432.606 39.0827 434.483 38.4 436.702 38.4H489.054Z"
            fill="#6CFFC1"
          />
        </svg>
      </Link>

      <div className="md:hidden">
        <button
          className="menu-btn text-gray-500 hover:text-gray-800"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
  return (
    <header>
      <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
        <Brand />
      </div>
      <nav
        className={`pb-5 md:text-sm ${
          state
            ? "absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent"
            : ""
        }`}
      >
        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
          <Brand />
          <div
            className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
              state ? "block" : "hidden"
            } `}
          >
            <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0"></ul>
            <div className="items-center justify-end gap-x-3 sm:mt-6 md:mt-0 md:flex">
              {user && (
                <>
                  <span className="mr-2">{user.email}</span>
                  <div>
                    <button
                      className="flex m-auto sm:w-full items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-700 hover:bg-gray-800 active:bg-gray-900 rounded-full md:inline-flex"
                      onClick={handleClick}
                    >
                      Log out
                    </button>
                  </div>
                </>
              )}
              {!user && (
                <div>
                  <Link
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-emerald-400 hover:bg-emerald-600  active:bg-emerald-900 rounded-full sm:mb-3 md:mb-0  md:inline-flex"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-700 hover:bg-gray-800 active:bg-gray-900 rounded-full md:inline-flex"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
