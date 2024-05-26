document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const user = {
      name: name,
      email: email,
      password: password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Đăng ký thành công!");
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        alert("Đăng nhập thành công!");
        // Redirect to another page
        window.location.href = "index.html"; // Thay đổi thành trang bạn muốn chuyển hướng đến
      } else {
        alert("Email hoặc mật khẩu không chính xác!");
      }
    } else {
      alert("Không tìm thấy người dùng! Hãy đăng ký trước.");
    }
  });
});
