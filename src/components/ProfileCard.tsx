import { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileCardProps {
  profile: Profile;
  onShowLocation: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

const ProfileCard = ({
  profile,
  onShowLocation,
  onViewDetails,
}: ProfileCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            {profile.email && (
              <p className="text-sm text-gray-500">{profile.email}</p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">{profile.description}</p>
        <p className="text-sm text-gray-500">{profile.address}</p>
        {profile.interests && profile.interests.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {profile.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {profile.interests.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{profile.interests.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onViewDetails(profile)}>
          View Details
        </Button>
        <Button onClick={() => onShowLocation(profile)}>Show on Map</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;