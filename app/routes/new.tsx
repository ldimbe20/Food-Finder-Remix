// import type { ActionFunction } from "@remix-run/node";
// import { redirect } from "@remix-run/node";

// import { db } from "~/utils/db.server";

// export const action: ActionFunction = async ({
//   request,
// }) => {
//   // const user = loggedInUser
//   const form = await request.formData();
//   const name = form.get("name");
//   const notes = form.get("notes")
//   const personalAllergy = form.get("personalAllergy");
//   if (
//     typeof name !== "string" ||
//     typeof notes !== "string" || 
//     typeof personalAllergy !== "string" 
//   ) {
//     throw new Error(`Form not submitted correctly.`);
//   }

//   const fields = { name, notes, personalAllergy };

//   const profile = await db.profile.create({ data: fields });
//   return redirect(`/profiles/${profile.id}`);
// };



// export default function NewProfileRoute() {
//   return (
//     <div>
//       <p>Add your own hilarious profile</p>
//       <form method="post">
//         <div>
//           <label>
//             Name: <input type="text" name="name" />
//           </label>
//         </div>
//         <div>
//           <label>
//             Personal Allergy: <textarea name="personalAllergy" />
//           </label>
//         </div>
//         <div>
//           <label>
//             Notes: <textarea name="notes" />
//           </label>
//         </div>
//         <div>
//           <button type="submit" className="button">
//             Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }