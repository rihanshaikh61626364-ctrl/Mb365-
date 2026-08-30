sed -i 's/if (error) return activeLocalBooks;/if (error) { console.error("[Supabase Fetch Error]:", error); throw error; }/' src/services/books.ts
sed -i 's/} catch {/} catch (err) { console.error("[Supabase Catch Error]:", err);/' src/services/books.ts
