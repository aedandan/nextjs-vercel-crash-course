import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: 'rbzoc39c',
    dataset: "production",
    apiVersion: "2023-01-16",
    useCdn: true
});
