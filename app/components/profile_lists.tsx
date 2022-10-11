import { Link } from "@remix-run/react";
import type{ IProfile } from "~/interfaces/profiles";

export default function ProfileList({
  data,
  currentUserId
  }:{
  data: Array<IProfile>; 
  currentUserId: string;
  })
{ 
  return (
      <div>
        <main className="profiles-main">
         <div className = "container">
            <h3>Your Profiles</h3>
              {data.length > 0 ? (
                <div className = "profiles-name">
                  {data.map((profile) => (
                    <>
                    {currentUserId === profile.userId ? 
                    <div className = "profiles-padding">
                      <h4><Link title ={profile.name} key={profile.id} to={profile.id as string}>{profile.name}</Link></h4>
                    </div>
                    : ""
                    }
                    </>
                  ))}
                </div>
                 ):(
                 <div> There are no profiles to display</div>)}
          </div>
        </main>
      </div>
    )
}
