// Estado global de la aplicación
let appState = {
    selectedProvince: '',
    selectedDate: null,
    selectedMovie: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    sidebarCollapsed: false
};

// Películas costarricenses por género
const peliculas = {
    'Drama': [
        {
            id: 'drama-pelicula-1',
            title: 'Pelicula 1',
            image: 'https://via.placeholder.com/150x200/4a90e2/ffffff?text=Drama+1'
        },
        {
            id: 'drama-pelicula-2',
            title: 'Pelicula 2',
            image: 'https://via.placeholder.com/150x200/4a90e2/ffffff?text=Drama+2'
        }
    ],
    'Comedia': [
        {
            id: 'comedia-pelicula-1',
            title: 'Pelicula 1',
            image: 'https://via.placeholder.com/150x200/f39c12/ffffff?text=Comedia+1'
        },
        {
            id: 'comedia-pelicula-2',
            title: 'Pelicula 2',
            image: 'https://via.placeholder.com/150x200/f39c12/ffffff?text=Comedia+2'
        },
        {
            id: 'comedia-pelicula-3',
            title: 'Pelicula 3',
            image: 'https://via.placeholder.com/150x200/f39c12/ffffff?text=Comedia+3'
        }
    ],
    'Ciencia ficción': [
        {
            id: 'ciencia-pelicula-1',
            title: 'Pelicula 1',
            image: 'https://via.placeholder.com/150x200/9b59b6/ffffff?text=Ciencia+1'
        },
        {
            id: 'ciencia-pelicula-2',
            title: 'Pelicula 2',
            image: 'https://via.placeholder.com/150x200/9b59b6/ffffff?text=Ciencia+2'
        },
        {
            id: 'ciencia-pelicula-3',
            title: 'Pelicula 3',
            image: 'https://via.placeholder.com/150x200/9b59b6/ffffff?text=Ciencia+3'
        }
    ]
};

// Nombres de los meses
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Provincias de Costa Rica
const provincias = {
    '': 'Seleccione una provincia',
    'san-jose': 'San José',
    'alajuela': 'Alajuela',
    'cartago': 'Cartago',
    'heredia': 'Heredia',
    'guanacaste': 'Guanacaste',
    'puntarenas': 'Puntarenas',
    'limon': 'Limón'
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkUrlParams();
});

function initializeApp() {
    // Generar el tree view dinámicamente
    generateTreeView();
    
    // Configurar el menú hamburguesa
    setupHamburgerMenu();
    
    // Configurar el tree view
    setupTreeView();
    
    // Configurar los inputs del formulario
    setupFormInputs();
    
    // Configurar el select personalizado
    setupCustomSelect();
    
    // Configurar el date picker
    setupDatePicker();
    
    // Configurar el botón de submit
    setupSubmitButton();
    
    // Configurar el dialog
    setupDialog();
    
    // Inicializar el calendario
    renderCalendar();
    
    // Seleccionar la primera película por defecto
    selectFirstMovie();
    

}

// Generar tree view dinámicamente
function generateTreeView() {
    const treeView = document.querySelector('.tree-view');
    treeView.innerHTML = '';
    
    Object.keys(peliculas).forEach(genre => {
        const genreId = genre.toLowerCase().replace(/\s+/g, '-');
        
        // Crear grupo del género
        const treeGroup = document.createElement('div');
        treeGroup.className = 'tree-group';
        
        // Crear padre del grupo
        const treeParent = document.createElement('div');
        treeParent.className = 'tree-parent';
        treeParent.setAttribute('data-group', genreId);
        
        const treeIcon = document.createElement('span');
        treeIcon.className = 'tree-icon';
        treeIcon.textContent = '▶';
        
        const treeLabel = document.createElement('span');
        treeLabel.className = 'tree-label';
        treeLabel.textContent = genre;
        
        treeParent.appendChild(treeIcon);
        treeParent.appendChild(treeLabel);
        
        // Crear contenedor de hijos
        const treeChildren = document.createElement('div');
        treeChildren.className = 'tree-children';
        treeChildren.id = genreId;
        
        // Crear items de películas
        peliculas[genre].forEach(pelicula => {
            const treeItem = document.createElement('div');
            treeItem.className = 'tree-item';
            treeItem.setAttribute('data-movie', pelicula.id);
            
            const treeConnector = document.createElement('span');
            treeConnector.className = 'tree-connector';
            
            const movieLabel = document.createElement('span');
            movieLabel.className = 'tree-label';
            movieLabel.textContent = pelicula.title;
            
            treeItem.appendChild(treeConnector);
            treeItem.appendChild(movieLabel);
            
            treeChildren.appendChild(treeItem);
        });
        
        treeGroup.appendChild(treeParent);
        treeGroup.appendChild(treeChildren);
        treeView.appendChild(treeGroup);
    });
}

