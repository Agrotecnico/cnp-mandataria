import type { Post } from "@/app/lib/definitions";
// import fs from "fs";
import { readdir, readFile } from "fs/promises";

import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs() {
  return await readdir(postsDirectory);
}

export async function getPostBySlug1(slug: string ) {
  // const realSlug = slug.replace(/\.md$/, "");
  // const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = await readFile(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  // return { ...data, slug: realSlug, content } as Post;
  return {
    slug: slug.replace(/\.md$/, ""), // nombre del archivo sin extensión
    title: data.title || "Sin título",
    excerpt: data.excerpt || "Sin extracto",
    date: data.date || null,
    image: data.image || null,
    avatar: data.avatar || null,
    autor: data.autor || "Anónimo",
    // tags: data.tags || [],
    content,
  };
}

export async function getAllPosts()/* : Post[] */ {
  const slugs = await getPostSlugs();

  const posts = slugs.map( async (slug) => await getPostBySlug(slug))
    // sort posts by date in descending order
    /* .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)); */
  return posts;
}



////////////////////////////////////

const postsDirectoryx = join(process.cwd(), "_posts");

export async function getPostSlugsx() {
  return await readdir(postsDirectoryx);
}

export async function getPostBySlugx(slug: string ) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectoryx, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, "utf8");

  console.log("postsDirectory:", postsDirectoryx);


  const { data, content } = matter(fileContents);
  // return { ...data, slug: realSlug, content } as Post;
  return {
    slug: slug.replace(/\.md$/, ""), // nombre del archivo sin extensión
    title: data.title || "Sin título",
    excerpt: data.excerpt || "Sin título",
    date: data.date || null,
    image: data.image || null,
    avatar: data.avatar || null,
    autor: data.autor || "Anónimo",
    // tags: data.tags || [],
    content,
  };
}


//////////////////////////////////////

export async function getPosts() {
  // Leer todos los archivos de la carpeta
  const files = await readdir(postsDirectory);

  // Procesar cada archivo
  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = join(postsDirectory, file);
      const rawContent = await readFile(filePath, "utf-8");

      // Parsear frontmatter con gray-matter
      const { data, content } = matter(rawContent);

      return {
        slug: file.replace(/\.md$/, ""), // nombre del archivo sin extensión
        title: data.title as string,
        excerpt: data.excerpt  as string,
        date: data.date as string,
        image: data.image  as string,
        avatar: data.avatar  as string,
        autor: data.autor  as string,
        // tags: data.tags || [],
        content,
      };
    })
  );
  return posts;
}

export async function getPostBySlug(slug: string) {
  const postsDir = join(process.cwd(), "_posts");
  const filePath = join(postsDir, `${slug}.md`);

  try {
    const rawContent = await readFile(filePath, "utf-8");
    const { data, content } = matter(rawContent);
      return {
        slug, // nombre del archivo sin extensión
        title: data.title as string,
        excerpt: data.excerpt  as string,
        date: data.date as string,
        image: data.image  as string,
        avatar: data.avatar  as string,
        autor: data.autor  as string,
        // tags: data.tags || [],
        content,
      };
  } catch (error) {
    return null; // si no existe el archivo
  }
}





