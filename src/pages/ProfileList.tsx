import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProfiles, Profile } from "@/contexts/ProfilesContext";
import { Card } from "@/components/Card";
import { SearchBar } from "@/components/SearchBar";
import { Filters, FilterValues } from "@/components/Filters";
import { ModalProfile } from "@/components/ModalProfile";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileList() {
  const { profiles } = useProfiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterValues>({
    role: "",
    city: "",
    technology: "",
  });
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // Busca por nome
      const matchesSearch = profile.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filtro por área/cargo
      const matchesRole = filters.role
        ? profile.role.toLowerCase().includes(filters.role.toLowerCase())
        : true;

      // Filtro por cidade
      const matchesCity = filters.city
        ? profile.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;

      // Filtro por tecnologia (hard skills)
      const matchesTechnology = filters.technology
        ? profile.hardSkills.some((skill) =>
            skill.toLowerCase().includes(filters.technology.toLowerCase())
          )
        : true;

      return matchesSearch && matchesRole && matchesCity && matchesTechnology;
    });
  }, [profiles, searchTerm, filters]);

  const handleCardClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProfile(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Futuro do Trabalho</span>
            </div>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Profissionais
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore {profiles.length} perfis profissionais
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <Filters filters={filters} onChange={setFilters} />
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredProfiles.length === profiles.length ? (
              <span>Mostrando todos os {profiles.length} profissionais</span>
            ) : (
              <span>
                Encontrados {filteredProfiles.length} de {profiles.length} profissionais
              </span>
            )}
          </div>
        </div>

        {/* Grid de Cards */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <Card
                key={profile.id}
                profile={profile}
                onClick={() => handleCardClick(profile)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Nenhum profissional encontrado com os filtros aplicados.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setFilters({ role: "", city: "", technology: "" });
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </main>

      {/* Modal */}
      <ModalProfile
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
