import IntroSection from '@/features/Contact/components/IntroSection';
import { NavBar } from '@/Shared/Components/components/NavBar';
import React from 'react';
import ContactForm from '@/features/Contact/components/ContactForm';
import StatsSidebar from '@/features/Contact/components/StatsSidebar';
import { Footer } from '@/Shared/Components/components/Footer';
const App: React.FC = () => {
  return (
    <div className="flex flex-col w-full ] mx-auto border-x border-[#e2e8f0] min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-x-hidden">
      <NavBar />
      
      <main className="flex flex-col grow lg:flex-row">
        <div className="flex flex-col w-full border-b lg:w-2/3 lg:border-b-0 lg:border-r border-[#e2e8f0]">
          <IntroSection />
          <div className="p-8 lg:p-12 bg-[#ffffff] grow">
            <ContactForm />
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col bg-[#f8fafc]">
          <StatsSidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;