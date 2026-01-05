import RegistrationForm from '@/features/Auth/components/RegistrationForm';
import { NavBar } from '@/Shared/Components/components/NavBar';
import React from 'react';


const App: React.FC = () => {
  return (
    <>
    <NavBar />
      <main className="flex flex-col items-center justify-center flex-1 w-full h-screen p-4 mx-auto lg:p-12 max-w-360">
        <RegistrationForm />
        <footer className="mt-12 text-center">
          <p className="text-[#544d3b] text-sm font-sans">
            © 2024 RAIDEXI SYSTEMS. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </>
  );
};

export default App;