"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, User, UserPlus, X } from "lucide-react";
import { ProfileTag } from "../types";
import { useProfileTagApi } from "../hooks/useProfileTagApi";

const RELATIONS = ["Bố", "Mẹ", "Anh/Chị", "Em", "Con", "Bạn bè", "Khác"];
const TAG_COLORS = [
  "var(--signal-blue)",
  "var(--tailor-red)",
  "var(--brass)",
  "var(--sage)",
  "var(--signal-blue-dark)",
  "var(--ink-muted)",
];

interface ProfileTagSelectorProps {
  selectedProfile: ProfileTag | null;
  onSelectProfile: (profile: ProfileTag) => void;
  data: unknown;
  itIsMe?: boolean;
}

const DEFAULT_PROFILE: ProfileTag = {
  id: "self",
  name: "Bản thân",
  color: "var(--signal-blue)",
  dataMeasure: null,
};

const panelMotion = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
  transition: { duration: 0.42, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
};

const ProfileTagSelector: React.FC<ProfileTagSelectorProps> = ({ selectedProfile, onSelectProfile }) => {
  const { saveCustomProfile, getCustomProfiles } = useProfileTagApi();
  const [profiles, setProfiles] = useState<ProfileTag[]>([DEFAULT_PROFILE]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState(RELATIONS[0]);
  const [newColor, setNewColor] = useState(TAG_COLORS[1]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const serverProfiles = await getCustomProfiles();
        setProfiles(serverProfiles?.length ? [DEFAULT_PROFILE, ...serverProfiles] : [DEFAULT_PROFILE]);
      } catch {
        const stored = localStorage.getItem("raidexi_profile_tags");
        setProfiles(stored ? JSON.parse(stored) : [DEFAULT_PROFILE]);
      }
    };

    fetchProfiles();
  }, [getCustomProfiles]);

  useEffect(() => {
    localStorage.setItem("raidexi_profile_tags", JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (!selectedProfile && profiles.length > 0) onSelectProfile(profiles[0]);
  }, [onSelectProfile, profiles, selectedProfile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setIsAdding(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetForm = () => {
    setIsAdding(false);
    setNewName("");
    setNewRelation(RELATIONS[0]);
    setNewColor(TAG_COLORS[1]);
  };

  const handleAddProfile = async () => {
    if (!newName.trim() || isSaving) return;

    const newProfile: ProfileTag = {
      id: `profile_${Date.now()}`,
      name: `${newName.trim()} · ${newRelation}`,
      color: newColor,
      dataMeasure: null,
    };

    setIsSaving(true);
    try {
      await saveCustomProfile(newProfile);
    } finally {
      setProfiles((current) => [...current, newProfile]);
      onSelectProfile(newProfile);
      setIsSaving(false);
      setIsExpanded(false);
      resetForm();
    }
  };

  const handleDeleteProfile = (id: string) => {
    if (id === "self") return;
    setProfiles((current) => current.filter((profile) => profile.id !== id));
    if (selectedProfile?.id === id) onSelectProfile(DEFAULT_PROFILE);
  };

  return (
    <div ref={panelRef} className="relative w-full">
      <button
        onClick={() => setIsExpanded((value) => !value)}
        className="rx-input group flex min-h-[70px] w-full items-center gap-3 px-4 text-left"
        aria-expanded={isExpanded}
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-[rgba(24,23,20,0.12)]"
          style={{ backgroundColor: `${selectedProfile?.color || "var(--signal-blue)"}18` }}
        >
          <User size={17} strokeWidth={1.35} style={{ color: selectedProfile?.color || "var(--signal-blue)" }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-extrabold text-[var(--ink)]">
            {selectedProfile?.name || "Chọn hồ sơ"}
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase text-[var(--ink-muted)]">
            {selectedProfile?.id === "self" ? "hồ sơ cơ thể chính" : "hồ sơ fit người thân"}
          </span>
        </span>
        <ChevronDown
          size={17}
          strokeWidth={1.35}
          className={`text-[var(--ink-muted)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            {...panelMotion}
            className="rx-shell absolute left-0 right-0 z-40 mt-2"
          >
            <div className="rx-core overflow-hidden p-2">
              <div className="max-h-[230px] space-y-1 overflow-y-auto pr-1">
                {profiles.map((profile) => {
                  const isSelected = selectedProfile?.id === profile.id;

                  return (
                    <button
                      key={profile.id}
                      onClick={() => {
                        onSelectProfile(profile);
                        setIsExpanded(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-[1.1rem] border p-3 text-left transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isSelected
                          ? "border-[var(--signal-blue)] bg-[rgba(93,116,101,0.08)]"
                          : "border-transparent hover:border-[rgba(24,23,20,0.12)] hover:bg-[rgba(24,23,20,0.04)]"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: profile.color }} />
                      <span className="flex-1 truncate text-sm font-bold text-[var(--ink)]">{profile.name}</span>
                      {isSelected && <Check size={15} strokeWidth={1.35} className="text-[var(--signal-blue)]" />}
                      {profile.id !== "self" && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteProfile(profile.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              handleDeleteProfile(profile.id);
                            }
                          }}
                          className="rounded-full p-1 text-[var(--ink-muted)] hover:bg-[rgba(200,60,54,0.1)] hover:text-[var(--tailor-red)]"
                          aria-label={`Xóa ${profile.name}`}
                        >
                          <X size={13} strokeWidth={1.35} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {!isAdding ? (
                <button onClick={() => setIsAdding(true)} className="rx-btn rx-btn-secondary mt-2 w-full" type="button">
                  <UserPlus size={14} strokeWidth={1.35} />
                  Thêm hồ sơ người thân
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
                  className="mt-2 rounded-[1.35rem] bg-[var(--surface-linen)] p-4 ring-1 ring-[rgba(24,23,20,0.08)]"
                >
                  <p className="rx-label">Hồ sơ mới</p>
                  <input
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder="Tên người thân"
                    className="rx-input mt-2"
                    maxLength={24}
                  />

                  <div className="mt-4">
                    <p className="rx-label">Quan hệ</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {RELATIONS.map((relation) => (
                        <button
                          key={relation}
                          onClick={() => setNewRelation(relation)}
                          type="button"
                          className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            newRelation === relation
                              ? "bg-[var(--ink)] text-[var(--surface-paper)]"
                              : "bg-[rgba(24,23,20,0.06)] text-[var(--ink-soft)] hover:bg-[rgba(24,23,20,0.1)]"
                          }`}
                        >
                          {relation}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="rx-label">Màu nhận diện</p>
                    <div className="mt-2 flex gap-2">
                      {TAG_COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setNewColor(color)}
                          className={`h-7 w-7 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${newColor === color ? "scale-110 ring-2 ring-[var(--surface-paper)] ring-offset-2 ring-offset-[var(--surface-linen)]" : "opacity-60 hover:opacity-100"}`}
                          style={{ backgroundColor: color }}
                          type="button"
                          aria-label={`Chọn màu ${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button onClick={resetForm} className="rx-btn rx-btn-secondary" type="button">Hủy</button>
                    <button
                      onClick={handleAddProfile}
                      disabled={!newName.trim() || isSaving}
                      className={`rx-btn rx-btn-primary ${!newName.trim() || isSaving ? "rx-btn-disabled" : ""}`}
                      type="button"
                    >
                      {isSaving ? "Đang lưu" : "Lưu"}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileTagSelector;
