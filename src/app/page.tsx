import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { DomainPortfolio } from "@/components/sections/domain-portfolio";

export default function Home() {
  return (
    <DomainPortfolio>
      <About />
      <Contact />
    </DomainPortfolio>
  );
}