// Configurar menú hamburguesa
function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Nota: El hamburger menu SÍ permite Tab ya que es el único botón real
    // Esto es parte de los problemas de accesibilidad especificados
    
    hamburgerMenu.addEventListener('click', function() {
        console.log('Hamburger menu clicked'); // Debug
        
        // En móvil, usar la clase 'show' para mostrar/ocultar
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('show');
        } else {
            // En desktop, usar la lógica original
            appState.sidebarCollapsed = !appState.sidebarCollapsed;
            
            if (appState.sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
            }
        }
    });
    
    // Cerrar sidebar al hacer clic fuera en móvil
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// Configurar tree view
function setupTreeView() {
    // Usar event delegation para manejar elementos generados dinámicamente
    const treeView = document.querySelector('.tree-view');
    
    // Configurar padres (géneros)
    treeView.addEventListener('click', function(e) {
        if (e.target.closest('.tree-parent')) {
            const parent = e.target.closest('.tree-parent');
            const groupId = parent.dataset.group;
            const children = document.getElementById(groupId);
            const icon = parent.querySelector('.tree-icon');
            
            if (children.classList.contains('expanded')) {
                children.classList.remove('expanded');
                icon.classList.remove('expanded');
            } else {
                children.classList.add('expanded');
                icon.classList.add('expanded');
            }
        }
        
        // Configurar items (películas)
        if (e.target.closest('.tree-item')) {
            const item = e.target.closest('.tree-item');
            const movieId = item.dataset.movie;
            if (movieId) {
                selectMovie(movieId);
            }
        }
    });
}

// Seleccionar película
function selectMovie(movieId) {
    let movie = null;
    
    // Buscar la película en todos los géneros
    Object.keys(peliculas).forEach(genre => {
        const foundMovie = peliculas[genre].find(p => p.id === movieId);
        if (foundMovie) {
            movie = foundMovie;
        }
    });
    
    if (!movie) return;
    
    // Actualizar estado
    appState.selectedMovie = movieId;
    
    // Mostrar la película seleccionada
    const movieDisplay = document.getElementById('movieDisplay');
    const movieTitle = document.getElementById('movieTitle');
    const movieImage = document.getElementById('movieImage');
    
    movieTitle.textContent = movie.title;
    movieImage.src = movie.image;
    movieImage.alt = `Poster de ${movie.title}`;
    
    // Mostrar el área de película
    movieDisplay.style.display = 'block';
    
    // Remover selección anterior
    document.querySelectorAll('.tree-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Marcar como seleccionada
    document.querySelector(`[data-movie="${movieId}"]`).classList.add('selected');
}

// Seleccionar la primera película por defecto
function selectFirstMovie() {
    // Obtener el primer género y la primera película
    const firstGenre = Object.keys(peliculas)[0];
    const firstMovie = peliculas[firstGenre][0];
    
    if (firstMovie) {
        // Expandir el primer género
        const firstGenreElement = document.querySelector(`[data-group="${firstGenre.toLowerCase().replace(/\s+/g, '-')}"]`);
        if (firstGenreElement) {
            const groupId = firstGenreElement.dataset.group;
            const children = document.getElementById(groupId);
            const icon = firstGenreElement.querySelector('.tree-icon');
            
            children.classList.add('expanded');
            icon.classList.add('expanded');
        }
        
        // Seleccionar la primera película
        selectMovie(firstMovie.id);
    }
}

// Configurar inputs del formulario
function setupFormInputs() {
    const passwordInput = document.getElementById('nuevoPassword');
    const nombreInput = document.getElementById('nombre');
    
    // Configurar Enter para continuar y bloquear otras formas de navegación
    // PRIMER CAMPO: Nombre
    nombreInput.addEventListener('keydown', function(e) {
        console.log('Nombre field - Key pressed:', e.key); // Debug
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Validar patrón en navegación (permitir vacío)
            validateFieldOnNavigation('nombre');
            
            console.log('Moving to password field'); // Debug
            passwordInput.focus();
        } else if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            console.log('Blocked navigation key:', e.key); // Debug
        }
    });
    
    // SEGUNDO CAMPO: Password
    passwordInput.addEventListener('keydown', function(e) {
        console.log('Password field - Key pressed:', e.key); // Debug
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Validar patrón en navegación (permitir vacío)
            validateFieldOnNavigation('nuevoPassword');
            
            console.log('Moving to select'); // Debug
            // Enfocar el select personalizado
            document.querySelector('.select-trigger').focus();
        } else if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }
    });
}

