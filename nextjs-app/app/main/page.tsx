import HeroSection from '../components/HeroSection';
import ProcessSteps from '../components/ProcessSteps';
import InternalLinks from '../components/InternalLinks';
import ValueProps from '../components/ValueProps';
import MiniFAQ from '../components/MiniFAQ';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import FABSpeedDial from '../components/FABSpeedDial';
import Footer from '../components/Footer';

export default function Main() {
  return (
    <>
      <HeroSection />
      <ProcessSteps />
      <InternalLinks />
      <ValueProps />
      <MiniFAQ />
      <Stats />
      <Testimonials />
      <CallToAction />
      <FABSpeedDial />
     
    </>
  );
} 