import React, { useState } from 'react'
import { Plus, Users, Clock, CalendarCheck, Shield } from "lucide-react"

// Hooks
import { useUser } from './hooks/useUser'
import { useShift } from './hooks/useShift'
import { useAttendance } from './hooks/useAttendance'

// UI Components
import PageHeader from "@/components/ui/pages/PageHeader"
import UserTable from './components/UserTable'
import ShiftTable from './components/ShiftTable'
import AttendanceTable from './components/AttendanceTable'

// Modals
import UserModal from './components/UserModal'
import ShiftModal from './components/ShiftModal'
import AttendanceModal from './components/AttendanceModal'

const UserManagementPage = () => {
  // 1. DATA FETCHING FROM INDIVIDUAL HOOKS
  const {
    users,
    isLoading: userLoading,
    createUser,
    updateUser,
    deleteUser,
    restoreUser,
    searchTerm: userSearch,
    setSearchTerm: setUserSearch
  } = useUser();

  const {
    shifts,
    isLoading: shiftLoading,
    createShift,
    updateShift,
    deleteShift,
    restoreShift,
    searchTerm: shiftSearch,
    setSearchTerm: setShiftSearch
  } = useShift();

  const {
    attendances,
    isLoading: attendanceLoading,
    viewMode,
    setViewMode,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    searchTerm: attSearch,
    setSearchTerm: setAttSearch
  } = useAttendance();

  // 2. PAGE STATES
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'shifts' | 'attendance'
  const [modal, setModal] = useState({ isOpen: false, data: null });

  // 3. STATS CALCULATION
  const stats = [
    { label: "Total Staff", value: users.length, icon: Users, color: "text-blue-400" },
    { label: "Active Shifts", value: shifts.filter(s => s.isActive).length, icon: Clock, color: "text-orange-400" },
    { label: "Present Today", value: attendances.filter(a => a.status === 'IN_TIME').length, icon: CalendarCheck, color: "text-emerald-400" }
  ];

  // 4. HANDLERS
  const handleOpenModal = (data = null) => setModal({ isOpen: true, data });
  const handleCloseModal = () => setModal({ isOpen: false, data: null });

  const getActiveSearch = () => {
    if (activeTab === 'users') return { value: userSearch, setter: setUserSearch };
    if (activeTab === 'shifts') return { value: shiftSearch, setter: setShiftSearch };
    return { value: attSearch, setter: setAttSearch };
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 min-h-screen ">
      {/* 1. HEADER */}
      <PageHeader
        title="Staff & Operations"
        description="Manage employees, work shifts, and monitor real-time attendance."
        actionText={activeTab !== 'attendance' ? `Add ${activeTab === 'users' ? 'Staff' : 'Shift'}` : "Log Attendance"}
        onAction={() => handleOpenModal()}
        icon={Plus}
      />

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#141312] border border-white/5 rounded-4xl p-6 flex items-center gap-5 shadow-xl">
            <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-temu-coffee">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. TABS & CONTENT */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
          <div className="flex gap-8">
            {['users', 'shifts', 'attendance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? "text-temu-bronze" : "text-zinc-600 hover:text-zinc-400"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-temu-bronze shadow-[0_0_10px_rgba(212,163,115,0.5)]" />
                )}
              </button>
            ))}
          </div>

          {/* Search Filter */}
          <div className="pb-4">
            <input
              type="text"
              value={getActiveSearch().value}
              onChange={(e) => getActiveSearch().setter(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-temu-bronze/50 w-full md:w-64"
            />
          </div>
        </div>

        {/* DYNAMIC TABLE SECTION */}
        <div className="min-h-100 animate-in fade-in duration-500">
          {activeTab === 'users' && (
            <UserTable
              data={users}
              isLoading={userLoading}
              onEdit={handleOpenModal}
              onDelete={deleteUser}
              onRestore={restoreUser}
            />
          )}

          {activeTab === 'shifts' && (
            <ShiftTable
              data={shifts}
              isLoading={shiftLoading}
              onEdit={handleOpenModal}
              onDelete={deleteShift}
              onRestore={restoreShift}
            />
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* --- START: TOMBOL FILTER BARU --- */}
              <div className="flex items-center justify-between bg-[#141312] p-3 rounded-2xl border border-white/5">
                <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                  <button
                    onClick={() => setViewMode('today')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'today'
                        ? "bg-temu-bronze text-black shadow-lg"
                        : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'all'
                        ? "bg-temu-bronze text-black shadow-lg"
                        : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    All History
                  </button>
                </div>

                <span className="text-[10px] text-temu-coffee font-medium italic pr-4">
                  {viewMode === 'today' ? "• Monitoring real-time" : "• Database history mode"}
                </span>
              </div>
              {/* --- END: TOMBOL FILTER BARU --- */}

              {/* Tabel Attendance Tetap Seperti Biasa */}
              <AttendanceTable
                data={attendances}
                isLoading={attendanceLoading}
                onEdit={handleOpenModal}
                onDelete={deleteAttendance}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. MODALS LOGIC */}
      {activeTab === 'users' && (
        <UserModal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          initialData={modal.data}
          onSubmit={(data) => modal.data ? updateUser(modal.data.id, data) : createUser(data)}
        />
      )}

      {activeTab === 'shifts' && (
        <ShiftModal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          initialData={modal.data}
          onSubmit={(data) => modal.data ? updateShift(modal.data.id, data) : createShift(data)}
        />
      )}

      {activeTab === 'attendance' && (
        <AttendanceModal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          initialData={modal.data}
          users={users}
          shifts={shifts}
          onSubmit={(data) => modal.data ? updateAttendance(modal.data.id, data) : createAttendance(data)}
        />
      )}
    </div>
  );
};

export default UserManagementPage;