// Validar campo en navegación (permite vacíos, solo valida patrones)
function validateFieldOnNavigation(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    // Si está vacío, limpiar cualquier error y permitir navegación
    if (!value) {
        clearFieldError(fieldId);
        if (fieldId === 'nuevoPassword') {
            clearError('errorPassword');
        } else if (fieldId === 'nombre') {
            clearError('errorNombre');
        }
        return true;
    }
    
    // Si tiene contenido, validar patrón
    let isValid = true;
    
    if (fieldId === 'nuevoPassword') {
        if (!validatePassword(value)) {
            showError('errorPassword', 'El nuevo password tiene errores, por favor corregir');
            setFieldError('nuevoPassword');
            isValid = false;
        } else {
            clearError('errorPassword');
            clearFieldError('nuevoPassword');
        }
    } else if (fieldId === 'nombre') {
        // Para nombre, debe tener exactamente 4 letras
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4}$/.test(value)) {
            showError('errorNombre', 'El nombre tiene errores, por favor corregir');
            setFieldError('nombre');
            isValid = false;
        } else {
            clearError('errorNombre');
            clearFieldError('nombre');
        }
    }
    
    return isValid;
}

// Configurar select personalizado
function setupCustomSelect() {
    const selectContainer = document.getElementById('provinciaSelect');
    const selectTrigger = selectContainer.querySelector('.select-trigger');
    const selectOptions = selectContainer.querySelector('.select-options');
    const selectValue = selectContainer.querySelector('.select-value');
    const selectArrow = selectContainer.querySelector('.select-arrow');
    const options = selectContainer.querySelectorAll('.select-option');
    
    // Bloquear navegación con Tab en el select
    selectTrigger.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }
    });
    
    // Abrir/cerrar select
    selectTrigger.addEventListener('click', function() {
        const isOpen = selectOptions.classList.contains('show');
        closeAllSelects();
        
        if (!isOpen) {
            selectOptions.classList.add('show');
            selectArrow.classList.add('expanded');
        }
    });
    
    // Manejar selección de opciones
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.dataset.value;
            const text = this.textContent;
            
            // Actualizar estado
            appState.selectedProvince = value;
            
            // Actualizar UI
            selectValue.textContent = text;
            
            // Remover selección anterior
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Cerrar select
            selectOptions.classList.remove('show');
            selectArrow.classList.remove('expanded');
            
            // Limpiar error si existe
            clearError('errorProvincia');
        });
    });
    
    // Cerrar select al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!selectContainer.contains(e.target)) {
            selectOptions.classList.remove('show');
            selectArrow.classList.remove('expanded');
        }
    });
}

function closeAllSelects() {
    document.querySelectorAll('.select-options').forEach(select => {
        select.classList.remove('show');
    });
    document.querySelectorAll('.select-arrow').forEach(arrow => {
        arrow.classList.remove('expanded');
    });
}

