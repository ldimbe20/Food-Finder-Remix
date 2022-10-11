import type {  LoaderFunction, MetaFunction } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";
import type{ IProfile } from "~/interfaces/profiles";
import { db } from "~/utils/db.server";

export let meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No profile",
      description: "No profile found",
    };
  }
  return {
    title: `"${data.profile.name}" profile`,
  };
};

type LoaderData = { profile: IProfile ; };

export let loader: LoaderFunction = async ({ params }) => {
  let profile = await db.profile.findUnique({
    where: { id: params.profileId },
  });
  if (!profile) {
    throw new Response("What a profile! Not found.", {
      status: 404,
    });
  }
  // let data: LoaderData = { profile, isOwner: joke.jokesterId === userId };
  let data: LoaderData = {profile}
  return data;
};

export default function IndividualProfileRoute() {
  let data = useLoaderData<LoaderData>();

  return (
    <>
   
        <div className="profiles-content">
        <h5>Name: {data.profile.name} <br></br>
        Allergy: {data.profile.personalAllergy}<br></br>
        Additional Notes: {data.profile.notes}</h5>
        </div>
   
    </>
  );
}
