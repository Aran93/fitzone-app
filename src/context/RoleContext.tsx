import React, { createContext, useContext, useState } from 'react';

export type Role = 'MEMBER' | 'ADMIN' | 'RECEPTION' | 'TRAINER';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('MEMBER');
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole muss innerhalb von <RoleProvider> genutzt werden');
  return ctx;
};
