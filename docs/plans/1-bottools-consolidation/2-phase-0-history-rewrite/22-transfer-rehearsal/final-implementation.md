# Transfer rehearsal: as-built record

## Deviations

- **The `urls pre` and `refs pre` reads were taken although `ids pre` had stopped** (§7.3, "On a stop";
  §7.4, S5, the reads before any rename). `ids pre` stopped on a 504 from GitHub's web page for the source
  repository (the run's log shows 504 from 05:30 to 05:42 UTC, then 200 at 06:49 UTC, on 2026-11-09), and the three reads had been issued together, before its result was known. Both reads
  query GitHub and record their results only, and neither changes anything on GitHub. Their recorded results
  are valid as of their time: every followed URL resolved to its new home, and every reference's name resolved
  to the same item.
