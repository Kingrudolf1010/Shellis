/* =====================================================================
   Site configuration - fill in the two values below (Supabase > Project Settings > API)
   - SUPABASE_URL: Project URL, like https://abcdxyz.supabase.co
   - SUPABASE_KEY: the "anon" or "publishable" key. It is safe to put in a website
     because the database only allows READ access (see supabase-setup.sql).
     NEVER put the "service_role" or "secret" key here.
   ===================================================================== */
window.SITE = {
  SUPABASE_URL: "https://bbbfsbkttvihxpocwrds.supabase.co/rest/v1/",
  SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiYmZzYmt0dHZpaHhwb2N3cmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNDcwODMsImV4cCI6MjEwNjcyMzA4M30.YZozQJYHXQ8F8bM7e3gGEPk8lwSJTJxg1f6mTJLVzk0"
};

/* Read rows from a Supabase table through its REST API. Example: dbGet("courses?select=*") */
async function dbGet(path) {
  const u = (SITE.SUPABASE_URL || "").replace(/\/$/, "");
  if (!u || u.includes("YOUR-PROJECT") || !SITE.SUPABASE_KEY || SITE.SUPABASE_KEY.includes("YOUR-")) {
    throw new Error("NOT_CONFIGURED");
  }
  const headers = { apikey: SITE.SUPABASE_KEY };
  if (SITE.SUPABASE_KEY.startsWith("eyJ")) headers.Authorization = "Bearer " + SITE.SUPABASE_KEY; /* legacy JWT keys only */
  const res = await fetch(u + "/rest/v1/" + path, { headers });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

function dbError(e) {
  return e && e.message === "NOT_CONFIGURED"
    ? "The database is not connected yet. Open config.js and add your Supabase URL and key."
    : "Could not load data. Check your internet connection and your Supabase settings.";
}

/* Font Awesome class for an icon name. Use "b:windows" for brand icons, "network-wired" for normal ones. */
function faIcon(name) {
  name = name || "book";
  return name.startsWith("b:") ? "fa-brands fa-" + name.slice(2) : "fa-solid fa-" + name;
}

