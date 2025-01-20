import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Profile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileDetailsProps {
  profile?: Profile;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

const ProfileDetails = ({
  profile,
  isOpen,
  onClose,
  isLoading = false,
}: ProfileDetailsProps) => {
  if (!profile && !isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isLoading ? <Skeleton className="h-6 w-32" /> : profile?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <Skeleton className="w-32 h-32 rounded-full mx-auto" />
          ) : (
            <img
              src={profile?.photoUrl}
              alt={profile?.name}
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
          )}
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-gray-600">{profile?.description}</p>
          )}
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                {profile?.email && (
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {profile.email}
                  </p>
                )}
                {profile?.phone && (
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {profile.phone}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="text-sm text-gray-500">
            <p className="font-semibold">Address:</p>
            {isLoading ? (
              <Skeleton className="h-4 w-64" />
            ) : (
              <p>{profile?.address}</p>
            )}
          </div>
          {profile?.interests && profile.interests.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetails;