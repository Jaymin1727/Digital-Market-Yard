import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://olxuxegprcstzlzbskfs.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seHV4ZWdwcmNzdHpsemJza2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMzMyOTYsImV4cCI6MjA4NjgwOTI5Nn0.RyzFHTxeNRcMFQJMCL4VSysYRzj0lxkvk-alyagtotk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
