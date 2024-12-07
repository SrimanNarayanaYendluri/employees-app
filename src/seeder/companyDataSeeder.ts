import { eq } from "drizzle-orm";
import { db } from "../db/dbConnection";
import { companies, NewCompany } from "../schemas/companySchema";
import { faker } from "@faker-js/faker";

export const seedCompanies = async () => {
  try {
    console.log("Company seeder script has started...");

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const fakeCompanies: NewCompany[] = Array.from({ length: 20 }).map(() => {
      const createdAt = faker.date.between({
        from: sixMonthsAgo,
        to: new Date(),
      });
      const updatedAt = faker.date.between({
        from: createdAt,
        to: new Date(),
      });

      return {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        address: faker.address.streetAddress(true),
        code: faker.string.alphanumeric(10).toUpperCase(),
        created_at: createdAt,
        updated_at: updatedAt,
        deleted_at: null,
      };
    });

    console.log("Generated fake companies:", fakeCompanies);

    for (const company of fakeCompanies) {
      console.log(`Checking company with code: ${company.code}`);
      const existingCompany = await db
        .select()
        .from(companies)
        .where(eq(companies.code, company.code))
        .limit(1);

      if (existingCompany.length === 0) {
        console.log(`Inserting company: ${company.name}`);
        try {
          await db.insert(companies).values(company);
        } catch (error) {
          console.error("Error inserting company:", company, error);
        }
      } else {
        console.log(`Company already exists: ${company.code}`);
      }
    }

    console.log("***Companies seeded successfully with UTC timestamps.***");
  } catch (error) {
    console.error("Error seeding companies:", error);
  }
};
