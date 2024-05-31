import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const TableSchema = z.object({
  id: z.number(),
  prefix: z.string(),
  R_No: z.string(),
  depot: z.string(),
  model: z.string(),
  type: z.string(),
  R_from: z.string(),
  article_url: z.string(),
  img_url: z.string(),
})

export type TableSchemaType = z.infer<typeof TableSchema>