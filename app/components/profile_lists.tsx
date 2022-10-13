import { Link } from "@remix-run/react";
import type{ IProfile } from "~/interfaces/profiles";

export default function ProfileList({
  currentUserData,
  }:{
  currentUserData: Array<IProfile>; 
  })
{ 
  return (
      <div>
        <main className="profiles-main">
         <div className = "container">
            <h3>Your Profiles</h3>
              {currentUserData.length > 0 ? (
                <div className = "profiles-name">
                  {currentUserData.map((profile) => (
                    <>
                    <div className = "profiles-padding">
                      <h4><Link title ={profile.name} key={profile.id} to={profile.id as string}>{profile.name}</Link></h4>
                    </div>
                    </>
                  ))}
                </div>
                 ):(
                  <div className = "container"> 
                  <h5>There are no profiles to display  <Link to="/profiles/new">
                    <i className = "click"> click here </i>
                  </Link> to make one </h5>
                 </div>
                 )}
          </div>
        </main>
      </div>
    )
}
