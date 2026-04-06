import React, { useState, useEffect } from "react";
import { db } from "../../utilis/Firebase";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

  //Light/Dark Theme toggle function
   const [theme, setTheme] = useState(() => {
      let myChoice = localStorage.getItem("theme");
      return myChoice ? myChoice : "light";
    });
     useEffect(() => {
        document.body.className = theme;
      }, [theme]);
  

  // Fetch projects from Firestore 
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
    };
    fetchProjects();
  }, []);

  //logout function
  const handleLogoutConfirmed = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    // redirect to login
    navigate("/login");

  } catch (error) {
    console.error(error);
    alert("Error logging out");
  }
};

// Delete project with confirmation modal
  const confirmDelete = (project) => {
  setSelectedProject(project);
  setShowDeleteModal(true);
};

const handleDeleteConfirmed = async () => {
  await deleteDoc(doc(db, "projects", selectedProject.id));
  setProjects(projects.filter(p => p.id !== selectedProject.id));
  setShowDeleteModal(false);
};

// Edit project with confirmation modal
const confirmEdit = (project) => {
  setSelectedProject(project);
  setShowEditModal(true);
};

const handleEditConfirmed = () => {
  handleEdit(selectedProject); // your existing function
  setShowEditModal(false);
};

  const uploadImage = async () => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset",  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

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

    try {
    let uploadedImageUrl = imageUrl;

     if (imageFile) {
           uploadedImageUrl = await uploadImage();
      }

      if (editingProject) {
        const projectRef = doc(db, "projects", editingProject.id);

        await updateDoc(projectRef, {
          title,
          description,
          imageUrl: uploadedImageUrl,
          link,
          status,
          stack: stack.split(","),
          featured,
        });

      } else {
        await addDoc(collection(db, "projects"), {
          title,
          description,
          imageUrl: uploadedImageUrl,
          link,
          status,
          stack: stack.split(","),
          featured,
          createdAt: new Date(),
        });
      }

      setTitle("");
      setDescription("");
      setImageUrl("");
      setLink("");
      setStatus("");
      setStack("");
      setFeatured(false);
      setImageFile(null);
      setEditingProject(null);

    } catch (error) {
      console.error(error);
      alert("Error saving project");
    }
  };

  return (
    <section className="min-h-screen bg-transparent text-[var(--text-primary)] mb-5">

     {/* 🔥 HEADER */}
         <div className="
            sticky top-0 z-50 mb-16
            backdrop-blur-md
          bg-white/70 dark:bg-black/40
            border-b border-black/10 dark:border-white/10"
            >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-2">

    {/* LEFT */}
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
        Admin Dashboard
      </h1>
      <p className="text-xs md:text-sm opacity-70">
        Manage your projects and portfolio
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">
    
     <button
           onClick={() => setShowLogoutModal(true)}
           className="
                 px-4 py-2 rounded-full text-sm
               bg-black/10 dark:bg-white/10
               hover:bg-red-500/20
                 transition
          "
      >
            Logout
     </button>
    </div>
  </div>
</div>

      {/* 🔥 MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid px-5 md:px-10 lg:px-20 gap-10 lg:grid-cols-3">

        {/* FORM */}
        <div className="lg:col-span-1 lg:sticky lg:top-10 h-fit">
          <div className="p-6 rounded-xl
            bg-[var(--bg-alt)]
            border border-black/10 dark:border-white/10
            backdrop-blur-md shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 outline-none"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 outline-none"
              />

              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
              />

              <input
                placeholder="Project Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
              />

              <input
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
              />

              <div className="flex items-center gap-3">
                <label className="text-sm">Featured Project</label>

              <button
                 type="button"
                 onClick={() => setFeatured(!featured)}
                 className={`px-4 py-2 rounded-full transition
              ${
                featured
                   ? "bg-green-600/20 text-green-600"
                   : "bg-black/10 dark:bg-white/10"
             }`}
           >
             {featured ? "Yes ⭐" : "No"}
            </button>
           </div>

              <input
                placeholder="Stack (React,Firebase,...)"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
              />

              <button className="
                w-full py-3 rounded-lg font-medium
                bg-black/10 dark:bg-white/10
                hover:bg-black/20 dark:hover:bg-green-600/20
                transition
              ">
                {editingProject ? "Update Project" : "Add Project"}
              </button>

            </form>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="lg:col-span-2">
          <div className="grid gap-8 sm:grid-cols-2">

            {projects.map((project, index) => (
              <div
                key={index}
                className="
                  group rounded-xl overflow-hidden flex flex-col
                  bg-white/80 dark:bg-white/5
                  border border-black/10 dark:border-white/10
                  backdrop-blur-md
                  transition hover:-translate-y-2 hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 bg-[var(--bg-alt)] flex flex-col flex-grow">

                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">
                      {project.title}
                    </h2>

                    <span className={`text-xs px-3 py-1 rounded-full
                      ${
                        project.status === "Live"
                          ? "bg-green-600/20 text-green-700 dark:text-green-400"
                          : project.status === "In Progress"
                          ? "bg-yellow-500/20 text-yellow-900 dark:text-yellow-400"
                          : project.status === "Completed"
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          : "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                     {project.featured && (
                        <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-600">
                           ⭐ Featured
                        </span>
                     )}
                  </div>

                  <p className="text-sm opacity-80 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(project.stack) &&
                      project.stack.map((tech, i) => (
                        <span key={i}
                          className="text-xs px-3 py-1 rounded-full bg-black/10 dark:bg-white/10">
                          {tech}
                        </span>
                      ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center mt-auto">
                    <a href={project.link}
                      className="px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20">
                      ↗
                    </a>

                    <div className="flex gap-2">
                      <button
                       onClick={() => confirmEdit(project)}
                        className="px-3 py-1 rounded bg-black/10 dark:bg-white/10 hover:bg-blue-500/20">
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(project)}
                        className="px-3 py-1 rounded bg-black/10 dark:bg-white/10 hover:bg-red-500/20">
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* ================= DELETE MODAL ================= */}
{showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="bg-[var(--bg-alt)] p-6 rounded-xl w-[90%] max-w-sm text-center border border-black/10 dark:border-white/10">
      
      <h2 className="text-lg font-semibold mb-3">
        Delete Project?
      </h2>

      <p className="text-sm opacity-70 mb-6">
        This action cannot be undone.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 rounded bg-black/10 dark:bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteConfirmed}
          className="px-4 py-2 rounded bg-red-500/20 text-red-600"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}


  {/* ================= EDIT MODAL ================= */}
{showEditModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="bg-[var(--bg-alt)] p-6 rounded-xl w-[90%] max-w-sm text-center border border-black/10 dark:border-white/10">
      
      <h2 className="text-lg font-semibold mb-3">
        Edit Project?
      </h2>

      <p className="text-sm opacity-70 mb-6">
        You are about to edit this project.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowEditModal(false)}
          className="px-4 py-2 rounded bg-black/10 dark:bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={handleEditConfirmed}
          className="px-4 py-2 rounded bg-green-500/20 text-green-600"
        >
          Continue
        </button>
      </div>

    </div>
  </div>
)}

   {/* ================= LOGOUT MODAL ================= */}
{showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="bg-[var(--bg-alt)] p-6 rounded-xl w-[90%] max-w-sm text-center border border-black/10 dark:border-white/10">
      
      <h2 className="text-lg font-semibold mb-3">
        Logout?
      </h2>

      <p className="text-sm opacity-70 mb-6">
        You will be redirected to the login page.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 rounded bg-black/10 dark:bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={handleLogoutConfirmed}
          className="px-4 py-2 rounded bg-red-500/20 text-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  </div>
)}
    </section>
  );
}

export default Dashboard;