import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  whatsappNumber: string;
  instagramHandle?: string;
  timestamp: string;
}

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

export async function saveWaitlistEntry(data: Omit<WaitlistEntry, 'id' | 'timestamp'>): Promise<WaitlistEntry> {
  // Ensure data directory exists
  const dataDir = path.dirname(WAITLIST_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Create new entry
  const entry: WaitlistEntry = {
    id: generateId(),
    ...data,
    timestamp: new Date().toISOString(),
  };

  // Read existing entries
  let entries: WaitlistEntry[] = [];
  if (fs.existsSync(WAITLIST_FILE)) {
    const fileContent = fs.readFileSync(WAITLIST_FILE, 'utf-8');
    entries = JSON.parse(fileContent);
  }

  // Add new entry
  entries.push(entry);

  // Save to file
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8');

  return entry;
}

export async function getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
  if (!fs.existsSync(WAITLIST_FILE)) {
    return [];
  }

  const fileContent = fs.readFileSync(WAITLIST_FILE, 'utf-8');
  return JSON.parse(fileContent);
}

export async function getWaitlistEntryById(id: string): Promise<WaitlistEntry | null> {
  const entries = await getAllWaitlistEntries();
  return entries.find(entry => entry.id === id) || null;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}