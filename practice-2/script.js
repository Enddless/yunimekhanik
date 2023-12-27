function toggleForm() {
    const modal = document.querySelector(".modalfake");
    modal.classList.toggle("modal");
}
function toggleTable() {
    const table = document.querySelector(".tablefake");
    table.classList.add("table");
}
function toggleSearch() {
    const search = document.querySelector(".form-search-fake");
    search.classList.add("form-search");
}

function selectOpenMenu() {
    const select = document.querySelector(".select__item--fake");
    if (select.classList.contains("select__item")) {
        select.classList.remove("select__item");
    } else {
        select.classList.add("select__item");
    }
}
function selectItem(event) {
    const item = event.target.textContent;
    const input = document.querySelector("#direction");
    input.value = item;
    validatedDirection(input); 
    selectOpenMenu();
}
function submitForm(event) {
    event.preventDefault();
    const tableBody = document.querySelector(".table__tbody")
    if (!activatedButton()) { return false }

    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    let data = [];
    let filteredData = [];


    const postData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(posts => {
                data = posts;
                filteredData = data;
                renderTable(filteredData.slice(0, 50));
            })
            .catch(error => console.log("Ошибка -> ", error))
    }
    postData();
    return true


}
function renderTable(filteredData) {
    const tableBody = document.querySelector(".table__tbody")
    filteredData.forEach(item => {
        const tr = document.createElement("tr");
        tableBody.appendChild(tr);

        Object.values(item).map(value => {
            const td = document.createElement("td");
            td.classList = "table__field";
            td.textContent = value;
            tr.appendChild(td);
        })
    })
    setTimeout(function () {
        toggleForm();
    }, 500)
    toggleTable();
    toggleSearch();
    search();
}
function activatedButton() {
    const name = document.querySelectorAll('#name')[0];
    const logofile = document.querySelectorAll('#logofile')[0];
    const phone = document.querySelectorAll('#phone')[0];
    const email = document.querySelectorAll('#email')[0];
    const submit = document.querySelector(".form__button--submit")

    const isNameValid = validatedName(name);
    const isLogoValid = validatedLogo(logofile);
    const isPhoneValid = validatedPhone(phone);
    const isEmailValid = validatedEmail(email);
    const isDirectionValid = validatedDirection(direction)


    if (isNameValid && isLogoValid && isPhoneValid && isEmailValid && isDirectionValid) {
        submit.classList.add("form__button--pink")
        return true
    } else return false
}
function validatedName(name) {
    const existingErrorElement = name.nextElementSibling;

    if (name.value.length !== 0 && name.value !== "") {
        if (existingErrorElement) {
            name.classList.remove("errorborder");
            name.parentNode.removeChild(name.nextElementSibling);
        };
        return true;
    } else {
        name.classList.add("errorborder");
        error(name, existingErrorElement);
        return false;
    }
}
function validatedLogo(logofile) {
    logofile.parentNode.classList.remove("errorborder");
    const input = document.querySelector('#logofile');
    const reg = /^[^?#]+\.(png|jpe?g)([?#].*)?$/i;
    const previewImg = document.querySelector('#previewContainer');
    if (input.files && input.files[0] && reg.test(input.files[0].name)) {
        logofile.parentNode.classList.remove("errorborder");
        const reader = new FileReader();
        reader.onload = function (e) {
            if (previewImg) {
                previewImg.setAttribute('src', e.target.result);
                previewImg.setAttribute('alt', 'Preview');
            }
        };
        reader.readAsDataURL(input.files[0]);
        return true;
    }
    else {
        logofile.parentNode.classList.add("errorborder");
        return false;
    }
}
function deleteLogo() {
    // Получаем элемент с изображением предпросмотра и input type='file'
    var previewImg = document.querySelector('#previewContainer');
    var fileInput = document.querySelector('#logofile');

    // Удаляем src изображения, чтобы убрать предпросмотр
    if (previewImg) {
        previewImg.removeAttribute('src');
        previewImg.removeAttribute('alt'); // Удаление альтернативного текста
    }

    // Сбрасываем значение input для очистки выбранного файла
    if (fileInput) {
        fileInput.value = "";
    }
}
function validatedPhone(phone) {
    const reg = /^\+(7|8)\ \d{3}\ \d{3}\-\d{2}\-\d{2}$/;
    const existingErrorElement = phone.nextElementSibling;

    if (reg.test(phone.value)) {
        if (existingErrorElement) {
            phone.classList.remove("errorborder");
            phone.parentNode.removeChild(phone.nextElementSibling);
        };
        return true;
    } else {
        phone.classList.add("errorborder");
        error(phone, existingErrorElement);
        return false;
    }
}
function validatedEmail(email) {
    const reg = /^\w+\@[a-z]+\.(com|ru)$/;
    const existingErrorElement = email.nextElementSibling;

    if (reg.test(email.value)) {
        if (existingErrorElement) {
            email.classList.remove("errorborder");
            email.parentNode.removeChild(email.nextElementSibling);
        };
        return true;
    } else {
        email.classList.add("errorborder");
        error(email, existingErrorElement);
        return false;
    }
}
function validatedDirection(direction) {
    const existingErrorElement = direction.nextElementSibling;

    if (direction.value.length !== 0 && direction.value !== "") {
        if (existingErrorElement) {
            direction.classList.remove("errorborder");
            direction.parentNode.removeChild(direction.nextElementSibling);
        };
        return true;
    } else {
        direction.classList.add("errorborder");
        error(direction, existingErrorElement);
        return false;
    }
}
function error(element, sibling) {
    if (!sibling) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "errormessage";
        errorMessage.textContent = "Введите корректные данные";
        element.parentNode.appendChild(errorMessage);
    } else return;
}

function sortTable(event) {
    const th = event.target;
    const n = Array.from(th.parentNode.children).indexOf(th);
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {

        switching = false;
        rows = Array.from(document.querySelectorAll("tr")).slice(1);

        for (i = 0; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (n === 0 || n === 1) {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                        shouldSwitch = true;
                        break;
                    }
                }

            } else if (dir == "desc") {
                if (n === 0 || n === 1) {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }

                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function search() {
    const searchInput = document.querySelector(".form-search__input");
    const trs = Array.from(document.querySelectorAll("tr")).slice(1);

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value;
        if (searchValue.length >= 3) {

            trs.forEach((tr, index) => {
                const cells = tr.cells;
                let found = false;
                Array.from(cells).forEach(cell => {
                    if (cell.innerHTML.toLowerCase().includes(searchValue.toLowerCase())) {
                        found = true;
                    }
                })
                if (found) {
                    tr.style.display = "";
                } else {
                    tr.style.display = "none";
                }
            })
        } else {
            trs.forEach(tr => {
                tr.style.display = "";
            });
        }
    })
}