// Configurar date picker
function setupDatePicker() {
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    
    // Bloquear navegación con Tab en controles del calendario
    prevMonth.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }
    });
    
    nextMonth.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }
    });
    
    prevMonth.addEventListener('click', function() {
        appState.currentMonth--;
        if (appState.currentMonth < 0) {
            appState.currentMonth = 11;
            appState.currentYear--;
        }
        renderCalendar();
    });
    
    nextMonth.addEventListener('click', function() {
        appState.currentMonth++;
        if (appState.currentMonth > 11) {
            appState.currentMonth = 0;
            appState.currentYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const dateGrid = document.getElementById('dateGrid');
    
    monthYear.textContent = `${monthNames[appState.currentMonth]} ${appState.currentYear}`;
    
    // Limpiar días anteriores (mantener solo los headers)
    const headers = dateGrid.querySelectorAll('.date-day-header');
    dateGrid.innerHTML = '';
    
    // Restaurar headers
    headers.forEach(header => {
        dateGrid.appendChild(header);
    });
    
    // Obtener información del mes
    const firstDay = new Date(appState.currentYear, appState.currentMonth, 1);
    const lastDay = new Date(appState.currentYear, appState.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generar 42 días (6 semanas)
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'date-day';
        dayElement.textContent = date.getDate();
        
        // Marcar días de otros meses
        if (date.getMonth() !== appState.currentMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Marcar día seleccionado
        if (appState.selectedDate && 
            date.getDate() === appState.selectedDate.getDate() &&
            date.getMonth() === appState.selectedDate.getMonth() &&
            date.getFullYear() === appState.selectedDate.getFullYear()) {
            dayElement.classList.add('selected');
        }
        
        // Agregar event listener solo a días del mes actual
        if (date.getMonth() === appState.currentMonth) {
            dayElement.addEventListener('click', function() {
                // Remover selección anterior
                document.querySelectorAll('.date-day.selected').forEach(day => {
                    day.classList.remove('selected');
                });
                
                // Seleccionar nuevo día
                this.classList.add('selected');
                appState.selectedDate = new Date(date);
                
                // Actualizar texto de fecha seleccionada
                updateSelectedDateText();
                
                // Limpiar error si existe
                clearError('errorFecha');
            });
        }
        
        dateGrid.appendChild(dayElement);
    }
}

function updateSelectedDateText() {
    const selectedDateElement = document.getElementById('selectedDate');
    if (appState.selectedDate) {
        const day = appState.selectedDate.getDate();
        const month = monthNames[appState.selectedDate.getMonth()];
        const year = appState.selectedDate.getFullYear();
        selectedDateElement.textContent = `Fecha seleccionada: ${day} de ${month} de ${year}`;
    } else {
        selectedDateElement.textContent = 'Fecha seleccionada: Ninguna';
    }
}

// Configurar botón de submit
function setupSubmitButton() {
    const submitButton = document.getElementById('submitButton');
    
    // Bloquear navegación con Tab
    submitButton.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }
    });
    
    submitButton.addEventListener('click', function() {
        if (validateForm()) {
            submitForm();
        }
    });
}

// Validar formulario
function validateForm() {
    let isValid = true;
    
    // Validar nuevo password - debe existir Y tener 3 números consecutivos al inicio
    const password = document.getElementById('nuevoPassword').value.trim();
    if (!password) {
        // Campo vacío
        showError('errorPassword', 'El nuevo password tiene errores, por favor corregir');
        setFieldError('nuevoPassword');
        isValid = false;
    } else if (!validatePassword(password)) {
        // Campo con contenido pero patrón inválido
        showError('errorPassword', 'El nuevo password tiene errores, por favor corregir');
        setFieldError('nuevoPassword');
        isValid = false;
    } else {
        clearError('errorPassword');
        clearFieldError('nuevoPassword');
    }
    
    // Validar nombre - debe existir y tener exactamente 4 letras
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        showError('errorNombre', 'El nombre tiene errores, por favor corregir');
        setFieldError('nombre');
        isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4}$/.test(nombre)) {
        showError('errorNombre', 'El nombre tiene errores, por favor corregir');
        setFieldError('nombre');
        isValid = false;
    } else {
        clearError('errorNombre');
        clearFieldError('nombre');
    }
    
    // Validar fecha - debe existir
    if (!appState.selectedDate) {
        showError('errorFecha', 'La fecha tiene errores, por favor corregir');
        setFieldError('datePicker');
        isValid = false;
    } else {
        clearError('errorFecha');
        clearFieldError('datePicker');
    }
    
    // Validar cine - debe existir
    if (!appState.selectedProvince) {
        showError('errorProvincia', 'El cine tiene errores, por favor corregir');
        setFieldError('provinciaSelect');
        isValid = false;
    } else {
        clearError('errorProvincia');
        clearFieldError('provinciaSelect');
    }
    
    return isValid;
}

