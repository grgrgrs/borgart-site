// Persist theme between visits
const userPref = localStorage.getItem("theme");

// Default = light
if (!userPref) {
  localStorage.setItem("theme", "light");
}

document.documentElement.classList.toggle("dark", userPref === "dark");

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// MAKE IT GLOBAL FOR INLINE onclick()
window.toggleTheme = toggleTheme;
