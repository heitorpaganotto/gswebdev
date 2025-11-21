import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface FilterValues {
  role: string;
  city: string;
  technology: string;
}

interface FiltersProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
}

export function Filters({ filters, onChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClearFilters = () => {
    onChange({ role: "", city: "", technology: "" });
  };

  const hasActiveFilters = filters.role || filters.city || filters.technology;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {[filters.role, filters.city, filters.technology].filter(Boolean).length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtrar Profissionais</SheetTitle>
          <SheetDescription>
            Refine sua busca usando os filtros abaixo
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">Área/Cargo</Label>
            <Input
              id="role"
              placeholder="Ex: Desenvolvedor, Designer..."
              value={filters.role}
              onChange={(e) => onChange({ ...filters, role: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              value={filters.city}
              onChange={(e) => onChange({ ...filters, city: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technology">Tecnologia</Label>
            <Input
              id="technology"
              placeholder="Ex: React, Python, Figma..."
              value={filters.technology}
              onChange={(e) => onChange({ ...filters, technology: e.target.value })}
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleClearFilters}
            >
              <X className="h-4 w-4" />
              Limpar Filtros
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