// Función para verificar si el password tiene 3 números consecutivos al inicio
// Validar password - debe tener tres números consecutivos al inicio
function validatePassword(password) {
    if (password.length < 3) return false;
    
    // Obtener los primeros 3 caracteres
    const firstThree = password.substring(0, 3);
    
    // Verificar que sean todos números
    if (!/^\d{3}$/.test(firstThree)) return false;
    
    // Verificar que sean consecutivos (ascendente o descendente)
    const num1 = parseInt(firstThree[0]);
    const num2 = parseInt(firstThree[1]);
    const num3 = parseInt(firstThree[2]);
    
    return (num2 === num1 + 1 && num3 === num2 + 1) || 
           (num2 === num1 - 1 && num3 === num2 - 1);
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
}

function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
}

function setFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
    } else if (fieldId === 'datePicker') {
        document.getElementById('datePicker').classList.add('error');
    } else if (fieldId === 'provinciaSelect') {
        document.querySelector('.select-trigger').classList.add('error');
    }
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('error');
    } else if (fieldId === 'datePicker') {
        document.getElementById('datePicker').classList.remove('error');
    } else if (fieldId === 'provinciaSelect') {
        document.querySelector('.select-trigger').classList.remove('error');
    }
}

// Enviar formulario
function submitForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const provincia = appState.selectedProvince;
    const fecha = appState.selectedDate;
    
    // Construir URL con parámetros (sin password)
    const params = new URLSearchParams();
    params.append('nombre', nombre);
    params.append('provincia', provincia);
    if (fecha) {
        params.append('fecha', fecha.toISOString());
    }
    
    // Redireccionar a la misma página con parámetros
    window.location.href = `${window.location.pathname}?${params.toString()}`;
}

// Verificar parámetros de URL
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('nombre')) {
        // Mostrar dialog con los datos
        showResultDialog(urlParams);
    }
}

// Mostrar dialog con resultados
function showResultDialog(urlParams) {
    const dialog = document.getElementById('resultDialog');
    const dialogBody = document.getElementById('dialogBody');
    
    // Limpiar contenido anterior
    dialogBody.innerHTML = '';
    
    // Agregar información de la película seleccionada si existe
    if (appState.selectedMovie) {
        let movie = null;
        
        // Buscar la película en todos los géneros
        Object.keys(peliculas).forEach(genre => {
            const foundMovie = peliculas[genre].find(p => p.id === appState.selectedMovie);
            if (foundMovie) {
                movie = foundMovie;
            }
        });
        
        if (movie) {
            const movieSection = document.createElement('div');
            movieSection.className = 'dialog-movie-section';
            movieSection.innerHTML = `
                <div class="dialog-movie-header">Película Seleccionada</div>
                <div class="dialog-movie-content">
                    <img src="${movie.image}" alt="Poster de ${movie.title}" class="dialog-movie-image">
                    <div class="dialog-movie-title">${movie.title}</div>
                </div>
            `;
            dialogBody.appendChild(movieSection);
        }
    }
    
    // Crear elementos para mostrar los datos
    const fields = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'provincia', label: 'Cine de su preferencia' },
        { key: 'fecha', label: 'Fecha' }
    ];
    
    fields.forEach(field => {
        const value = urlParams.get(field.key);
        if (value) {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'dialog-field';
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'dialog-label';
            labelDiv.textContent = field.label + ':';
            
            const valueDiv = document.createElement('div');
            valueDiv.className = 'dialog-value';
            
            if (field.key === 'provincia' && value) {
                valueDiv.textContent = provincias[value] || value;
            } else if (field.key === 'fecha') {
                const date = new Date(value);
                const day = date.getDate();
                const month = monthNames[date.getMonth()];
                const year = date.getFullYear();
                valueDiv.textContent = `${day} de ${month} de ${year}`;
            } else {
                valueDiv.textContent = value;
            }
            
            fieldDiv.appendChild(labelDiv);
            fieldDiv.appendChild(valueDiv);
            dialogBody.appendChild(fieldDiv);
        }
    });
    
    // Mostrar dialog
    dialog.showModal();
}

// Configurar dialog
function setupDialog() {
    const dialog = document.getElementById('resultDialog');
    const closeButton = document.getElementById('closeDialog');
    
    closeButton.addEventListener('click', function() {
        dialog.close();
        // Limpiar URL
        window.history.replaceState({}, document.title, window.location.pathname);
    });
    
    // Cerrar dialog al hacer click fuera
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            dialog.close();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });
}
