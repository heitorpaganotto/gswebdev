import { useState } from "react";
import { Profile, useProfiles } from "@/contexts/ProfilesContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Wrench,
  Heart,
  GamepadIcon,
  Mail,
  Phone,
  Linkedin,
  ThumbsUp,
  MessageSquare,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ModalProfileProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalProfile({ profile, isOpen, onClose }: ModalProfileProps) {
  const { recommendations, addRecommendation } = useProfiles();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageData, setMessageData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  if (!profile) return null;

  const recommendationCount = recommendations[profile.id] || 0;

  const handleRecommend = () => {
    addRecommendation(profile.id);
    toast.success("Recomendação enviada com sucesso!");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mensagem enviada:", {
      to: profile.name,
      from: messageData,
    });
    
    // Salvar no localStorage
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push({
      to: profile.id,
      toName: profile.name,
      from: messageData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("messages", JSON.stringify(messages));

    toast.success(`Mensagem enviada para ${profile.name}!`);
    setMessageData({ name: "", contact: "", message: "" });
    setShowMessageForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Perfil de {profile.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Informações detalhadas do perfil profissional
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com foto e informações principais */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-primary/10"
            />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-lg text-muted-foreground">{profile.age} anos</p>
              
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="font-medium">{profile.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.city}, {profile.state}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {profile.company}
              </p>

              {recommendationCount > 0 && (
                <div className="flex items-center gap-2 text-primary font-medium">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{recommendationCount} recomendaç{recommendationCount === 1 ? 'ão' : 'ões'}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Formação Acadêmica */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
            </div>
            <p className="text-muted-foreground">{profile.academicBackground}</p>
          </div>

          <Separator />

          {/* Experiência */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Experiência Profissional</h3>
            </div>
            <ul className="space-y-2">
              {profile.experience.map((exp, index) => (
                <li key={index} className="text-muted-foreground flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Hard Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Hard Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.hardSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Soft Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Hobbies */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <GamepadIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Hobbies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3 py-1 bg-accent/50 text-accent-foreground rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contatos */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Contatos</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${profile.phone}`} className="hover:text-primary transition-colors">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Linkedin className="h-4 w-4 text-primary" />
                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {profile.linkedin}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          {/* Formulário de Mensagem */}
          {showMessageForm ? (
            <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Enviar Mensagem</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMessageForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Seu nome</Label>
                  <Input
                    id="name"
                    value={messageData.name}
                    onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Seu contato (email ou telefone)</Label>
                  <Input
                    id="contact"
                    value={messageData.contact}
                    onChange={(e) => setMessageData({ ...messageData, contact: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={messageData.message}
                    onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleRecommend} className="flex-1 gap-2">
                <ThumbsUp className="h-4 w-4" />
                Recomendar Profissional
              </Button>
              <Button
                onClick={() => setShowMessageForm(true)}
                variant="outline"
                className="flex-1 gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Enviar Mensagem
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
