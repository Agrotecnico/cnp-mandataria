import type { TramiteMd } from "@/app/lib/definitions";
import fs from "fs";
// import { join } from "path";
import matter from "gray-matter";
import { readdir, readFile } from "fs/promises";

import { join } from "path";


const tramitesDirectory = join(process.cwd(), "_tramites");

export function getTramiteSlugs() {
  return fs.readdirSync(tramitesDirectory);
}

export function getTramiteBySlugx(slug: string ) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(tramitesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, slug: realSlug, content } as TramiteMd;
}

export function getAllTramites(): TramiteMd[] {
  const slugs = getTramiteSlugs();
  const tramites = slugs
    .map((slug) => getTramiteBySlugx(slug))
    // sort posts by date in descending order
    /* .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)); */

  return tramites;
  
}








export async function getTramiteBySlug(slug: string) {
  const postsDir = join(process.cwd(), "_tramites");
  const filePath = join(postsDir, `${slug}.md`);

  try {
    const rawContent = await readFile(filePath, "utf-8");
    const { data, content } = matter(rawContent);
    const realSlug = slug.replace(/\.md$/, "");

    return { ...data, slug: realSlug, content } as TramiteMd;
  } catch (error) {
    return null; // si no existe el archivo
  }
}