sed -i 's/Settings, LogOut/Settings, Share2, LogOut/g' src/components/admin/AdminPanel.tsx
sed -i 's/import AdminSettings from '\''\.\/AdminSettings'\'';/import AdminSettings from '\''\.\/AdminSettings'\'';\nimport AdminSocial from '\''\.\/AdminSocial'\'';/g' src/components/admin/AdminPanel.tsx

sed -i '/<Settings className="w-4 h-4" \/> Settings/i \
          <button \n            onClick={() => navigate('\''/admin/social'\'')}\n            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${location.pathname.startsWith('\''/admin/social'\'') ? '\''bg-blue-50 text-blue-700'\'' : '\''text-slate-600 hover:bg-slate-50'\''}`}\n          >\n            <Share2 className="w-4 h-4" /> Social Media\n          </button>' src/components/admin/AdminPanel.tsx

sed -i '/<Route path="\/settings" element={<AdminSettings \/>} \/>/i \
            <Route path="/social" element={<AdminSocial />} />' src/components/admin/AdminPanel.tsx
