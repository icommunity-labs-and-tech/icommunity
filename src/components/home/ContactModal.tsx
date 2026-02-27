import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type OrganizationType =
  | "administracion-publica"
  | "proveedor-identidad"
  | "plataforma-regulada"
  | "partner-integrador"
  | "otro";

const orgOptions: { value: OrganizationType; label: string }[] = [
  { value: "administracion-publica", label: "Administración pública" },
  { value: "proveedor-identidad", label: "Proveedor identidad / KYC" },
  { value: "plataforma-regulada", label: "Plataforma regulada" },
  { value: "partner-integrador", label: "Partner / Integrador" },
  { value: "otro", label: "Otro" },
];

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultOrgType?: OrganizationType;
}

const ContactModal = ({ open, onOpenChange, defaultOrgType }: ContactModalProps) => {
  const [orgType, setOrgType] = useState<string>(defaultOrgType ?? "");
  const [privacy, setPrivacy] = useState(false);

  // Reset state when modal opens with a new default
  const handleOpenChange = (value: boolean) => {
    if (value && defaultOrgType) {
      setOrgType(defaultOrgType);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Hablemos sobre tu integración con iCommunity
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario de contacto para integración con iCommunity
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4 mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          <div>
            <Label htmlFor="contact-name" className="mb-1.5 block">Nombre completo *</Label>
            <Input id="contact-name" required placeholder="Tu nombre" />
          </div>

          <div>
            <Label htmlFor="contact-company" className="mb-1.5 block">Empresa / Organización *</Label>
            <Input id="contact-company" required placeholder="Tu empresa" />
          </div>

          <div>
            <Label htmlFor="contact-role" className="mb-1.5 block">Cargo *</Label>
            <Input id="contact-role" required placeholder="Tu cargo" />
          </div>

          <div>
            <Label htmlFor="contact-email" className="mb-1.5 block">Email corporativo *</Label>
            <Input id="contact-email" type="email" required placeholder="tu@empresa.com" />
          </div>

          <div>
            <Label htmlFor="contact-country" className="mb-1.5 block">País *</Label>
            <Input id="contact-country" required placeholder="País" />
          </div>

          <div>
            <Label className="mb-1.5 block">Tipo de organización *</Label>
            <Select value={orgType} onValueChange={setOrgType} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                {orgOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contact-message" className="mb-1.5 block">Caso de uso / mensaje</Label>
            <Textarea id="contact-message" placeholder="Describe tu caso de uso..." rows={3} />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="contact-privacy"
              checked={privacy}
              onCheckedChange={(v) => setPrivacy(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="contact-privacy" className="text-sm font-normal leading-snug cursor-pointer">
              Acepto política de privacidad
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={!privacy || !orgType}>
            Solicitar contacto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
