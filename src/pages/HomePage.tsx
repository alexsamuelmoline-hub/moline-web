import Hero from '@/components/Hero';
import PartnersBanner from '@/components/PartnersBanner';
import BusinessUnitsGrid from '@/components/BusinessUnitsGrid';
import HvacCalculator from '@/components/HvacCalculator';
import ContactForm from '@/components/ContactForm';

interface HomePageProps {
  onNavigate: (page: 'home', section?: string) => void;
  onNavigateUnit: (unitId: number) => void;
}

export default function HomePage({
  onNavigate,
  onNavigateUnit,
}: HomePageProps) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <BusinessUnitsGrid onNavigateUnit={onNavigateUnit} onNavigate={onNavigate} />
      <HvacCalculator />
      <PartnersBanner />
      <ContactForm onNavigate={onNavigate} />
    </main>
  );
}
