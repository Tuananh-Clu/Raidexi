"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileTag } from "../types";
import { useProfileTagApi } from "../hooks/useProfileTagApi";

const RELATION_OPTIONS = [
  { value: "Bố", icon: "man" },
  { value: "Mẹ", icon: "woman" },
  { value: "Anh/Chị", icon: "person" },
  { value: "Em", icon: "child_care" },
  { value: "Con", icon: "face" },
  { value: "Bạn bè", icon: "group" },
  { value: "Khác", icon: "more_horiz" },
];

const TAG_COLORS = [
  "#f2a60d",
  "#4ade80",
  "#60a5fa",
  "#f472b6",
  "#a78bfa",
  "#fb923c",
  "#2dd4bf",
  "#f87171",
];

interface ProfileTagSelectorProps {
  selectedProfile: ProfileTag | null;
  onSelectProfile: (profile: ProfileTag) => void;
  data: any;
  itIsMe?: boolean;
}

const ProfileTagSelector: React.FC<ProfileTagSelectorProps> = ({
  selectedProfile,
  onSelectProfile,
}) => {
  const { saveCustomProfile, getCustomProfiles } = useProfileTagApi();

  const DEFAULT_PROFILES: ProfileTag[] = [{
    id: "self",
    name: "Bản thân",
    color: "#f2a60d",
    dataMeasure: null,
  }];

  const [profiles, setProfiles] = useState<ProfileTag[]>([...DEFAULT_PROFILES]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("Bố");
  const [newColor, setNewColor] = useState(TAG_COLORS[1]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const serverProfiles = await getCustomProfiles();
        if (serverProfiles && serverProfiles.length > 0) {
          setProfiles([...DEFAULT_PROFILES, ...serverProfiles]);
        }
      } catch {
        const stored = localStorage.getItem("raidexi_profile_tags");
        if (stored) {
          setProfiles(JSON.parse(stored));
        }
      }
    };
    fetchProfiles();
  }, []);

  // Persist to localStorage as backup
  useEffect(() => {
    localStorage.setItem("raidexi_profile_tags", JSON.stringify(profiles));
  }, [profiles]);

  // Auto-select first profile
  useEffect(() => {
    if (!selectedProfile && profiles.length > 0) {
      onSelectProfile(profiles[0]);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setIsAdding(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddProfile = async () => {
    if (!newName.trim() || isSaving) return;
    const newProfile: ProfileTag = {
      id: `profile_${Date.now()}`,
      name: newName.trim(),
      color: newColor,
      dataMeasure: null,
    };

    setIsSaving(true);
    try {
      await saveCustomProfile(newProfile);
      setProfiles((prev) => [...prev, newProfile]);
      onSelectProfile(newProfile);
      resetForm();
    } catch {
      setProfiles((prev) => [...prev, newProfile]);
      onSelectProfile(newProfile);
      resetForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProfile = (id: string) => {
    if (id === "self") return;
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    if (selectedProfile?.id === id) {
      onSelectProfile(profiles[0]);
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setNewName("");
    setNewRelation("Bố");
    setNewColor(TAG_COLORS[1]);
  };

  return (
    <div ref={panelRef} className="relative">
      {/* ── Compact Tag Display ── */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full gap-3 p-3 transition-all border group border-grid-line hover:border-primary/40 bg-background-dark"
      >
        {/* Avatar circle */}
        <div
          className="relative flex items-center justify-center overflow-hidden border-2 shrink-0 w-9 h-9"
          style={{ borderColor: selectedProfile?.color || "#f2a60d" }}
        >
          {selectedProfile?.name ? (
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ color: selectedProfile?.color || "#f2a60d" }}
            >
              person
            </span>
          ) : (
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ color: selectedProfile?.color || "#f2a60d" }}
            >
              person
            </span>
          )}
          {/* Online dot */}
          <div
            className="absolute w-2 h-2 border-2 rounded-full -bottom-0.5 -right-0.5 border-background-dark"
            style={{
              backgroundColor: selectedProfile?.color || "#f2a60d",
            }}
          />
        </div>

        {/* Profile info */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-bold tracking-wide text-white truncate">
            {selectedProfile?.name || "Chọn hồ sơ"}
          </p>
          <p className="text-[9px] font-mono text-[#8a806d] tracking-wider uppercase">
            {selectedProfile?.id === "self" ? "Tôi" : "Người thân"}
          </p>
        </div>

        <span
          className={`material-symbols-outlined text-[16px] text-[#8a806d] group-hover:text-primary transition-all duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t-0 border border-grid-line bg-background-dark"
          >
            {/* ─ Profile List ─ */}
            <div className="p-2 space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
              {profiles.map((profile) => {
                const isSelected = selectedProfile?.id === profile.id;
                return (
                  <div
                    key={profile.id}
                    className={`flex items-center gap-2.5 p-2 transition-all cursor-pointer group/item ${
                      isSelected
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                    onClick={() => {
                      onSelectProfile(profile);
                      setIsExpanded(false);
                    }}
                  >
                    {/* Mini avatar */}
                    <div
                      className="flex items-center justify-center overflow-hidden border shrink-0 w-7 h-7"
                      style={{ borderColor: profile.color }}
                    >
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ color: profile.color }}
                      >
                        {RELATION_OPTIONS.find((r) => r.value === profile.name)
                          ?.icon || "person"}
                      </span>
                    </div>

                    {/* Name & relation */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white truncate tracking-wide">
                        {profile.name}
                      </p>
                    </div>

                    {/* Selected check */}
                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-[14px]">
                        check_circle
                      </span>
                    )}

                    {/* Delete (not for self) */}
                    {profile.id !== "self" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProfile(profile.id);
                        }}
                        className="opacity-0 group-hover/item:opacity-100 transition-opacity text-red-400/60 hover:text-red-400 p-0.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ─ Divider ─ */}
            <div className="mx-2 border-t border-grid-line" />

            {/* ─ Add New Button / Form ─ */}
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center w-full gap-2 p-3 transition-colors text-[#8a806d] hover:text-primary hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  person_add
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  Thêm người thân
                </span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 space-y-3"
              >
                <p className="text-[9px] font-mono text-primary tracking-[0.2em] uppercase">
                  ● Tạo hồ sơ mới
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Tên người thân..."
                      className="w-full px-3 py-2 text-xs font-bold tracking-wide text-white border outline-none bg-white/5 border-grid-line focus:border-primary placeholder:text-[#8a806d]/50"
                      maxLength={20}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[8px] font-mono text-[#8a806d] tracking-widest uppercase mb-1.5">
                    Quan hệ
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {RELATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setNewRelation(opt.value)}
                        className={`flex items-center gap-1 px-2 py-1 text-[9px] font-mono tracking-wider border transition-all ${
                          newRelation === opt.value
                            ? "border-primary bg-primary/15 text-primary"
                            : "border-grid-line text-[#8a806d] hover:border-white/20 hover:text-white/70"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {opt.icon}
                        </span>
                        {opt.value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color picker */}
                <div>
                  <p className="text-[8px] font-mono text-[#8a806d] tracking-widest uppercase mb-1.5">
                    Màu nhận diện
                  </p>
                  <div className="flex gap-1.5">
                    {TAG_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewColor(color)}
                        className={`w-5 h-5 transition-all ${
                          newColor === color
                            ? "ring-2 ring-white ring-offset-1 ring-offset-background-dark scale-110"
                            : "opacity-60 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={resetForm}
                    className="flex-1 h-8 text-[10px] font-mono uppercase tracking-wider border border-grid-line text-[#8a806d] hover:text-white hover:border-white/30 transition-all"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleAddProfile}
                    disabled={!newName.trim()}
                    className="flex-1 h-8 text-[10px] font-mono uppercase tracking-wider bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Lưu
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileTagSelector;
