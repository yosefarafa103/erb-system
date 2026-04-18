import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("بريد إلكتروني غير صالح"),
    role: z.enum(["admin", "manager", "accounting"], {
        error: "يجب اختيار الدور"
    }),
    status: z.enum(["enabled", "disabled"]),
    password: z
        .string()
        .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
        .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
        .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير")
        .regex(/[0-9]/, "يجب أن تحتوي على رقم")
});

export type CreateUserInput = z.infer<typeof createUserSchema>;