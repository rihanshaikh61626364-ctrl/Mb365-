const url = 'https://fgsiesdyaxpntduqtjht.supabase.co/rest/v1/admin_users?select=*';
const key = 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';

fetch(url, {
  method: 'HEAD',
  headers: {
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Prefer': 'count=exact'
  }
})
.then(res => {
  console.log('Status:', res.status);
  console.log('Count:', res.headers.get('content-range'));
})
.catch(console.error);
