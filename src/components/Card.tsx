import { Profile } from "@/contexts/ProfilesContext";
import { MapPin, Briefcase, ThumbsUp } from "lucide-react";
import { useProfiles } from "@/contexts/ProfilesContext";

interface CardProps {
  profile: Profile;
  onClick: () => void;
}

export function Card({ profile, onClick }: CardProps) {
  const { recommendations } = useProfiles();
  const recommendationCount = recommendations[profile.id] || 0;

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-6 cursor-pointer card-hover transition-all duration-300 border border-border"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img
            src={profile.profilePicture}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-primary/10"
          />
          {recommendationCount > 0 && (
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-semibold">
              {recommendationCount}
            </div>
          )}
        </div>

        <div className="space-y-2 w-full">
          <h3 className="text-xl font-semibold text-foreground">{profile.name}</h3>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span className="font-medium">{profile.role}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{profile.city}, {profile.state}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {profile.hardSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {profile.hardSkills.length > 3 && (
            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
              +{profile.hardSkills.length - 3}
            </span>
          )}
        </div>

        {recommendationCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <ThumbsUp className="h-4 w-4" />
            <span>{recommendationCount} recomendaç{recommendationCount === 1 ? 'ão' : 'ões'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
