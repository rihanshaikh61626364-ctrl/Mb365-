cat << 'INNER' > src/services/books.ts.tmp
$(head -n 61 src/services/books.ts)
export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  if (!supabase) {
    localSettings = { ...localSettings, ...settings };
    return localSettings;
  }

  try {
    const current = await getSiteSettings();
    const { data, error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', current.id)
      .select()
      .single();

    if (error) throw error;
    return data as SiteSettings;
  } catch (err: any) {
    console.error('[BooksService] Error updating site settings:', err);
    throw new Error(err.message || 'Error updating settings. Did you add the new columns in Supabase?');
  }
}

$(tail -n +86 src/services/books.ts)
INNER
mv src/services/books.ts.tmp src/services/books.ts
