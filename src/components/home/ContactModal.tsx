import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
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
  { value: "administracion-publica", label: "Public administration" },
  { value: "proveedor-identidad", label: "Identity / KYC provider" },
  { value: "plataforma-regulada", label: "Regulated platform" },
  { value: "partner-integrador", label: "Partner / Integrator" },
  { value: "otro", label: "Other" },
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

      toast({ title: "Message sent", description: "We will get back to you soon." });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not send the message. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Let's talk about your integration with iCommunity
          </DialogTitle>
          <DialogDescription className="sr-only">
            Contact form for iCommunity integration
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="contact-name" className="mb-1.5 block">Full name *</Label>
            <Input id="contact-name" name="contact-name" required placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="contact-company" className="mb-1.5 block">Company / Organization *</Label>
            <Input id="contact-company" name="contact-company" required placeholder="Your company" />
          </div>
          <div>
            <Label htmlFor="contact-role" className="mb-1.5 block">Role *</Label>
            <Input id="contact-role" name="contact-role" required placeholder="Your role" />
          </div>
          <div>
            <Label htmlFor="contact-email" className="mb-1.5 block">Corporate email *</Label>
            <Input id="contact-email" name="contact-email" type="email" required placeholder="you@company.com" />
          </div>
          <div>
            <Label htmlFor="contact-country" className="mb-1.5 block">Country *</Label>
            <Input id="contact-country" name="contact-country" required placeholder="Country" />
          </div>
          <div>
            <Label className="mb-1.5 block">Organization type *</Label>
            <Select value={orgType} onValueChange={setOrgType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {orgOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contact-message" className="mb-1.5 block">Use case / message</Label>
            <Textarea id="contact-message" name="contact-message" placeholder="Describe your use case..." rows={3} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="contact-privacy"
              checked={privacy}
              onCheckedChange={(v) => setPrivacy(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="contact-privacy" className="text-sm font-normal leading-snug cursor-pointer">
              I accept the privacy policy
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={!privacy || !orgType || sending}>
            {sending ? "Sending..." : "Request contact"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
