import { Link } from "@remix-run/react";
import type{ IProfile } from "~/interfaces/profiles";


export default function ProfileList({
  data
  }:{
  data: Array<IProfile>; 
  })
{ 
  return (
      <div>
        <main className="profiles-main">
         <div className = "container">
          <h3>Your Profiles</h3>
            <div className = "profiles-name">
              {data.map((profile) => (
                <>
                <div className = "profiles-padding">
                  <h4><Link title ={profile.name} key={profile.id} to={profile.id as string}>{profile.name}</Link></h4>
                </div>
                </>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
}
