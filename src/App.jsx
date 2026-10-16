
import { useState } from 'react';
import { initialStudents } from './students';
import './App.css';

const STORAGE_KEY = 'campusflow_students';

const emptyForm = {
  studentId: '',
  fullName: '',
  age: '',
  email: '',
  course: '',
  status: 'Enrolled',
};

function getSavedStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : initialStudents;
    }
  } catch (error) {
    console.error('Could not load student records:', error);
  }

  return initialStudents;
}

function App() {
  const [students, setStudents] = useState(getSavedStudents);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const totalStudents = students.length;
  const enrolledStudents = students.filter(
    (student) => student.status === 'Enrolled'
  ).length;
  const pendingStudents = students.filter(
    (student) => student.status === 'Pending'
  ).length;
  const inactiveStudents = students.filter(
    (student) => student.status === 'Inactive'
  ).length;

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(student.studentId).toLowerCase().includes(searchText) ||
      student.fullName.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.course.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === 'All' || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function saveStudents(updatedStudents) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      setError('');
      return true;
    } catch (saveError) {
      console.error('Could not save student records:', saveError);
      setError('Unable to save changes. Please check your browser storage.');
      return false;
    }
  }

  function openAddModal() {
    setForm(emptyForm);
    setModalMode('add');
    setEditingStudentId(null);
    setError('');
    setShowModal(true);
  }

  function openEditModal(student) {
    setForm({
      studentId: student.studentId,
      fullName: student.fullName,
      age: String(student.age),
      email: student.email,
      course: student.course,
      status: student.status,
    });

    setModalMode('edit');
    setEditingStudentId(student.id);
    setError('');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm(emptyForm);
    setEditingStudentId(null);
    setError('');
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const studentId = form.studentId.trim();
    const fullName = form.fullName.trim();
    const age = Number(form.age);
    const email = form.email.trim();
    const course = form.course.trim();

    if (!studentId || !fullName || !form.age || !email || !course || !form.status) {
      setError('Please complete all required fields.');
      return;
    }

    if (!Number.isInteger(age) || age < 16 || age > 100) {
      setError('Age must be a whole number between 16 and 100.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const duplicateId = students.some(
      (student) =>
        String(student.studentId).toLowerCase() === studentId.toLowerCase() &&
        student.id !== editingStudentId
    );

    if (duplicateId) {
      setError('This Student ID already exists. Please use a different ID.');
      return;
    }

    const studentData = {
      studentId,
      fullName,
      age,
      email,
      course,
      status: form.status,
    };

    let updatedStudents;

    if (modalMode === 'edit') {
      updatedStudents = students.map((student) =>
        student.id === editingStudentId
          ? { ...student, ...studentData }
          : student
      );
    } else {
      const nextId =
        students.length > 0
          ? Math.max(...students.map((student) => Number(student.id) || 0)) + 1
          : 1;

      updatedStudents = [
        ...students,
        {
          id: nextId,
          ...studentData,
        },
      ];
    }

    if (saveStudents(updatedStudents)) {
      closeModal();
    }
  }

  function openDeleteModal(student) {
    setStudentToDelete(student);
    setError('');
    setShowDeleteModal(true);
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
    setStudentToDelete(null);
    setError('');
  }

  function confirmDelete() {
    if (!studentToDelete) {
      return;
    }

    const updatedStudents = students.filter(
      (student) => student.id !== studentToDelete.id
    );

    if (saveStudents(updatedStudents)) {
      closeDeleteModal();
    }
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>
          <div>
            <div className="sidebar-logo">CampusFlow</div>
            <p className="brand-subtitle">Student Management</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">
            <span>▦</span> Dashboard
          </a>

          <a href="#students" className="nav-item">
            <span>♙</span> Students
          </a>

          <a href="#settings" className="nav-item">
            <span>⚙</span> Settings
          </a>
        </nav>

        <div className="sidebar-profile">
          <div className="profile-avatar">TK</div>
          <div>
            <strong>Tlotliso Nkhets'e</strong>
            <span>Administrator</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <span className="online-dot"></span>
          System Online
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">STUDENT ADMINISTRATION</p>
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          <div className="system-status">
            <span className="online-dot"></span>
            System Online
          </div>
        </header>

        <section className="welcome-banner">
          <div className="welcome-content">
            <p className="welcome-label">WELCOME BACK</p>
            <h2>Your campus, all in one place.</h2>
            <p>
              Manage student records and monitor enrollment at a glance.
            </p>
          </div>

          <div className="welcome-decoration" aria-hidden="true">
            <div className="decoration-circle"></div>
            <div className="decoration-card">✦</div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Student statistics">
          <article className="stat-card">
            <div className="stat-icon">♙</div>
            <h3>Total Students</h3>
            <p className="stat-number">{totalStudents}</p>
            <span className="stat-caption">All registered records</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon enrolled-icon">✓</div>
            <h3>Enrolled</h3>
            <p className="stat-number">{enrolledStudents}</p>
            <span className="stat-caption">Active enrollment</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon pending-icon">◷</div>
            <h3>Pending</h3>
            <p className="stat-number">{pendingStudents}</p>
            <span className="stat-caption">Awaiting confirmation</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon inactive-icon">○</div>
            <h3>Inactive</h3>
            <p className="stat-number">{inactiveStudents}</p>
            <span className="stat-caption">Currently inactive</span>
          </article>
        </section>

        <section className="content-card" id="students">
          <div className="card-header">
            <div>
              <p className="eyebrow">CAMPUS DIRECTORY</p>
              <h2>Student Records</h2>
              <p className="section-description">
                Manage student information and enrollment status.
              </p>
            </div>

            <button
              type="button"
              className="add-student-button"
              onClick={openAddModal}
            >
              <span>＋</span> Add Student
            </button>
          </div>

          <div className="table-toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
                aria-label="Search students"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by enrollment status"
              className="status-filter"
            >
              <option value="All">All statuses</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Email Address</th>
                  <th>Course of Study</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.studentId}</td>
                    <td>
                      <div className="student-name-cell">
                        <span className="student-mini-avatar">
                          {student.fullName
                            .split(' ')
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')
                            .toUpperCase()}
                        </span>
                        <span>{student.fullName}</span>
                      </div>
                    </td>
                    <td>{student.age}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>
                      <span
                        className={`status-badge ${student.status.toLowerCase()}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <div className="student-actions">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => openEditModal(student)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => openDeleteModal(student)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="7">
                      <div className="empty-state">
                        <h3>No students found</h3>
                        <p>
                          Try a different search or add a new student record.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Showing {filteredStudents.length} of {totalStudents} students
          </div>
        </section>

        <footer className="dashboard-footer" id="settings">
          <span>CampusFlow Student Management</span>
          <span>Built for smarter campus administration.</span>
        </footer>
      </main>

      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className="student-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">
                  {modalMode === 'add' ? 'NEW RECORD' : 'UPDATE RECORD'}
                </p>
                <h2 id="student-modal-title">
                  {modalMode === 'add' ? 'Add Student' : 'Edit Student'}
                </h2>
                <p>Enter the student's information below.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                aria-label="Close student form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="studentId">Student ID *</label>
                  <input
                    id="studentId"
                    name="studentId"
                    value={form.studentId}
                    onChange={handleInputChange}
                    placeholder="e.g. CF006"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="16"
                    max="100"
                    step="1"
                    value={form.age}
                    onChange={handleInputChange}
                    placeholder="Enter age"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="student@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course">Course of Study *</label>
                  <input
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleInputChange}
                    placeholder="Enter course"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Enrollment Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Enrolled">Enrolled</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="add-student-button">
                  {modalMode === 'add' ? 'Save Student' : 'Save Changes'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {showDeleteModal && studentToDelete && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <section
            className="student-modal delete-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">CONFIRM ACTION</p>
                <h2 id="delete-modal-title">Delete Student?</h2>
                <p>This action will remove the student record.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeDeleteModal}
                aria-label="Cancel deletion"
              >
                ×
              </button>
            </div>

            <div className="delete-confirmation">
              Are you sure you want to delete{' '}
              <strong>{studentToDelete.fullName}</strong> (
              <strong>{studentToDelete.studentId}</strong>)? This action cannot
              be undone.
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-button confirm-delete-button"
                onClick={confirmDelete}
              >
                Yes, Delete Student
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
