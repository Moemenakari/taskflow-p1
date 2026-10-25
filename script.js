// ===== State =====
const STORAGE_KEY = 'taskflow-tasks';
let tasks = loadTasks();
let currentFilter = 'all';

// ===== Elements =====
const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const priorityInput = document.getElementById('task-priority');
const dateInput = document.getElementById('task-date');
const titleError = document.getElementById('title-error');
const list = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.chip');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

// ===== Storage =====
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* storage unavailable - app still works in memory */
  }
}

// ===== Validation =====
function validateTitle(value) {
  const title = value.trim();
  if (!title) return 'Please enter a task.';
  if (title.length < 3) return 'Task must be at least 3 characters.';
  return '';
}

// ===== Render =====
function render() {
  const visible = tasks.filter(t =>
    currentFilter === 'all' ? true : currentFilter === 'done' ? t.done : !t.done
  );

  list.innerHTML = '';
  visible.forEach(task => list.appendChild(createTaskItem(task)));
  emptyState.hidden = visible.length > 0;

  updateStats();
}

function createTaskItem(task) {
  const li = document.createElement('li');
  li.className = `task priority-${task.priority}${task.done ? ' done' : ''}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', `Mark "${task.title}" as done`);
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const body = document.createElement('div');
  body.className = 'task-body';
  const title = document.createElement('p');
  title.className = 'task-title';
  title.textContent = task.title; // textContent prevents HTML injection
  const meta = document.createElement('p');
  meta.className = 'task-meta';
  meta.textContent = `${capitalize(task.priority)} priority${task.due ? ' · Due ' + formatDate(task.due) : ''}`;
  body.append(title, meta);

  const del = document.createElement('button');
  del.className = 'delete-btn';
  del.textContent = '✕';
  del.setAttribute('aria-label', `Delete "${task.title}"`);
  del.addEventListener('click', () => deleteTask(task.id));

  li.append(checkbox, body, del);
  return li;
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-active').textContent = total - done;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('progress-bar').style.width = percent + '%';
  document.querySelector('.progress').setAttribute('aria-valuenow', percent);
  document.getElementById('progress-text').textContent = `${percent}% completed`;
}

// ===== Actions =====
function addTask(title, priority, due) {
  tasks.unshift({ id: Date.now().toString(), title, priority, due, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// ===== Helpers =====
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
const formatDate = d => new Date(d + 'T00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

// ===== Events =====
form.addEventListener('submit', e => {
  e.preventDefault();
  const error = validateTitle(titleInput.value);
  titleError.textContent = error;
  titleInput.setAttribute('aria-invalid', error ? 'true' : 'false');
  if (error) {
    titleInput.focus();
    return;
  }
  addTask(titleInput.value.trim(), priorityInput.value, dateInput.value);
  form.reset();
  priorityInput.value = 'medium';
  titleInput.focus();
});

titleInput.addEventListener('input', () => {
  if (titleError.textContent) {
    titleError.textContent = '';
    titleInput.setAttribute('aria-invalid', 'false');
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn);
    });
    render();
  });
});

document.getElementById('clear-done').addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

render();
