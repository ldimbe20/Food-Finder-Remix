import type { LinksFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

import stylesUrl from "~/styles/profiles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Profiles() {
    return  (
        <div className="profiles-layout">
          <header className="profiles-header">
            <div className="container">
              <h1 className="home-link">
                <Link
                  to="/"
                  title="Remix Profiles"
                  aria-label="Remix Profiles"
                >
                  <span className="logo-medium">Forbidden Food Finder</span>
                </Link>
              </h1>
            </div>
          </header>
          <main className="profiles-main">
            <div className="container">
              <div className="profiles-list">
                {/* <p>Here are a few more profiles to check out:</p>
                  <li>
                    <Link to="some-joke-id">Hippo</Link>
                  </li> */}
                <Link to="/new" className="button">
                  Add your own
                </Link>
              </div>
              <div className="profiles-outlet">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      );
  }
