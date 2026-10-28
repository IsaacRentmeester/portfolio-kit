// Loads config + content files and hands them to the engine. Edit content/ and config/, not this.
import { site } from "./config/site.config.js";
import * as copy from "./content/copy.js";
import { roles, stats, tracks } from "./content/profile.js";
import { stops } from "./content/journey.js";
import { photos, gallery } from "./content/photos.js";
import { ask } from "./content/ask.js";
import { projects } from "./content/projects.js";
import { focus } from "./content/focus.js";
import { toolkit } from "./content/toolkit.js";
import { start } from "./engine/app.js";

start({ site, copy, roles, stats, tracks, stops, photos, gallery, ask, projects, focus, toolkit });
