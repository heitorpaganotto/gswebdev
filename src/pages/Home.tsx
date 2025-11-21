import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, TrendingUp } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Futuro do Trabalho</span>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Conecte-se com os
            <span className="gradient-primary bg-clip-text text-transparent"> Profissionais </span>
            do Futuro
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra talentos excepcionais, explore perfis profissionais completos e
            faça conexões que transformam o futuro do trabalho.
          </p>

          <Link to="/profiles">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Explorar Profissionais
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border card-hover">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">60+ Profissionais</h3>
            <p className="text-muted-foreground">
              Acesse uma base diversificada de profissionais qualificados em diversas áreas
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border card-hover">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Perfis Completos</h3>
            <p className="text-muted-foreground">
              Visualize experiências, habilidades, formação acadêmica e muito mais
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border card-hover">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Busca Avançada</h3>
            <p className="text-muted-foreground">
              Filtre por área, cidade, tecnologia e encontre o profissional ideal
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 p-12 rounded-2xl gradient-primary">
          <h2 className="text-4xl font-bold text-white">
            Pronto para Descobrir Talentos?
          </h2>
          <p className="text-xl text-white/90">
            Explore perfis profissionais detalhados e faça conexões significativas
          </p>
          <Link to="/profiles">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
              Começar Agora
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Futuro do Trabalho. Conectando profissionais e oportunidades.</p>
        </div>
      </footer>
    </div>
  );
}
