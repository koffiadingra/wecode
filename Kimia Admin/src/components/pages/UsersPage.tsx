import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { NaturalButton } from "../NaturalButton";
import { NaturalInput, NaturalSelect } from "../NaturalInput";
import { NaturalTag } from "../NaturalTag";
import { NaturalCard } from "../NaturalCard";
import { NaturalModal, ConfirmModal } from "../NaturalModal";
import authService from "../../appwrite/auth";

interface User {
  id: string;
  name: string;
  email: string;
  langage: string;
  goal: string | string[];
  total_session: number;
  total_minute: number;
  last_meditation: Date | null;
  role?: boolean;
}

export function UsersPage() {
  // const mockUsers: User[] = [
  //   {
  //     id: 1,
  //     name: "Sophie Martin",
  //     email: "sophie.martin@email.com",
  //     password: "********",
  //     language: "French",
  //     goals: "Stress Relief",
  //     totalSessions: 45,
  //     totalMinutes: 680,
  //     lastMeditation: "2024-01-15",
  //     role: "Premium",
  //   },
  //   {
  //     id: 2,
  //     name: "Lucas Bernard",
  //     email: "lucas.bernard@email.com",
  //     password: "********",
  //     language: "French",
  //     goals: "Better Sleep",
  //     totalSessions: 32,
  //     totalMinutes: 520,
  //     lastMeditation: "2024-01-14",
  //     role: "Free",
  //   },
  //   {
  //     id: 3,
  //     name: "Emma Dubois",
  //     email: "emma.dubois@email.com",
  //     password: "********",
  //     language: "English",
  //     goals: "Mindfulness",
  //     totalSessions: 78,
  //     totalMinutes: 1240,
  //     lastMeditation: "2024-01-16",
  //     role: "Premium",
  //   },
  //   {
  //     id: 4,
  //     name: "Thomas Petit",
  //     email: "thomas.petit@email.com",
  //     password: "********",
  //     language: "French",
  //     goals: "Focus",
  //     totalSessions: 25,
  //     totalMinutes: 380,
  //     lastMeditation: "2024-01-13",
  //     role: "Free",
  //   },
  //   {
  //     id: 5,
  //     name: "Julie Moreau",
  //     email: "julie.moreau@email.com",
  //     password: "********",
  //     language: "English",
  //     goals: "Anxiety Relief",
  //     totalSessions: 56,
  //     totalMinutes: 890,
  //     lastMeditation: "2024-01-15",
  //     role: "Premium",
  //   },
  // ];
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | boolean>("all");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    async function allUsers() {
      const test = await authService.getAllUsers();
      console.log(test);

      setUsers(test);
    }
    allUsers();
  }, []);

  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesLanguage =
      filterLanguage === "all" || user.langage === filterLanguage;
    return matchesSearch && matchesRole && matchesLanguage;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name || "",
      email: formData.email || "",
      //password: formData.password || "",
      langage: formData.langage || "French",
      goal: formData.goal ?? [],
      total_session: 0,
      total_minute: 0,
      last_meditation: new Date(),
      role: formData.role === true,
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    setFormData({});
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...selectedUser, ...formData } : u
        )
      );
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setFormData({});
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mb-2">
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage your meditation app users
          </p>
        </div>
        <NaturalButton
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add User
        </NaturalButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {users.length}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[var(--vert-feuille)] bg-opacity-20 flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </NaturalCard>

        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Premium Users</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {users.filter((u) => u.role === true).length}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[var(--terre-brique)] bg-opacity-20 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </NaturalCard>

        <NaturalCard
          className="animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Sessions</p>
              <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mt-1">
                {Math.round(
                  users.reduce((acc, u) => acc + u.total_session, 0) /
                    users.length
                )}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </NaturalCard>
      </div>

      {/* Filters */}
      <NaturalCard>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <p className="p-1">Rechercher</p>
            <NaturalInput
              type="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={20} />}
            />
          </div>
          <NaturalSelect
            value={filterRole === "all" ? "all" : filterRole ? "true" : "false"}
            onChange={(e) => {
              const val = e.target.value;
              setFilterRole(val === "all" ? "all" : val === "true"); // reconverti en boolean
            }}
            label="Role"
          >
            <option value="all">All Roles</option>
            <option value="true ">true</option>
            <option value="false">false</option>
          </NaturalSelect>
          <NaturalSelect
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            label="Language"
          >
            <option value="all">All Languages</option>
            <option value="French">French</option>
            <option value="English">English</option>
          </NaturalSelect>
        </div>
      </NaturalCard>

      {/* Table */}
      <NaturalCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Name
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Email
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Language
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Goals
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Sessions
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Minutes
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Last
                </th>
                <th className="text-left py-4 px-4 text-sm text-muted-foreground">
                  Role
                </th>
                <th className="text-right py-4 px-4 text-sm text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--terre-brique)] to-[var(--vert-feuille)] flex items-center justify-center text-white">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.langage}
                  </td>
                  <td className="py-4 px-4">
                    <NaturalTag variant="secondary" size="sm">
                      {user.goal}
                    </NaturalTag>
                  </td>
                  <td className="py-4 px-4 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                    {user.total_session}
                  </td>
                  <td className="py-4 px-4 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                    {user.total_minute}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.last_meditation
                      ? new Date(user.last_meditation).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-4 px-4">
                    <NaturalTag
                      variant={user.role === true ? "primary" : "secondary"}
                      size="sm"
                    >
                      {user.role ? "Yes" : "No"}
                    </NaturalTag>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 rounded-lg text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="p-2 rounded-lg text-destructive hover:bg-destructive hover:bg-opacity-10 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <NaturalButton
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </NaturalButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-[var(--terre-brique)] text-white"
                    : "text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)]"
                }`}
              >
                {page}
              </button>
            ))}
            <NaturalButton
              variant="ghost"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </NaturalButton>
          </div>
        </div>
      </NaturalCard>

      {/* Add User Modal */}
      <NaturalModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setFormData({});
        }}
        title="Add New User"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NaturalInput
              label="Name"
              placeholder="Enter user name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <NaturalInput
              type="email"
              label="Email"
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {/* <NaturalInput
              type="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            /> */}
            <NaturalSelect
              label="Language"
              value={formData.langage || "French"}
              onChange={(e) =>
                setFormData({ ...formData, langage: e.target.value })
              }
            >
              <option value="French">French</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </NaturalSelect>
            <NaturalInput
              label="Goals"
              placeholder="Enter user goals"
              value={
                Array.isArray(formData.goal)
                  ? formData.goal.join(", ")
                  : formData.goal || ""
              }
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
            />
            <NaturalSelect
              label="Role"
              value={formData.role ? "true" : "false"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </NaturalSelect>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <NaturalButton
              variant="ghost"
              onClick={() => {
                setIsAddModalOpen(false);
                setFormData({});
              }}
            >
              Cancel
            </NaturalButton>
            <NaturalButton variant="primary" onClick={handleAddUser}>
              Add User
            </NaturalButton>
          </div>
        </div>
      </NaturalModal>

      {/* Edit User Modal */}
      <NaturalModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
          setFormData({});
        }}
        title="Edit User"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NaturalInput
              label="Name"
              placeholder="Enter user name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <NaturalInput
              type="email"
              label="Email"
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <NaturalSelect
              label="Language"
              value={formData.langage || "French"}
              onChange={(e) =>
                setFormData({ ...formData, langage: e.target.value })
              }
            >
              <option value="French">French</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </NaturalSelect>
            <NaturalInput
              label="Goals"
              placeholder="Enter user goals"
              value={formData.goal || ""}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
            />
            <NaturalSelect
              label="Role"
              value={formData.role || "false"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </NaturalSelect>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <NaturalButton
              variant="ghost"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
                setFormData({});
              }}
            >
              Cancel
            </NaturalButton>
            <NaturalButton variant="primary" onClick={handleEditUser}>
              Save Changes
            </NaturalButton>
          </div>
        </div>
      </NaturalModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
