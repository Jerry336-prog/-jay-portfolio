import React, { useState, useEffect } from "react";
import { db } from "../../utilis/Firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { FaPlus, FaFolderOpen, FaRegEdit, FaTrashAlt, FaCloudUploadAlt, FaSignOutAlt, FaStar, FaGlobe, FaCogs } from "react-icons/fa";
import Button from "../Components/Button";
import Toast from "../Components/Toast";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [stack, setStack] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [featured, setFeatured] = useState(false);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Loading/saving feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");

  // Light/Dark Theme toggle function
  const [theme, setTheme] = useState(() => {
    let myChoice = localStorage.getItem("theme");
    return myChoice ? myChoice : "light";
  });
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Fetch projects from Firestore 
  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // logout function
  const handleLogoutConfirmed = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setToastMsg("Error logging out");
      setToastType("error");
      setShowToast(true);
    }
  };

  // Delete project with confirmation modal
  const confirmDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteDoc(doc(db, "projects", selectedProject.id));
      setProjects(projects.filter(p => p.id !== selectedProject.id));
      setToastMsg("Project deleted successfully.");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMsg("Error deleting project.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Edit project with confirmation modal
  const confirmEdit = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleEditConfirmed = () => {
    handleEdit(selectedProject);
    setShowEditModal(false);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setImageUrl(project.imageUrl);
    setLink(project.link);
    setStatus(project.status);
    setStack(project.stack.join(","));
    setFeatured(project.featured || false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        uploadedImageUrl = await uploadImage();
      }

      const formattedStack = stack.split(",").map(item => item.trim()).filter(Boolean);

      if (editingProject) {
        const projectRef = doc(db, "projects", editingProject.id);

        await updateDoc(projectRef, {
          title,
          description,
          imageUrl: uploadedImageUrl,
          link,
          status,
          stack: formattedStack,
          featured,
        });
        setToastMsg("Project updated successfully!");
        setToastType("success");
      } else {
        await addDoc(collection(db, "projects"), {
          title,
          description,
          imageUrl: uploadedImageUrl,
          link,
          status,
          stack: formattedStack,
          featured,
          createdAt: new Date(),
        });
        setToastMsg("Project added successfully!");
        setToastType("success");
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setImageUrl("");
      setLink("");
      setStatus("");
      setStack("");
      setFeatured(false);
      setImageFile(null);
      setEditingProject(null);
      
      // Refresh list
      fetchProjects();
      setShowToast(true);
    } catch (error) {
      console.error(error);
      setToastMsg("Error saving project");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Dashboard Stats Calculations
  const stats = [
    { label: "Total Projects", value: projects.length, icon: <FaFolderOpen className="text-sky-500" /> },
    { label: "Live Deployment", value: projects.filter(p => p.status === "Live").length, icon: <FaGlobe className="text-emerald-500" /> },
    { label: "Featured Projects", value: projects.filter(p => p.featured).length, icon: <FaStar className="text-amber-500" /> },
    { label: "Stack Directory", value: Array.from(new Set(projects.flatMap(p => p.stack || []))).length, icon: <FaCogs className="text-purple-500" /> }
  ];

  return (
    <section className="relative min-h-screen pt-12 pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="glass-navbar sticky top-0 z-40 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              SaaS Admin Panel
            </h1>
            <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5">
              Jerry.dev Control Center
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* LOGOUT */}
            <Button
              variant="danger"
              className="px-4 py-2 text-xs flex items-center gap-1.5"
              onClick={() => setShowLogoutModal(true)}
            >
              <FaSignOutAlt size={12} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ================= METRICS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl glass-panel border border-black/10 dark:border-white/10 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{stat.label}</p>
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MAIN SPLIT LAYOUT ================= */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          
          {/* LEFT: PROJECT MANAGEMENT FORM */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
            <div className="p-6 rounded-2xl glass-panel border border-black/10 dark:border-white/10 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingProject ? "Modify Project" : "Add New Project"}
                </h2>
                {editingProject && (
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setTitle("");
                      setDescription("");
                      setImageUrl("");
                      setLink("");
                      setStatus("");
                      setStack("");
                      setFeatured(false);
                      setImageFile(null);
                    }}
                    className="text-xs text-rose-500 hover:underline"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Project Title</label>
                  <input
                    required
                    placeholder="e.g. My SaaS Product"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, features, and stack integration details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Cloudinary File Upload */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Project Thumbnail Image</label>
                  <div className="relative border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:border-emerald-500/40 transition-colors cursor-pointer bg-black/5 dark:bg-white/5">
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <FaCloudUploadAlt size={28} className="text-gray-500 dark:text-gray-400 mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center font-medium">
                      {imageFile ? `Selected: ${imageFile.name}` : "Click or drag thumbnail here to upload to Cloudinary"}
                    </p>
                  </div>
                  {imageUrl && !imageFile && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 truncate">Current: {imageUrl}</p>
                  )}
                </div>

                {/* Project Link */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Live URL</label>
                  <input
                    required
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Deployment Status</label>
                  <select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 bg-transparent"
                  >
                    <option value="" disabled className="text-gray-400 bg-slate-900">Select Status</option>
                    <option value="Live" className="text-gray-800 dark:text-white bg-white dark:bg-slate-900">Live</option>
                    <option value="In Progress" className="text-gray-800 dark:text-white bg-white dark:bg-slate-900">In Progress</option>
                    <option value="Completed" className="text-gray-800 dark:text-white bg-white dark:bg-slate-900">Completed</option>
                  </select>
                </div>

                {/* Featured project toggle */}
                <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Featured Placement</label>
                  <button
                    type="button"
                    onClick={() => setFeatured(!featured)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      featured
                        ? "bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-sm"
                        : "glass-panel border border-black/10 dark:border-white/10 text-gray-400"
                    }`}
                  >
                    {featured ? "Featured ⭐" : "Standard"}
                  </button>
                </div>

                {/* Tech stack split input */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Tech Stack (comma-separated)</label>
                  <input
                    required
                    placeholder="React, Firebase, CSS"
                    value={stack}
                    onChange={(e) => setStack(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none text-sm text-gray-800 dark:text-gray-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  loading={isSaving}
                  className="w-full py-3 mt-2 shadow-lg shadow-emerald-500/20"
                >
                  <FaPlus size={12} className="mr-1.5" />
                  <span>{editingProject ? "Update Registry" : "Register Project"}</span>
                </Button>
              </form>
            </div>
          </div>

          {/* RIGHT: REGISTERED PROJECTS LIST */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-black/10 dark:border-white/10 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Active Projects Registry ({projects.length})
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-xl overflow-hidden glass-panel border border-black/10 dark:border-white/10 flex flex-col hover-glow"
                  >
                    {/* Thumbnail Image */}
                    <div className="h-40 w-full overflow-hidden relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      {project.featured && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-black font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="p-4 flex flex-col flex-grow bg-transparent space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">
                          {project.title}
                        </h3>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          project.status === "Live"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : project.status === "In Progress"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(project.stack) &&
                          project.stack.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                              {tech}
                            </span>
                          ))}
                        {Array.isArray(project.stack) && project.stack.length > 3 && (
                          <span className="text-[9px] px-1 text-gray-500 dark:text-gray-400">+{project.stack.length - 3}</span>
                        )}
                      </div>

                      {/* Controls Footer */}
                      <div className="pt-3 border-t border-black/5 dark:border-white/5 flex justify-between items-center mt-auto">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:-translate-y-0.5 transition-all"
                        >
                          ↗
                        </a>

                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmEdit(project)}
                            className="p-2 rounded bg-black/5 dark:bg-white/5 hover:bg-blue-500/10 text-blue-500 hover:border hover:border-blue-500/20 text-xs flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <FaRegEdit size={11} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => confirmDelete(project)}
                            className="p-2 rounded bg-black/5 dark:bg-white/5 hover:bg-red-500/10 text-red-500 hover:border hover:border-red-500/20 text-xs flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <FaTrashAlt size={11} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ================= MODALS ================= */}
      <AnimatePresence>
        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900/90 glass-panel p-6 rounded-2xl w-[90%] max-w-sm text-center border border-black/10 dark:border-white/10 shadow-2xl space-y-6"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                <FaTrashAlt size={16} />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Delete Project?</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light">
                  This action is permanent and will remove <span className="font-semibold text-gray-800 dark:text-gray-200">"{selectedProject?.title}"</span> from your portfolio database.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="secondary" className="px-5 py-2.5 text-xs" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" className="px-5 py-2.5 text-xs" onClick={handleDeleteConfirmed}>
                  Delete Registry
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* EDIT MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900/90 glass-panel p-6 rounded-2xl w-[90%] max-w-sm text-center border border-black/10 dark:border-white/10 shadow-2xl space-y-6"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <FaRegEdit size={16} />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Project?</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light">
                  This will load the configurations of <span className="font-semibold text-gray-800 dark:text-gray-200">"{selectedProject?.title}"</span> back into the registry form on the left.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="secondary" className="px-5 py-2.5 text-xs" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" className="px-5 py-2.5 text-xs bg-blue-600 hover:bg-blue-500 border-blue-500/30" onClick={handleEditConfirmed}>
                  Load Config
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* LOGOUT MODAL */}
        {showLogoutModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900/90 glass-panel p-6 rounded-2xl w-[90%] max-w-sm text-center border border-black/10 dark:border-white/10 shadow-2xl space-y-6"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                <FaSignOutAlt size={16} />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Logout Admin Console?</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-light">
                  You will terminate your admin panel credentials and be redirected back to the login gateway.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="secondary" className="px-5 py-2.5 text-xs" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" className="px-5 py-2.5 text-xs" onClick={handleLogoutConfirmed}>
                  Logout Console
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC FEEDBACK TOASTS */}
      <Toast
        message={toastMsg}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

export default Dashboard;