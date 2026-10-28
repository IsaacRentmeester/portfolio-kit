// Contract for the career service. Returns { ok: true, data } or { ok: false, error }.
const NAME = "[career]";
export const ok = (data) => ({ ok: true, data });
export const fail = (message) => {
  console.warn(`${NAME} ${message}`);
  return { ok: false, error: `${NAME} ${message}` };
};

const YM = /^\d{4}-(0[1-9]|1[0-2])$/;

// A role needs: id, title, org, track, start "YYYY-MM", end "YYYY-MM" | null.
export function validateRoles(roles, trackKeys) {
  if (!Array.isArray(roles)) return fail("content/profile.js must export a roles array");
  for (const r of roles) {
    for (const k of ["id", "title", "org", "track", "start"]) {
      if (typeof r[k] !== "string" || !r[k]) return fail(`role missing "${k}": ${r.id ?? "?"}`);
    }
    if (!YM.test(r.start)) return fail(`role "${r.id}" start must be YYYY-MM`);
    if (r.end !== null && !YM.test(r.end)) return fail(`role "${r.id}" end must be YYYY-MM or null`);
    if (!trackKeys.includes(r.track)) return fail(`role "${r.id}" has unknown track "${r.track}"`);
  }
  return ok(roles);
}
