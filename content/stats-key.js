// VISITOR AND LISTENING STATS — the one line that turns them on. Read by js/stats.js.
//
// '' means OFF: js/stats.js sends nothing and loads nothing. Paste the PostHog
// *Project API key* (starts phc_) between the quotes to turn it on. It is a public,
// write-only key — PostHog's own install snippet puts it in every page's source — so it
// belongs in this public repo. It cannot read the data back.
//
// host is the PostHog region the project was made in: US https://us.i.posthog.com,
// EU https://eu.i.posthog.com. The project's settings page shows which.
//
// 🛑 ONLY A phc_ KEY. phs_ (project secret) and phx_ (personal) can READ the data; js/stats.js
// refuses anything else, and one was pasted by mistake on 2026-09-16.
//
// 🛑 Changing this file is a version bump: it is precached like every other content file.
self.PANIM_STATS = {
  key: 'phc_CJX8SQkHfMDTmjJvJo9ngtP4wBedTYcGqNxuFLPDKzES',
  host: 'https://us.i.posthog.com'
};
