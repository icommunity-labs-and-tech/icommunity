import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

export type OrganizationType = "administracion-publica" | "proveedor-identidad" | "plataforma-regulada" | "partner-integrador" | "otro";

const texts = {
  en: {
    title: "Let's talk about your integration with iCommunity",
    srDesc: "Contact form for iCommunity integration",
    name: "Full name *", namePh: "Your name",
    company: "Company / Organization *", companyPh: "Your company",
    role: "Role *", rolePh: "Your role",
    email: "Corporate email *", emailPh: "you@company.com",
    country: "Country *", countryPh: "Country",
    orgLabel: "Organization type *", orgPh: "Select type",
    message: "Use case / message", messagePh: "Describe your use case...",
    privacy: "I accept the privacy policy",
    submit: "Request contact", sending: "Sending...",
    successTitle: "Message sent", successDesc: "We will get back to you soon.",
    errorTitle: "Error", errorDesc: "Could not send the message. Please try again.",
    orgOptions: [
      { value: "administracion-publica" as OrganizationType, label: "Public administration" },
      { value: "proveedor-identidad" as OrganizationType, label: "Identity / KYC provider" },
      { value: "plataforma-regulada" as OrganizationType, label: "Regulated platform" },
      { value: "partner-integrador" as OrganizationType, label: "Partner / Integrator" },
      { value: "otro" as OrganizationType, label: "Other" },
    ],
  },
  es: {
    title: "Hablemos sobre tu integración con iCommunity",
    srDesc: "Formulario de contacto para integración con iCommunity",
    name: "Nombre completo *", namePh: "Tu nombre",
    company: "Empresa / Organización *", companyPh: "Tu empresa",
    role: "Cargo *", rolePh: "Tu cargo",
    email: "Email corporativo *", emailPh: "tu@empresa.com",
    country: "País *", countryPh: "País",
    orgLabel: "Tipo de organización *", orgPh: "Seleccionar tipo",
    message: "Caso de uso / mensaje", messagePh: "Describe tu caso de uso...",
    privacy: "Acepto la política de privacidad",
    submit: "Solicitar contacto", sending: "Enviando...",
    successTitle: "Mensaje enviado", successDesc: "Nos pondremos en contacto pronto.",
    errorTitle: "Error", errorDesc: "No se pudo enviar el mensaje. Inténtelo de nuevo.",
    orgOptions: [
      { value: "administracion-publica" as OrganizationType, label: "Administración pública" },
      { value: "proveedor-identidad" as OrganizationType, label: "Proveedor de identidad / KYC" },
      { value: "plataforma-regulada" as OrganizationType, label: "Plataforma regulada" },
      { value: "partner-integrador" as OrganizationType, label: "Partner / Integrador" },
      { value: "otro" as OrganizationType, label: "Otro" },
    ],
  },
};

interface ContactModalProps { open: boolean; onOpenChange: (open: boolean) => void; defaultOrgType?: OrganizationType; }

const ContactModal = ({ open, onOpenChange, defaultOrgType }: ContactModalProps) => {
  const [orgType, setOrgType] = useState<string>(defaultOrgType ?? "");
  const [privacy, setPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const { lang } = useLanguage();
  const t = texts[lang];

  const handleOpenChange = (value: boolean) => {
    if (value && defaultOrgType) setOrgType(defaultOrgType);
    onOpenChange(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: { type: "contact", data: { name: formData.get("contact-name"), company: formData.get("contact-company"), role: formData.get("contact-role"), email: formData.get("contact-email"), country: formData.get("contact-country"), orgType, message: formData.get("contact-message") } },
      });
      if (error) throw error;
      toast({ title: t.successTitle, description: t.successDesc });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({ title: t.errorTitle, description: t.errorDesc, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t.title}</DialogTitle>
          <DialogDescription className="sr-only">{t.srDesc}</DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div><Label htmlFor="contact-name" className="mb-1.5 block">{t.name}</Label><Input id="contact-name" name="contact-name" required placeholder={t.namePh} /></div>
          <div><Label htmlFor="contact-company" className="mb-1.5 block">{t.company}</Label><Input id="contact-company" name="contact-company" required placeholder={t.companyPh} /></div>
          <div><Label htmlFor="contact-role" className="mb-1.5 block">{t.role}</Label><Input id="contact-role" name="contact-role" required placeholder={t.rolePh} /></div>
          <div><Label htmlFor="contact-email" className="mb-1.5 block">{t.email}</Label><Input id="contact-email" name="contact-email" type="email" required placeholder={t.emailPh} /></div>
          <div><Label htmlFor="contact-country" className="mb-1.5 block">{t.country}</Label><Input id="contact-country" name="contact-country" required placeholder={t.countryPh} /></div>
          <div>
            <Label className="mb-1.5 block">{t.orgLabel}</Label>
            <Select value={orgType} onValueChange={setOrgType} required><SelectTrigger><SelectValue placeholder={t.orgPh} /></SelectTrigger><SelectContent>{t.orgOptions.map((o) => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}</SelectContent></Select>
          </div>
          <div><Label htmlFor="contact-message" className="mb-1.5 block">{t.message}</Label><Textarea id="contact-message" name="contact-message" placeholder={t.messagePh} rows={3} /></div>
          <div className="flex items-start gap-2">
            <Checkbox id="contact-privacy" checked={privacy} onCheckedChange={(v) => setPrivacy(v === true)} className="mt-0.5" />
            <Label htmlFor="contact-privacy" className="text-sm font-normal leading-snug cursor-pointer">{t.privacy}</Label>
          </div>
          <Button type="submit" className="w-full" disabled={!privacy || !orgType || sending}>{sending ? t.sending : t.submit}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
