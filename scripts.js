let employees = JSON.parse(localStorage.getItem("employees")) || [];
let currentPage = 1;
const rowsPerPage = 5;

function toggleMenu() {
  const menu = document.querySelector(".nav-menu ul");
  menu.classList.toggle("show");
}

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  // Show the clicked page
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.remove("hidden");
  }
}

function registerEmployee(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const about = document.getElementById("about").value;
  const joiningDate = document.getElementById("joining_date").value;

  employees.push({ name, position, about, joiningDate });
  localStorage.setItem("employees", JSON.stringify(employees));

  document.getElementById("registrationForm").reset();
  showPage("list");
  renderTable();
}

function renderTable() {
  const tableBody = document.getElementById("employeeTable");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedEmployees = employees.slice(start, end);

  paginatedEmployees.forEach((employee, index) => {
    const row = `<tr>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joiningDate}</td>
            <td><button class="delete_button" onclick="deleteEmployee(${
              start + index
            })">Delete</button></td>
        </tr>`;
    tableBody.innerHTML += row;
  });

  renderPagination();
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderTable();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<button onclick="changePage(${i})">${i}</button>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderTable();
}

function searchEmployees() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(query)
  );
  const tableBody = document.getElementById("employeeTable");
  tableBody.innerHTML = "";

  filteredEmployees.forEach((employee, index) => {
    const row = `<tr>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joiningDate}</td>
            <td><button class="delete_button" onclick="deleteEmployee(${index})">Delete</button></td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

// Initial render of the table
renderTable();
