"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileTag } from "../types";
import { useProfileTagApi } from "../hooks/useProfileTagApi";
import {
  ChevronDown,
  User,
  Check,
  X,
  UserPlus,
  Baby,
  Smile,
  Users,
  MoreHorizontal
} from "lucide-react";

const RELATION_OPTIONS = [
  { value: "Bố", icon: User },
  { value: "Mẹ", icon: User },
  { value: "Anh/Chị", icon: User },
  { value: "Em", icon: Baby },
  { value: "Con", icon: Smile },
  { value: "Bạn bè", icon: Users },
  { value: "Khác", icon: MoreHorizontal },
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
    <div ref={panelRef} className="relative w-full font-sans">
      {/* ── Compact Tag Display ── */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full gap-3 p-3 transition-all duration-300 border rounded-xl group border-slate-200 hover:border-blue-400 bg-white shadow-sm hover:shadow-md"
      >
        {/* Avatar circle */}
        <div
          className="relative flex items-center justify-center shrink-0 w-10 h-10 rounded-full border-2 transition-colors duration-300"
          style={{ borderColor: selectedProfile?.color || "#3b82f6", backgroundColor: (selectedProfile?.color || "#3b82f6") + "15" }}
        >
          <User size={18} style={{ color: selectedProfile?.color || "#3b82f6" }} />
          {/* Online dot */}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full"
            style={{ backgroundColor: selectedProfile?.color || "#3b82f6" }}
          />
        </div>

        {/* Profile info */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-bold tracking-wide text-slate-800 truncate group-hover:text-blue-700 transition-colors">
            {selectedProfile?.name || "Chọn hồ sơ"}
          </p>
          <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
            {selectedProfile?.id === "self" ? "Tôi" : "Người thân"}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`text-slate-400 group-hover:text-blue-500 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          >
            {/* ─ Profile List ─ */}
            <div className="p-2 space-y-1 max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {profiles.map((profile) => {
                const isSelected = selectedProfile?.id === profile.id;
                const IconComp = RELATION_OPTIONS.find((r) => r.value === profile.name)?.icon || User;
                
                return (
                  <div
                    key={profile.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-all cursor-pointer group/item ${
                      isSelected
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                    onClick={() => {
                      onSelectProfile(profile);
                      setIsExpanded(false);
                    }}
                  >
                    {/* Mini avatar */}
                    <div
                      className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full border-2 transition-colors duration-300"
                      style={{ borderColor: profile.color, backgroundColor: profile.color + "15" }}
                    >
                      <IconComp size={14} style={{ color: profile.color }} />
                    </div>

                    {/* Name & relation */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate tracking-wide ${isSelected ? "text-blue-700" : "text-slate-700 group-hover/item:text-blue-600"}`}>
                        {profile.name}
                      </p>
                    </div>

                    {/* Selected check */}
                    {isSelected && <Check size={16} className="text-blue-600" />}

                    {/* Delete (not for self) */}
                    {profile.id !== "self" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProfile(profile.id);
                        }}
                        className="opacity-0 group-hover/item:opacity-100 transition-opacity text-rose-500/60 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ─ Divider ─ */}
            <div className="mx-3 border-t border-slate-100" />

            {/* ─ Add New Button / Form ─ */}
            {!isAdding ? (
               <button
                onClick={() => setIsAdding(true)}
                className="flex items-center justify-center w-full gap-2 px-4 py-3.5 transition-colors text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <UserPlus size={16} />
                <span className="text-[11px] font-bold uppercase tracking-widest mt-0.5">
                  Thêm người thân
                </span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 space-y-4 bg-slate-50 border-t border-slate-200"
              >
                <p className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">
                  ● Tạo hồ sơ mới
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Tên người thân..."
                      className="w-full px-3.5 py-2.5 text-sm font-semibold tracking-wide text-slate-800 rounded-lg border outline-none bg-white border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 transition-all shadow-sm"
                      maxLength={20}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-2">
                    Quan hệ
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {RELATION_OPTIONS.map((opt) => {
                      const OptIcon = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setNewRelation(opt.value)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium tracking-wide border transition-all ${
                            newRelation === opt.value
                              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                              : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-white bg-slate-50"
                          }`}
                        >
                          <OptIcon size={12} />
                          {opt.value}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color picker */}
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-2">
                    Màu nhận diện
                  </p>
                  <div className="flex gap-2">
                    {TAG_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewColor(color)}
                        className={`w-6 h-6 rounded-full transition-all duration-300 ${
                          newColor === color
                            ? "ring-2 ring-white ring-offset-2 ring-offset-slate-100 scale-110 shadow-md"
                            : "opacity-40 hover:opacity-100 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={resetForm}
                    className="flex-1 h-10 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-white transition-all active:scale-[0.98] shadow-sm"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleAddProfile}
                    disabled={!newName.trim()}
                    className="flex-1 h-10 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
