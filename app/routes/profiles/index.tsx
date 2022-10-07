// add a loaderfunction to get profile data
// make a function to load profile data
// create a map to map through all profiles

import type{ LinksFunction, LoaderFunction } from "@remix-run/node";
import{ json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import stylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};


type LoaderData = {
  profileListItems: Array<{ id: string; name: string; personalAllergy: string; notes: string; }>;
};


export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    profileListItems: await db.profile.findMany({
      take: 5,
      select: { id: true, name: true, personalAllergy: true, notes: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return json(data);
};

export default function ProfilesIndex() {
  const data = useLoaderData<LoaderData>();
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h2>Your Profile</h2>
        {data.profileListItems.map((profile) => (
          <>
          <div className="container">
            <h3>{profile.name}</h3>
            <h4>{profile.personalAllergy}</h4>
            <h4>{profile.notes}</h4>
          </div>
          </>
        ))}
      </div>
    );
}
  


