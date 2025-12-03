"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const fetchWaitlistData = async () => {
    try {
      const response = await fetch("/api/waitlist/admin", {
        headers: {
          "Authorization": `Bearer voluchat-admin-secret`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch waitlist data");
      }

      const data = await response.json();
      setEntries(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load waitlist data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "voluchat-admin-secret") {
      setAuthenticated(true);
      fetchWaitlistData();
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setEntries([]);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            VoluChat Waitlist Admin
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Waitlist Submissions</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading waitlist data...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
                {error}
              </div>
              <button
                onClick={fetchWaitlistData}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-600">No waitlist submissions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">WhatsApp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Instagram</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{entry.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{entry.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{entry.whatsappNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {entry.instagramHandle || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(entry.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-slate-100 rounded-lg">
          <h3 className="font-semibold text-slate-700 mb-2">Total Submissions: {entries.length}</h3>
          <p className="text-sm text-slate-600">
            This data is stored in <code className="bg-slate-200 px-2 py-1 rounded">data/waitlist.json</code>
          </p>
        </div>
      </div>
    </div>
  );
}