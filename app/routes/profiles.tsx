import { Link, Outlet } from "@remix-run/react";
import type{ LinksFunction, LoaderFunction } from "@remix-run/node";
import{ json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProfileList from "~/components/profile_lists";
import type{ IProfile } from "~/interfaces/profiles";
import stylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async () => {
  const data = await db.profile.findMany({
      take: 5,
      select: { id: true, name: true, personalAllergy: true, notes: true },
      orderBy: { createdAt: "desc" },
    })
  return json(data);
  };

export default function Profiles() {
  const data = useLoaderData<Array<IProfile>>();

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
          <div className="profiles-outlet">
            <ProfileList data={data}></ProfileList>
            <Outlet />
          </div>
        </div>
      );
  }
