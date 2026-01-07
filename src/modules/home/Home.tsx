import styles from './Home.module.css';
import { ArchitectureSection } from './ui/ArchitectureSection';
import { FaqCtaSection } from './ui/FaqCtaSection';
import { FeaturesSection } from './ui/FeaturesSection';
import { HeroSection } from './ui/HeroSection';
import { PreIncidentSection } from './ui/PreIncidentSection';
import { RibbonSection } from './ui/RibbonSection';
import { ScenariosCarouselSection } from './ui/ScenariosCarouselSection';
import { UseCasesSection } from './ui/UseCasesSection';

export const Home = () => {
  return (
    <div className={styles.home}>
      <HeroSection styles={styles} />
      <RibbonSection styles={styles} />
      <PreIncidentSection styles={styles} />
      <FeaturesSection styles={styles} />
      <ScenariosCarouselSection styles={styles} />
      <UseCasesSection styles={styles} />
      <ArchitectureSection styles={styles} />
      <FaqCtaSection styles={styles} />
    </div>
  );
};
