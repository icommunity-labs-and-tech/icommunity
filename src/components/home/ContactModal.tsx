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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = (value: boolean) => {
    if (value && defaultOrgType) {
      setOrgType(defaultOrgType);
    }
    onOpenChange(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
          type: "contact",
          data: {
            name: formData.get("contact-name"),
            company: formData.get("contact-company"),
            role: formData.get("contact-role"),
            email: formData.get("contact-email"),
            country: formData.get("contact-country"),
            orgType,
            message: formData.get("contact-message"),
          },
        },
      });

      if (error) throw error;

      toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto contigo pronto." });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "No se pudo enviar el mensaje. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setSending(false);
    }
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

        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="contact-name" className="mb-1.5 block">Nombre completo *</Label>
            <Input id="contact-name" name="contact-name" required placeholder="Tu nombre" />
          </div>

          <div>
            <Label htmlFor="contact-company" className="mb-1.5 block">Empresa / Organización *</Label>
            <Input id="contact-company" name="contact-company" required placeholder="Tu empresa" />
          </div>

          <div>
            <Label htmlFor="contact-role" className="mb-1.5 block">Cargo *</Label>
            <Input id="contact-role" name="contact-role" required placeholder="Tu cargo" />
          </div>

          <div>
            <Label htmlFor="contact-email" className="mb-1.5 block">Email corporativo *</Label>
            <Input id="contact-email" name="contact-email" type="email" required placeholder="tu@empresa.com" />
          </div>

          <div>
            <Label htmlFor="contact-country" className="mb-1.5 block">País *</Label>
            <Input id="contact-country" name="contact-country" required placeholder="País" />
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
            <Textarea id="contact-message" name="contact-message" placeholder="Describe tu caso de uso..." rows={3} />
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

          <Button type="submit" className="w-full" disabled={!privacy || !orgType || sending}>
            {sending ? "Enviando..." : "Solicitar contacto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
