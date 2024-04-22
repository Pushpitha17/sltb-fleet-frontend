require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

try {
  console.log(process.env.PROJECT_ID)
  execSync(`npx supabase gen types typescript --project-id ${process.env.PROJECT_ID} --schema public > types/supabase.ts`);
  console.log('Supabase types generated successfully!');
} catch (error) {
  console.error('Error generating Supabase types:', error);
}