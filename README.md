# TaskFlow — Responsive Frontend Interface

**DecodeLabs Full Stack Internship — Project 1**

🔗 **Live Demo:** [moemenakari.github.io/taskflow-p1](https://moemenakari.github.io/taskflow-p1/)

TaskFlow is a simple task manager with a responsive, mobile-first interface built with pure HTML, CSS and JavaScript (no frameworks).

## Features
- Add tasks with a priority (low / medium / high) and an optional due date
- Mark tasks as done, delete them, or clear all completed tasks
- Filter by All / Active / Completed
- Live progress stats (total, active, done, % completed)
- Tasks are saved in the browser (localStorage)
- Form validation with accessible error messages

## Responsive Design
- **Mobile-first:** single-column layout by default
- **Tablet (768px+):** horizontal navigation, two-column cards
- **Desktop (1024px+):** main content + sticky side panel (CSS Grid)
- Fluid typography with `clamp()`
- CSS Grid for page layout, Flexbox for components

## Accessibility
- Semantic landmarks: `header`, `nav`, `main`, `section`, `aside`, `article`, `footer`
- Skip-to-content link, visible focus styles, ARIA labels
- Colour contrast checked against WCAG AA

## Tech Stack
HTML5 · CSS3 · Vanilla JavaScript

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Moemenakari/taskflow-p1.git
   ```
2. Open `index.html` in your browser — no installation needed.

Or open the folder in VS Code and use the **Live Server** extension.

## Author
**Mouemen Akkarie** — [GitHub](https://github.com/Moemenakari)
