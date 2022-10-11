import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

export const action: ActionFunction = async ({
  request,
}) => {
  const userId = await requireUserId(request)
  const form = await request.formData();
  const name = form.get("name")
  const notes = form.get("notes")
  const personalAllergy = form.get("personalAllergy");
  if (
    typeof name !== "string" ||
    typeof notes !== "string" || 
    typeof personalAllergy !== "string" 
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, notes, personalAllergy};

  const profile = await db.profile.create({ data: { ...fields, userId } });
  return redirect(`/profiles/${profile.id}`);
};



export default function NewProfileRoute() {
  return (
    <div className = "container">
      <h4>Add friends profile</h4>
      <form method="post">
        <div className = "container">
          <div>
            <label className ="form-label">
              Name: <input type="text" name="name" />
            </label>
          </div>
          <div>
            <label className ="form-label">
              Allergy: <input type="text" name="personalAllergy" />
            </label>
          </div>
          <div>
            <label className ="form-label">
              Notes: <textarea name="notes" />
            </label>
          </div>
          <div>
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}