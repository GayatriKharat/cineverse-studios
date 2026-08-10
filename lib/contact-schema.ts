import { z } from "zod";
export const contactSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().trim().email().max(160),phone:z.string().trim().max(32).optional().or(z.literal("")),company:z.string().trim().max(100).optional().or(z.literal("")),budget:z.string().trim().min(1).max(60),service:z.string().trim().min(1).max(80),timeline:z.string().trim().min(1).max(80),details:z.string().trim().min(15).max(3000)});
export type ContactPayload=z.infer<typeof contactSchema>;
