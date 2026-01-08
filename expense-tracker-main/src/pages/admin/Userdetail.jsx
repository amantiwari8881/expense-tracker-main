import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaSort, FaSortAmountDown, FaSortAmountUp, FaUser } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const PAGE_SIZE = 8;

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center text-xl">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const Badge = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
    green: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    yellow: "bg-amber-100 text-amber-900 ring-amber-200",
    red: "bg-rose-100 text-rose-800 ring-rose-200",
    blue: "bg-blue-100 text-blue-800 ring-blue-200",
    violet: "bg-violet-100 text-violet-800 ring-violet-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 ${tones[tone] || tones.gray}`}>
      {children}
    </span>
  );
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="py-4 px-4">
      <div className="h-10 w-10 rounded-full bg-gray-200" />
    </td>
    <td className="py-4 px-4"><div className="h-3 w-40 bg-gray-200 rounded" /></td>
    <td className="py-4 px-4"><div className="h-3 w-48 bg-gray-200 rounded" /></td>
    <td className="py-4 px-4"><div className="h-6 w-20 bg-gray-200 rounded-full" /></td>
    <td className="py-4 px-4"><div className="h-3 w-24 bg-gray-200 rounded" /></td>
    <td className="py-4 px-4 text-right"><div className="h-8 w-28 bg-gray-200 rounded" /></td>
  </tr>
);

const DetailModal = ({ open, onClose, user }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl overflow-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-100 grid place-items-center">
                <FaUser className="text-gray-500" />
              </div>
            )}
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Role</p>
              <p className="font-medium">{user?.role || "user"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Status</p>
              <p className="font-medium">{user?.status || "active"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Joined</p>
              <p className="font-medium">{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Last Login</p>
              <p className="font-medium">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—"}</p>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-4">
            <p className="font-semibold mb-3">Expense summary</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Count</p>
                <p className="font-medium">{user?.expenses?.length || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Total (₹)</p>
                <p className="font-medium">
                  {user?.expenses?.reduce((a, e) => a + (e.amount || 0), 0)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Avg (₹)</p>
                <p className="font-medium">
                  {user?.expenses?.length
                    ? Math.round(
                        user.expenses.reduce((a, e) => a + (e.amount || 0), 0) /
                          user.expenses.length
                      )
                    : 0}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Recent expenses</p>
              <div className="space-y-2">
                {(user?.expenses || []).slice(0, 8).map((ex, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <div className="truncate">
                      <p className="text-sm font-medium">{ex.title || ex.category || "Expense"}</p>
                      <p className="text-xs text-gray-500 truncate">{ex.note || ex.date}</p>
                    </div>
                    <Badge tone="blue">₹{ex.amount || 0}</Badge>
                  </div>
                ))}
                {(!user?.expenses || user.expenses.length === 0) && (
                  <p className="text-xs text-gray-500">No expenses found.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-4">
            <p className="font-semibold mb-3">Meta</p>
            <pre className="text-xs bg-gray-50 rounded-xl p-3 overflow-auto">
{JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  // fetch from public/mock/users.json
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        // const res = await fetch("/mock/adminData.json");
        //  // <-- keep file in /public/mock/users.json
        const res = await fetch("http://localhost:8081/api/users");

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRaw(Array.isArray(data?.users) ? data.users : []);
      } catch (e) {
        setError("Unable to load users. Make sure /public/mock/users.json exists.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let list = [...raw];

    // search
    const keyword = q.trim().toLowerCase();
    if (keyword) {
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(keyword) ||
          u.email?.toLowerCase().includes(keyword) ||
          u.role?.toLowerCase().includes(keyword)
      );
    }

    // filter
    if (role !== "all") list = list.filter((u) => (u.role || "user") === role);
    if (status !== "all") list = list.filter((u) => (u.status || "active") === status);

    // sort
    list.sort((a, b) => {
      let av, bv;
      switch (sortBy) {
        case "name":
          av = a.name || "";
          bv = b.name || "";
          break;
        case "joined":
          av = new Date(a.createdAt || 0).getTime();
          bv = new Date(b.createdAt || 0).getTime();
          break;
        case "expense":
          av = (a.expenses || []).reduce((s, e) => s + (e.amount || 0), 0);
          bv = (b.expenses || []).reduce((s, e) => s + (e.amount || 0), 0);
          break;
        default:
          av = a.name || "";
          bv = b.name || "";
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [raw, q, role, status, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const view = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1); // reset page when filters change
  }, [q, role, status, sortBy, sortDir]);

  const totalUsers = raw.length;
  const activeUsers = raw.filter((u) => (u.status || "active") === "active").length;
  const totalExpense = raw.reduce((s, u) => s + (u.expenses || []).reduce((a, e) => a + (e.amount || 0), 0), 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-gray-600">All registered users with role, status and expense summary.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Users" value={totalUsers} icon={<FaUser />} />
        <StatCard label="Active Users" value={activeUsers} icon={<MdOutlineInfo />} />
        <StatCard label="Total Expenses (₹)" value={totalExpense} icon={<MdOutlineInfo />} />
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, role..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200"
            >
              <option value="all">All roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200"
            >
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200"
              >
                <option value="name">Sort: Name</option>
                <option value="joined">Sort: Joined</option>
                <option value="expense">Sort: Expense</option>
              </select>
              <button
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                className="h-10 w-10 grid place-items-center rounded-xl border border-gray-200"
                title="Toggle sort direction"
              >
                {sortDir === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="py-3 px-3 text-left w-16">User Id</th>
                <th className="py-3 px-3 text-left">Name</th>
                <th className="py-3 px-3 text-left">Email</th>
                <th className="py-3 px-3 text-left">Password</th>
                <th className="py-3 px-3 text-left">Contact No.</th>
                
                <th className="py-3 px-3 text-right">Total (₹)</th>
             
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}

              {!loading && error && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-rose-600">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && view.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                view.map((u, i) => {
                  const total = (u.expenses || []).reduce((s, e) => s + (e.amount || 0), 0);
                  return (
                    <tr key={u._id || i} className="border-t hover:bg-gray-50/60">
                      <td className="py-3 px-4">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-100 grid place-items-center">
                            <FaUser className="text-gray-500" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.username || "-"}</div>
                      </td>
                      <td className="py-3 px-4">{u.email}</td>
                      <td className="py-3 px-4">
                        <Badge tone={u.role === "admin" ? "violet" : "gray"}>
                          {u.role || "user"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">₹{total}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelected(u)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
                        >
                          <MdOutlineInfo /> Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <DetailModal open={!!selected} onClose={() => setSelected(null)} user={selected} />
    </div>
  );
};

export default AdminUsers;
