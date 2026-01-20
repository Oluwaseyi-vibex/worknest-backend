import { string, z } from "zod";

export const createSchema = z.object({
  body: z.object({
    name: z.string().max(225),
  }),
});

export const addMemberSchema = z.object({
  body: z.object({
    projectId: z.string().max(255),
    userEmail: z.email("Invalid email format").max(255),
  }),
});

// export const listProjectMembersSchema = z.object({
//   params: z.object({
//     id: z.string(":id  is required").max(255),
//   }),
// });
