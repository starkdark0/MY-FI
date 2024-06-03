document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout-button');
    const logoutButtonUser = document.getElementById('logout-button-user');
    const addUserForm = document.getElementById('add-user-form');
    const userList = document.getElementById('user-list');
    const manageUserList = document.getElementById('manage-user-list');
    const manageUsersButton = document.getElementById('manage-users-button');
    const backToHomeButton = document.getElementById('back-to-home-button');
    const selectPackageButton = document.getElementById('select-package-button');
    const confirmPackageButton = document.getElementById('confirm-package-button');
    const backToHomeButtonFromPackage = document.getElementById('back-to-home-button-from-package');
    const showRegisterButton = document.getElementById('show-register');
    const showLoginButton = document.getElementById('show-login');
    const changeLanguageButton = document.getElementById('change-language');
    const enterAppButton = document.getElementById('enter-app');

    let currentUser = null;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let familyPackage = parseInt(localStorage.getItem('familyPackage')) || 0;

    const pages = {
        welcome: document.getElementById('welcome-page'),
        login: document.getElementById('login-page'),
        register: document.getElementById('register-page'),
        home: document.getElementById('home-page'),
        manageUsers: document.getElementById('manage-users-page'),
        selectPackage: document.getElementById('select-package-page'),
        userHome: document.getElementById('user-home-page')
    };

    function showPage(page) {
        Object.values(pages).forEach(p => p.classList.remove('active'));
        page.classList.add('active');
    }

    function updateUserList() {
        userList.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.mobile} - ${user.limit} GB used: ${user.usage} GB`;
            userList.appendChild(listItem);
        });
    }

    function updateManageUserList() {
        manageUserList.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.mobile} - ${user.limit} GB used: ${user.usage} GB`;
            manageUserList.appendChild(listItem);
        });
    }

    function showHomePage() {
        document.getElementById('welcome-message').textContent = `Welcome ${currentUser.mobile}`;
        updateUserList();
        showPage(pages.home);
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const mobile = document.getElementById('login-mobile').value;
        const password = document.getElementById('login-password').value;
        currentUser = users.find(user => user.mobile === mobile && user.password === password);
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showHomePage();
        } else {
            alert('Invalid login');
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const mobile = document.getElementById('register-mobile').value;
        const password = document.getElementById('register-password').value;
        const user = { mobile, password, limit: 0, usage: 0, isAdmin: users.length === 0 };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful. Please login.');
        showPage(pages.login);
    });

    logoutButton.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showPage(pages.login);
    });

    logoutButtonUser.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showPage(pages.login);
    });

    addUserForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const mobile = document.getElementById('add-user-mobile').value;
        const password = document.getElementById('add-user-password').value;
        const limit = parseInt(document.getElementById('add-user-limit').value);
        const user = { mobile, password, limit, usage: 0, isAdmin: false };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        updateManageUserList();
        alert('User added successfully.');
    });

    manageUsersButton.addEventListener('click', () => {
        updateManageUserList();
        showPage(pages.manageUsers);
    });

    backToHomeButton.addEventListener('click', () => {
        showHomePage();
    });

    selectPackageButton.addEventListener('click', () => {
        showPage(pages.selectPackage);
    });

    confirmPackageButton.addEventListener('click', () => {
        const packageLimit = parseInt(document.getElementById('select-family-package').value);
        familyPackage = packageLimit;
        localStorage.setItem('familyPackage', familyPackage);
        alert('Family package selected successfully.');
        showHomePage();
    });

    backToHomeButtonFromPackage.addEventListener('click', () => {
        showHomePage();
    });

    showRegisterButton.addEventListener('click', () => {
        showPage(pages.register);
    });

    showLoginButton.addEventListener('click', () => {
        showPage(pages.login);
    });

    changeLanguageButton.addEventListener('click', () => {
        alert('This feature is not implemented yet.');
    });

    enterAppButton.addEventListener('click', () => {
        showPage(pages.login);
    });

    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
        currentUser = savedUser;
        showHomePage();
    } else {
        showPage(pages.welcome);
    }
});
