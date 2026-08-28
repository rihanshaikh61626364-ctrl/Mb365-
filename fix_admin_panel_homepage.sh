sed -i "/<FolderTree/a \          </button>\n          <button \n            onClick={() => navigate('/admin/homepage-sections')}\n            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors \${location.pathname.startsWith('/admin/homepage-sections') ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}\`}\n          >\n            <Share2 className=\"w-4 h-4\" /> Homepage Sections" src/components/admin/AdminPanel.tsx

sed -i "/<Route path=\"\/categories\"/a \            <Route path=\"\/homepage-sections\" element={<AdminHomepageSections \/>} \/>" src/components/admin/AdminPanel.tsx

sed -i "/import AdminSettings/a import AdminHomepageSections from './AdminHomepageSections';" src/components/admin/AdminPanel.tsx
