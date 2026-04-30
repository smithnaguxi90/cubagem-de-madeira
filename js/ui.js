import { ICONS } from "./config.js";

// UI Elements
const modalEl = document.getElementById("authModal");
const authTitle = document.getElementById("authTitle");
const authActionBtn = document.getElementById("authActionBtn");
const errorMsg = document.getElementById("authErrorMsg");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");

export function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  let bgClass =
    type === "error"
      ? "bg-red-500"
      : type === "info"
        ? "bg-stone-600"
        : "bg-emerald-600";
  let iconSvg =
    type === "error"
      ? '<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
      : type === "info"
        ? '<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        : '<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  toast.className = `${bgClass} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] toast-enter`;
  toast.innerHTML = `${iconSvg}<span class="font-medium text-sm">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function openAuthModal(isRegistering) {
  modalEl.classList.remove("hidden");
  updateAuthUI(isRegistering);
}

export function closeAuthModal() {
  modalEl.classList.add("hidden");
}

export function updateAuthUI(isRegistering) {
  errorMsg.classList.add("hidden");
  const switchTextSpan = document.getElementById("authSwitchText");
  const toggleBtn = document.getElementById("toggleAuthBtn");

  if (isRegistering) {
    authTitle.innerText = "Criar Conta";
    authActionBtn.innerHTML = `<span>Registrar</span> ${ICONS.register}`;
    switchTextSpan.innerText = "Já tem conta? ";
    toggleBtn.innerText = "Entrar";
    if (forgotPasswordBtn) forgotPasswordBtn.classList.add("hidden");
  } else {
    authTitle.innerText = "Bem-vindo de volta";
    authActionBtn.innerHTML = `<span>Entrar</span> ${ICONS.login}`;
    switchTextSpan.innerText = "Ainda não tem conta? ";
    toggleBtn.innerText = "Criar conta";
    if (forgotPasswordBtn) forgotPasswordBtn.classList.remove("hidden");
  }
}
