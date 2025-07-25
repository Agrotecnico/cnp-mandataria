import type { TramiteMd } from "@/app/lib/definitions";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const tramitesDirectory = join(process.cwd(), "_tramites");

export function getTramiteSlugs() {
  return fs.readdirSync(tramitesDirectory);
}

export function getTramiteBySlug(slug: string ) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(tramitesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, slug: realSlug, content } as TramiteMd;
}

export function getAllTramites(): TramiteMd[] {
  const slugs = getTramiteSlugs();
  const tramites = slugs
    .map((slug) => getTramiteBySlug(slug))
    // sort posts by date in descending order
    /* .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)); */

  return tramites;
  
}
