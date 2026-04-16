export const APP_NAME = 'Fractify';

export const SEVERITY_COLORS = {
  HIGH: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  MEDIUM: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  LOW: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  NONE: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' },
};

export const CLASSIFICATION_COLORS = {
  fracture: 'text-red-400',
  normal: 'text-green-400',
};

export const REGION_FULL_NAMES = {
  DIP: 'Distal Interphalangeal (DIP)',
  PIP: 'Proximal Interphalangeal (PIP)',
  MCP: 'Metacarpophalangeal (MCP)',
  Radius: 'Radius',
  Ulna: 'Ulna',
  Wrist: 'Wrist',
  'Fractured DIP': 'Fractured Distal Interphalangeal (DIP)',
  'Fractured PIP': 'Fractured Proximal Interphalangeal (PIP)',
  'Fractured MCP': 'Fractured Metacarpophalangeal (MCP)',
  'Fractured Radius': 'Fractured Radius',
  'Fractured Ulna': 'Fractured Ulna',
  'Fractured Wrist': 'Fractured Wrist',
  'Bone Fracture': 'Bone Fracture',
};