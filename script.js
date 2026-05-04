function checkPassword() {
  let password = document.getElementById("password").value;

  let strength = 0;

  let hasLength = password.length >= 8;
  let hasUpper = /[A-Z]/.test(password);
  let hasLower = /[a-z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSpecial = /[\W]/.test(password);

  if (hasLength) strength++;
  if (hasUpper) strength++;
  if (hasLower) strength++;
  if (hasNumber) strength++;
  if (hasSpecial) strength++;

  // Checklist colors
  document.getElementById("length").style.color = hasLength ? "lightgreen" : "red";
  document.getElementById("upper").style.color = hasUpper ? "lightgreen" : "red";
  document.getElementById("lower").style.color = hasLower ? "lightgreen" : "red";
  document.getElementById("number").style.color = hasNumber ? "lightgreen" : "red";
  document.getElementById("special").style.color = hasSpecial ? "lightgreen" : "red";

  let result = document.getElementById("result");
  let fill = document.getElementById("strength-fill");

  // Entropy calculation
  let charset = 0;
  if (hasLower) charset += 26;
  if (hasUpper) charset += 26;
  if (hasNumber) charset += 10;
  if (hasSpecial) charset += 32;

  let entropy = password.length > 0 
    ? (password.length * Math.log2(charset || 1)).toFixed(2) 
    : 0;

  if (strength <= 2) {
    result.innerText = "Weak Password ❌ | Entropy: " + entropy;
    result.style.color = "red";
    fill.style.width = "33%";
    fill.style.background = "red";
  } else if (strength <= 4) {
    result.innerText = "Medium Password ⚠️ | Entropy: " + entropy;
    result.style.color = "orange";
    fill.style.width = "66%";
    fill.style.background = "orange";
  } else {
    result.innerText = "Strong Password ✅ | Entropy: " + entropy;
    result.style.color = "lightgreen";
    fill.style.width = "100%";
    fill.style.background = "green";
  }
}

// Show/Hide password
function togglePassword() {
  let input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}

// Generate strong password
function generatePassword() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let pass = "";

  for (let i = 0; i < 12; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("password").value = pass;
  checkPassword(); // auto evaluate
}

// Copy password
function copyPassword() {
  let password = document.getElementById("password").value;

  if (!password) {
    alert("No password to copy!");
    return;
  }

  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard ✅");
}