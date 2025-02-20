// big-ass-seeder.js

import PocketBase from 'pocketbase';
import { faker } from '@faker-js/faker'; // Make sure to install this: npm install @faker-js/faker

const PB_URL = 'http://127.0.0.1:8090'; // Your PocketBase URL
const pb = new PocketBase(PB_URL);

const NUM_USERS_TO_CREATE = 10; // <---- ADJUST THIS NUMBER TO MAKE IT "BIG ASS" -  1000, 10000, 100000, GO CRAZY (but be mindful of your resources!)
const BATCH_SIZE = 1; // Create users in batches to be kinder to the server and your memory if you go really BIG ASS

async function seedUsers() {
    console.log(`Starting to seed ${NUM_USERS_TO_CREATE} users...`);

    for (let i = 0; i < NUM_USERS_TO_CREATE; i += BATCH_SIZE) {
        const batchPromises = [];
        const endBatch = Math.min(i + BATCH_SIZE, NUM_USERS_TO_CREATE); // Handle the last batch which might be smaller

        console.log(`Creating users from ${i + 1} to ${endBatch}...`);

        for (let j = i; j < endBatch; j++) {
            const email = faker.internet.email();
            const password = faker.internet.password({ length: 10 }); // Generate a somewhat decent password

            const userData = {
                email: email,
                password: password,
                passwordConfirm: password, // Required for create
                emailVisibility: true, // Or whatever your schema requires
                username: faker.internet.userName(), // Example of adding more fields
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                bio: faker.lorem.sentence(),
                profilePicture: null, // You could even upload fake images if you want to get *really* crazy, but let's keep it simple for now
                isVerified: faker.datatype.boolean(0.8), // 80% chance of being verified - just for fun
                lastActive: faker.date.recent(),
                // Add any other fields from your 'users' collection schema here!
            };

            batchPromises.push(
                pb.collection('users').create(userData)
                    .then(() => {
                        // Optional: Log success for each user if you want very verbose output
                        // console.log(`User ${email} created successfully.`);
                    })
                    .catch(error => {
                        console.error(`Error creating user ${email}:`, error.message); // Log errors, but continue with other users
                        // In a real production seeder, you might want more robust error handling (retry, etc.)
                    })
            );
        }

        await Promise.all(batchPromises); // Wait for the current batch to complete before starting the next
        console.log(`Batch ${Math.ceil((i + BATCH_SIZE) / BATCH_SIZE)}/${Math.ceil(NUM_USERS_TO_CREATE / BATCH_SIZE)} completed.`);
    }

    console.log(`Seeding of ${NUM_USERS_TO_CREATE} users complete!`);
}

async function main() {
    console.log("Starting Big Ass Seeder for PocketBase...");

    try {
        await seedUsers();
        console.log("Seeding process finished successfully.");
    } catch (error) {
        console.error("An error occurred during seeding:", error);
    } finally {
        console.log("Seeder finished.");
    }
}

main();
