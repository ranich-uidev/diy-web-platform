import { Navbar } from "./navbar";
import { Hero } from "./hero";
import {FeatureList} from "./feature-list";
import {ContactForm} from "./contact-form";

const COMPONENT_MAP: Record<string, React.FC<any>> = {
  Navbar,
  Hero,
  ContactForm,
  FeatureList
  // You can add FeatureList and ContactForm later
};

export function SiteRenderer({ layout }: { layout: any[] }) {
  return (
    <>
      {layout.map((section, index) => {
        const SelectedComponent = COMPONENT_MAP[section.component];
        if (!SelectedComponent) return null;
        return <SelectedComponent key={index} {...section.props} />;
      })}
    </>
  );
}