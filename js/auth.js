import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { showToast, closeAuthModal, updateAuthUI } from "./ui.js";
import { ICONS } from "./config.js";

let auth;

export function initAuth(authInstance) {
  auth = authInstance;
}

export async function handleAuthSubmit(isRegistering) {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const errorMsg = document.getElementById("authErrorMsg");
  const authActionBtn = document.getElementById("authActionBtn");
  errorMsg.classList.add("hidden");

  authActionBtn.innerHTML = `${ICONS.spinner} Processando...`;

  try {
    if (isRegistering) {
      await createUserWithEmailAndPassword(auth, email, password);
      showToast("Conta criada com sucesso!", "success");
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Login efetuado!", "success");
    }
    closeAuthModal();
  } catch (error) {
    console.error(error);
    let msg = "Erro ao autenticar.";
    if (error.code === "auth/invalid-credential")
      msg = "Email ou senha incorretos.";
    if (error.code === "auth/wrong-password") msg = "Senha incorreta.";
    if (error.code === "auth/user-not-found") msg = "Usuário não encontrado.";
    if (error.code === "auth/email-already-in-use")
      msg = "Este e-mail já está registrado.";
    if (error.code === "auth/weak-password")
      msg = "A senha deve ter pelo menos 6 caracteres.";
    if (error.code === "auth/invalid-email") msg = "Email inválido.";

    errorMsg.innerText = msg;
    errorMsg.classList.remove("hidden");
  } finally {
    updateAuthUI(isRegistering); // Reset button text
  }
}

export async function handlePasswordReset() {
  const email = document.getElementById("emailInput").value;
  const errorMsg = document.getElementById("authErrorMsg");
  const authActionBtn = document.getElementById("authActionBtn");

  if (!email) {
    errorMsg.innerText = "Por favor, preencha o seu e-mail acima primeiro.";
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");
  authActionBtn.innerHTML = `${ICONS.spinner} Processando...`;

  try {
    await sendPasswordResetEmail(auth, email);
    showToast(
      "E-mail de recuperação enviado! Verifique sua caixa de entrada.",
      "success",
    );
    closeAuthModal();
  } catch (error) {
    console.error(error);
    let msg = "Erro ao enviar e-mail de recuperação.";
    if (error.code === "auth/invalid-email") msg = "Email inválido.";
    errorMsg.innerText = msg;
    errorMsg.classList.remove("hidden");
  } finally {
    updateAuthUI(false); // Repõe o texto do botão de login original
  }
}

export async function handleLogout() {
  if (!auth) return;
  try {
    await signOut(auth);
    showToast("Sessão encerrada.", "info");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    showToast("Erro ao encerrar sessão.", "error");
  }
}
