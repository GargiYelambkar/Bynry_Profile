import { useState, useEffect } from "react";
import { Profile, FilterOptions } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import ProfileList from "@/components/ProfileList";
import Map from "@/components/Map";
import ProfileDetails from "@/components/ProfileDetails";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample data - replace with your actual data source
const sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    description: "Software Engineer with 5 years of experience",
    photoUrl: "https://source.unsplash.com/random/200x200/?portrait",
    address: "123 Tech Street, San Francisco, CA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    interests: ["Programming", "AI", "Web Development"],
  },
  {
    id: "2",
    name: "Jane Smith",
    description: "UX Designer passionate about user-centered design",
    photoUrl: "https://source.unsplash.com/random/200x200/?woman",
    address: "456 Design Ave, New York, NY",
    coordinates: { lat: 40.7128, lng: -74.006 },
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    interests: ["UI/UX", "Design Systems", "User Research"],
  },
];

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>(sampleProfiles);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>(profiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();
  const [detailsProfile, setDetailsProfile] = useState<Profile | undefined>();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const { toast } = useToast();

  useEffect(() => {
    applyFilters();
  }, [profiles, filterOptions]);

  const applyFilters = () => {
    let filtered = [...profiles];

    if (filterOptions.name) {
      filtered = filtered.filter((profile) =>
        profile.name.toLowerCase().includes(filterOptions.name!.toLowerCase())
      );
    }

    if (filterOptions.location) {
      filtered = filtered.filter((profile) =>
        profile.address.toLowerCase().includes(filterOptions.location!.toLowerCase())
      );
    }

    if (filterOptions.interests && filterOptions.interests.length > 0) {
      filtered = filtered.filter((profile) =>
        profile.interests?.some((interest) =>
          filterOptions.interests!.includes(interest)
        )
      );
    }

    setFilteredProfiles(filtered);
  };

  const handleSearch = (query: string) => {
    setFilterOptions({ ...filterOptions, name: query });
  };

  const handleShowLocation = (profile: Profile) => {
    setIsLoading(true);
    try {
      setSelectedProfile(profile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load location on map",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (profile: Profile) => {
    setDetailsProfile(profile);
    setIsDetailsOpen(true);
  };

  const handleAddProfile = (profile: Profile) => {
    setProfiles([...profiles, profile]);
    toast({
      title: "Success",
      description: "Profile added successfully",
    });
  };

  const handleEditProfile = (updatedProfile: Profile) => {
    setProfiles(
      profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter((p) => p.id !== id));
    toast({
      title: "Success",
      description: "Profile deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profile Explorer</h1>
          <Button onClick={() => setIsAdminView(!isAdminView)}>
            {isAdminView ? "View Profiles" : "Admin Panel"}
          </Button>
        </div>

        {isAdminView ? (
          <AdminPanel
            profiles={profiles}
            onAddProfile={handleAddProfile}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <SearchBar onSearch={handleSearch} />
              <ProfileList
                profiles={filteredProfiles}
                onShowLocation={handleShowLocation}
                onViewDetails={handleViewDetails}
              />
            </div>
            <div className="h-[calc(100vh-2rem)] sticky top-4">
              <Map selectedProfile={selectedProfile} />
            </div>
          </div>
        )}

        <ProfileDetails
          profile={detailsProfile}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;