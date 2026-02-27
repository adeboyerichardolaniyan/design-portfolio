import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    description: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    duration: z.string(),
    collaborators: z.array(z.string()).optional(),
    coverImage: z.string(),
    color: z.string().optional(),
    layout: z.enum(["default", "wide", "minimal"]).default("default"),
    order: z.number(),
    draft: z.boolean().default(false),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .optional(),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string().optional(),
    italic: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, thoughts };
