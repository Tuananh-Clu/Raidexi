"use client";
import React, { useContext, useState } from "react";
import Button from "../../features/Auth/components/Button";
import InputField from "../../features/Auth/components/InputField";
import Checkbox from "../../features/Auth/components/CheckBox";
import BackgroundDecor from "../../features/Auth/components/BackgroundDecor";
import { useAuthentication } from "@/features/Auth/Hook/Authentication";
import { ChromiumIcon } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";


const page: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepActive, setKeepActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context=useContext(AuthContext);
  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      await context?.AuthLogin(email, password);
      setIsLoading(false);
    }, 2000);
  };

  const handleSSO = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await context?.AuthLoginWithGoogle();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="relative flex flex-col min-h-screen retro-grid">
        <button className="fixed z-20 p-2 transition border top-4 left-4 hover:bg-primary border-primary" onClick={() => window.history.back()}>
          <h1>Back</h1>
          </button>
        <BackgroundDecor />
        <div className="z-10 flex items-center justify-center flex-1 p-4 sm:p-8">
          <div className="w-full max-w-[520px] bg-panel-bg border border-border-brass shadow-[0_0_0_1px_rgba(0,0,0,0.5)] flex flex-col">
            {/* Header Section */}
            <div className="p-8 pb-6 border-b border-border-brass bg-panel-header">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent-brass font-mono text-xs tracking-widest border border-primary  px-2 py-0.5 opacity-80 select-none">
                    SYS.LOGIN.V1
                  </span>
                  <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                </div>
                <h1 className="text-3xl font-bold leading-none tracking-tight uppercase text-paper-white md:text-4xl">
                  RAIDEXI
                  <br />
                  INFRASTRUCTURE
                </h1>
                <p className="mt-2 text-sm italic font-normal tracking-wide text-text-dim font-display">
                  Authorized Personnel Only. All activities are logged.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleInitialize}
              className="flex flex-col gap-6 p-8"
            >
              <InputField
                label="Operator ID (Email)"
                type="email"
                placeholder="user@raidexi.com"
                icon="id_card"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
                required
              />

              <InputField
                label="Access Key (Password)"
                type="password"
                placeholder="••••••••••••"
                icon="key"
                value={password}
                onChange={(e:any) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between pt-2">
                <Checkbox
                  label="Keep session active"
                  checked={keepActive}
                  onChange={(e) => setKeepActive(e.target.checked)}
                />
                <a
                  href="#"
                  className="text-sm underline transition-all text-text-dim hover:text-accent-brass decoration-border-brass hover:decoration-accent-brass underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Reset sequence initiated.");
                  }}
                >
                  Reset Key?
                </a>
              </div>

              <Button
                type="submit"
                icon="terminal"
                fullWidth
                disabled={isLoading}
                className={isLoading ? "opacity-80 cursor-wait" : ""}
              >
                {isLoading ? "INITIALIZING..." : "INITIALIZE SESSION"}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border-brass"></div>
                <span className="flex-shrink mx-4 font-mono text-xs tracking-widest uppercase select-none text-border-brass">
                  Enterprise Access
                </span>
                <div className="flex-grow border-t border-border-brass"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                icon="domain_verification"
                fullWidth
                onClick={handleSSO}
                className="cursor-pointer hover:bg-amber-500"
              >
                <span className="flex flex-row items-center justify-center">
                  Sign in with Google <ChromiumIcon className="ml-2" size={16} />
                </span>
              </Button>
            </form>
            <div className="bg-[#15120e] border-t border-border-brass p-3 px-8 flex justify-between items-center text-[10px] text-border-brass font-mono uppercase select-none">
              <span>Status: Operational</span>
              <span>Latency: 12ms</span>
              <span>Port: 443</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
