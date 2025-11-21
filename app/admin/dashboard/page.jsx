"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [form, setForm] = useState({
    title: '',
    category: 'video',
    description: '',
    media: '',
    tools: '',
    tags: ''
  });

  // 1. Fetch existing projects
  const fetchProjects = async () => {
      try {
          const res = await axios.get('/api/projects/add');
          setProjects(res.data);
      } catch(e) {
          router.push('/admin/login');
      }
  }

  useEffect(() => { fetchProjects(); }, []);

  // 2. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await axios.post('/api/projects/add', form);
        setForm({ title: '', category: 'video', description: '', media: '', tools: '', tags: '' });
        fetchProjects();
    } catch (error) {
        alert("Error adding project");
    }
    setLoading(false);
  };

  // 3. Handle Delete (NEW FUNCTION)
  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this project?")) return;

    try {
        await axios.delete(`/api/projects/delete?id=${id}`);
        fetchProjects(); // Refresh list
    } catch (error) {
        alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
            <h1 className="text-4xl font-bold tracking-tighter">ADMIN DASHBOARD</h1>
            <button onClick={() => router.push('/')} className="text-sm underline hover:text-blue-600">Back to Home →</button>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10 border border-gray-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Add New Project
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <input className="w-full border p-3 rounded bg-gray-50" placeholder="Project Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required/>
                    <select className="w-full border p-3 rounded bg-gray-50" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                        <option value="video">Video Editor Portfolio</option>
                        <option value="design">Graphic Design Portfolio</option>
                    </select>
                    <input className="w-full border p-3 rounded bg-gray-50" placeholder="Image/Video URL" value={form.media} onChange={e=>setForm({...form, media:e.target.value})} required />
                </div>

                <div className="space-y-4">
                    <input className="w-full border p-3 rounded bg-gray-50" placeholder="Tools (e.g. After Effects)" value={form.tools} onChange={e=>setForm({...form, tools:e.target.value})} />
                    <input className="w-full border p-3 rounded bg-gray-50" placeholder="Tags (e.g. Commercial)" value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} />
                    <textarea className="w-full border p-3 rounded bg-gray-50 h-32" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
                </div>

                <button disabled={loading} className="col-span-full bg-black text-white p-4 rounded-lg hover:bg-gray-800 font-bold transition-all">
                    {loading ? 'SAVING...' : '+ ADD PROJECT'}
                </button>
            </form>
        </div>

        {/* LIST SECTION */}
        <h2 className="text-2xl font-bold mb-6">Your Projects ({projects.length})</h2>
        <div className="grid grid-cols-1 gap-4">
             {projects.map(p => (
                 <div key={p._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                     <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                            <img src={p.media[0]} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div>
                             <h3 className="font-bold text-lg">{p.title}</h3>
                             <span className={`text-xs px-2 py-1 rounded ${p.category === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                {p.category.toUpperCase()}
                             </span>
                         </div>
                     </div>

                     {/* DELETE BUTTON */}
                     <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-500 text-sm hover:bg-red-50 px-3 py-1 rounded border border-red-200 transition-colors"
                     >
                        Delete Project
                     </button>
                 </div>
             ))}
             {projects.length === 0 && <p className="text-gray-500">No projects yet.</p>}
        </div>

      </div>
    </div>
  );
}