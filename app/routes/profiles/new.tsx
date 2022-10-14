import {  json} from "@remix-run/node";
import type{ ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";
import { useLoaderData } from "@remix-run/react";
import type{ IFoodRestrictionCategory } from "~/interfaces/foodRestrictionCategory";



export const loader: LoaderFunction = async () => {
  const data = await db.foodRestrictionCategory.findMany({
      orderBy: { name: "asc" },
    })
  return json(data);
  };

export const action: ActionFunction = async ({
  request,
}) => {
  const userId = await requireUserId(request)
  const form = await request.formData();
  const name = form.get("name")
  const notes = form.get("notes")
  const personalAllergy = form.get("personalAllergy");
  const foodRestrictionCategory = form.get("foodRestrictionCategory");
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
  const foodRestrictionCategory = useLoaderData<{
    data: Array<IFoodRestrictionCategory>;
  }>();
  return (
    <div className = "container">
      <h4>Add friends profile</h4>
      <form method="post" className = "new_form">
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
            <label>
              Select a Food Restriction Category:
            </label>
            <div className="form-label">
              <select
                id="foodRestrictionCategoryId"
                name="foodRestrictionCategory"
                defaultValue={""}
                style={{ maxWidth: 300 }}
                className="form-select"
              >
                <option value="" disabled>
                Pick Food Restriction
                </option>
                {foodRestrictionCategory.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
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


