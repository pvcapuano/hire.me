import { supabase } from "../supabase/supabaseClient";

export async function createUrl(originalUrl: string, customAlias?: string) {
  if (customAlias) {
    const { data: existing } = await supabase
      .from("urls")
      .select("*")
      .eq("custom_alias", customAlias)
      .maybeSingle();

    if (existing) {
      throw new Error("CUSTOM_ALIAS_ALREADY_EXISTS");
    }
  }

  const alias = customAlias || generateRandomAlias();

  const { data, error } = await supabase
    .from("urls")
    .insert([{ original_url: originalUrl, custom_alias: alias }])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getUrlByAlias(alias: string) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("custom_alias", alias)
    .maybeSingle();

  if (error) throw error;
  return data;
}

function generateRandomAlias() {
  return Math.random().toString(36).substring(2, 8);
}
