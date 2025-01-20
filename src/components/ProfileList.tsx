import { Profile } from "@/lib/types";
import ProfileCard from "./ProfileCard";

interface ProfileListProps {
  profiles: Profile[];
  onShowLocation: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

const ProfileList = ({ profiles, onShowLocation, onViewDetails }: ProfileListProps) => {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No profiles found</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-12rem)] px-4 space-y-4">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onShowLocation={onShowLocation}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProfileList;