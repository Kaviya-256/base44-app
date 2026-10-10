import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "revora_prototype_state_v1";

const defaultState = {
  user: { signedIn: false, name: "" },
  professional: { signedIn: false, name: "", role: "professional" },
  favouriteProfessionalId: "pro-1",
  addresses: [],
  bookings: [],
  draft: null,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

const RevoraContext = createContext(null);

export function RevoraProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const signIn = useCallback((name) => {
    setState((s) => ({ ...s, user: { signedIn: true, name: name || "Vineeth" } }));
  }, []);

  const signOut = useCallback(() => {
    setState((s) => ({ ...s, user: { signedIn: false, name: "" } }));
  }, []);

  const signInAsProfessional = useCallback((name) => {
    setState((s) => ({ ...s, professional: { signedIn: true, name: name || "Arjun Menon", role: "professional" } }));
  }, []);

  const signInAsAdmin = useCallback((name) => {
    setState((s) => ({ ...s, professional: { signedIn: true, name: name || "THE REVORA Admin", role: "admin" } }));
  }, []);

  const signOutProfessional = useCallback(() => {
    setState((s) => ({ ...s, professional: { signedIn: false, name: "", role: "professional" } }));
  }, []);

  const toggleFavourite = useCallback((proId) => {
    setState((s) => ({
      ...s,
      favouriteProfessionalId: s.favouriteProfessionalId === proId ? null : proId,
    }));
  }, []);

  const addAddress = useCallback((address) => {
    const id = `addr-${Date.now()}`;
    const withId = { ...address, id };
    setState((s) => ({ ...s, addresses: [...s.addresses, withId] }));
    return id;
  }, []);

  const startDraft = useCallback((initial) => {
    setState((s) => ({ ...s, draft: { addonIds: [], assignmentMode: "auto", ...initial } }));
  }, []);

  const updateDraft = useCallback((patch) => {
    setState((s) => ({ ...s, draft: { ...s.draft, ...patch } }));
  }, []);

  const clearDraft = useCallback(() => {
    setState((s) => ({ ...s, draft: null }));
  }, []);

  const confirmBooking = useCallback((bookingData) => {
    const id = `RVR-${Math.floor(100000 + Math.random() * 900000)}`;
    const booking = {
      id,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      paymentStatus: "paid",
      ...bookingData,
    };
    setState((s) => ({ ...s, bookings: [booking, ...s.bookings], draft: null }));
    return booking;
  }, []);

  const updateBooking = useCallback((id, patch) => {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }, []);

  const value = {
    state,
    signIn,
    signOut,
    signInAsProfessional,
    signInAsAdmin,
    signOutProfessional,
    toggleFavourite,
    addAddress,
    startDraft,
    updateDraft,
    clearDraft,
    confirmBooking,
    updateBooking,
  };

  return <RevoraContext.Provider value={value}>{children}</RevoraContext.Provider>;
}

export function useRevora() {
  const ctx = useContext(RevoraContext);
  if (!ctx) throw new Error("useRevora must be used within RevoraProvider");
  return ctx;
}
