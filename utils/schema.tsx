import { pgTable,serial,varchar,text } from "drizzle-orm/pg-core";
import paymentLink from "razorpay/dist/types/paymentLink";

export const AIOutput = pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formData: varchar('formData').notNull(),
    aiResponse: text('aiResponse'),
    templateSlug : varchar('templateSlug').notNull(),
    createdBy : varchar('createdBy').notNull(),
    createdAt : varchar('createdAt')
})

export const UserSubscription = pgTable('userSubscription',{
    id:serial('id').primaryKey(),
    email:varchar('email'),
    userName:varchar('userName'),
    paymentId:varchar('paymentId'),
    joinDate:varchar('joinData')

})