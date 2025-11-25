import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ContentSection {
  id: string;
  title: string;
  badge?: string;
  content: string | React.ReactNode;
}

interface ContentAccordionProps {
  sections: ContentSection[];
}

export default function ContentAccordion({ sections }: ContentAccordionProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {sections.map((section) => (
        <AccordionItem 
          key={section.id} 
          value={section.id}
          className="border border-border rounded-lg px-6 data-[state=open]:bg-card"
          data-testid={`accordion-${section.id}`}
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium text-foreground text-left">{section.title}</span>
              {section.badge && (
                <Badge variant="secondary" className="text-xs">
                  {section.badge}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-2">
            <div className="text-base text-foreground leading-relaxed">
              {section.content}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
