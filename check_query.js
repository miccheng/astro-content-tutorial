import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;

async function test() {
  // const { data, error } = await supabase
  //   .from("video_organizations")
  //   .select(`*, episode:episodes!episode_id(*)`)
  //   // .eq("organization_id", row["id"])
  //   .limit(10)
  //   .order("created_at", { ascending: false });

  const { data, error } = await supabase
    .from("organizations")
    .select(
      `*,
      orgVideos:video_organizations!organization_id(
        video:episodes!episode_id(*)
      )
      `
    )
    .eq("id", 70)
    .limit(10)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully:", JSON.stringify(data, null, 2));
  }
}
test();
