import IntroSection from "@/features/Contact/components/IntroSection";
import { NavBar } from "@/Shared/Components/components/NavBar";
import React from "react";
import ContactForm from "@/features/Contact/components/ContactForm";
import StatsSidebar from "@/features/Contact/components/StatsSidebar";
import { Footer } from "@/Shared/Components/components/Footer";

const ContactPage: React.FC = () => {
  return (
    <div className="rx-page min-h-[100dvh] overflow-x-hidden">
      <NavBar />
      <main className="rx-container pt-28 md:pt-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="space-y-6">
            <IntroSection />
            <div className="rx-shell">
              <div className="rx-core p-5 md:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
          <StatsSidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
