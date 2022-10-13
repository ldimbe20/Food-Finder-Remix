/** @format */

import {
	ActionFunction,
	LoaderFunction,
	MetaFunction,
	redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { IProfile } from "~/interfaces/profiles";
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

type LoaderData = { profile: IProfile };

export let loader: LoaderFunction = async ({ params }) => {
	let profile = await db.profile.findUnique({
		where: { id: params.profileId },
	});
	if (!profile) {
		throw new Response("What a profile! Not found.", {
			status: 404,
		});
	}
	let data: LoaderData = { profile };
	return data;
};

export const action: ActionFunction = async ({ request, params }) => {
	const form = await request.formData();
	if (form.get("_method") !== "delete") {
		throw new Response(`The _method ${form.get("_method")} is not supported`, {
			status: 400,
		});
	}
	const profile = await db.profile.findUnique({
		where: { id: params.profileId },
	});
	if (!profile) {
		throw new Response("Can't delete what does not exist", {
			status: 404,
		});
	}

	await db.profile.delete({ where: { id: params.profileId } });
	return redirect("/profiles");
};



export default function IndividualProfileRoute() {
	let data = useLoaderData<LoaderData>();

	return (
		<>
    	<div className="container">
		  <div className='profiles-content'>
			<h5>
					Name: {data.profile.name} <br></br>
					Allergy: {data.profile.personalAllergy}
					<br></br>
					Additional Notes: {data.profile.notes}
			</h5>
		  </div>
      	  <form method='post'>
			<input type='hidden' name='_method' value='delete' />
			  <button type='submit' className='button'>
				Delete
			  </button>
		  </form>
    	</div>
		</>
	);
}
