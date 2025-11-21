import { createContext, useContext, useState, ReactNode } from "react";
import profilesData from "@/data/profiles.json";

export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  role: string;
  company: string;
  profilePicture: string;
  academicBackground: string;
  experience: string[];
  hardSkills: string[];
  softSkills: string[];
  hobbies: string[];
  email: string;
  phone: string;
  linkedin: string;
}

interface ProfilesContextType {
  profiles: Profile[];
  recommendations: Record<string, number>;
  addRecommendation: (profileId: string) => void;
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined);

export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [profiles] = useState<Profile[]>(profilesData);
  const [recommendations, setRecommendations] = useState<Record<string, number>>(() => {
    const stored = localStorage.getItem("recommendations");
    return stored ? JSON.parse(stored) : {};
  });

  const addRecommendation = (profileId: string) => {
    setRecommendations((prev) => {
      const newRecommendations = {
        ...prev,
        [profileId]: (prev[profileId] || 0) + 1,
      };
      localStorage.setItem("recommendations", JSON.stringify(newRecommendations));
      return newRecommendations;
    });
  };

  return (
    <ProfilesContext.Provider value={{ profiles, recommendations, addRecommendation }}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error("useProfiles must be used within ProfilesProvider");
  }
  return context;
}
