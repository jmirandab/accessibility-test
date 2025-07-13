// Estado global de la aplicación
let appState = {
    selectedProvince: '',
    selectedMovie: null,
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
});

function initializeApp() {
    // Generar el tree view dinámicamente
    generateTreeView();
    
    // Configurar el menú hamburguesa
    setupHamburgerMenu();
    
    // Configurar el tree view
    setupTreeView();
    
    // Configurar el select personalizado
    setupCustomSelect();
    
    // Configurar el formulario
    setupForm();
    
    // Seleccionar la primera película por defecto
    selectFirstMovie();
}

// Generar tree view dinámicamente
function generateTreeView() {
    const treeView = document.querySelector('.tree-view');
    treeView.innerHTML = '';
    
    Object.keys(peliculas).forEach(genero => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'tree-group';
        
        const parentDiv = document.createElement('div');
        parentDiv.className = 'tree-parent';
        parentDiv.setAttribute('role', 'menuitem');
        parentDiv.setAttribute('aria-haspopup', 'true');
        parentDiv.setAttribute('aria-expanded', 'false');
        parentDiv.setAttribute('tabindex', '0');
        parentDiv.innerHTML = `
            <span class="tree-icon">▶</span>
            <span>${genero}</span>
        `;
        
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'tree-children';
        childrenDiv.setAttribute('role', 'menu');
        childrenDiv.setAttribute('aria-label', `Películas de ${genero}`);
        
        peliculas[genero].forEach(pelicula => {
            const childDiv = document.createElement('div');
            childDiv.className = 'tree-child';
            childDiv.setAttribute('role', 'menuitem');
            childDiv.setAttribute('tabindex', '0');
            childDiv.setAttribute('data-movie-id', pelicula.id);
            childDiv.setAttribute('data-movie-title', pelicula.title);
            childDiv.setAttribute('data-movie-image', pelicula.image);
            childDiv.textContent = pelicula.title;
            
            childrenDiv.appendChild(childDiv);
        });
        
        groupDiv.appendChild(parentDiv);
        groupDiv.appendChild(childrenDiv);
        treeView.appendChild(groupDiv);
    });
}

// Configurar menú hamburguesa
function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.querySelector('.sidebar');
    
    hamburgerMenu.addEventListener('click', function() {
        const isCollapsed = sidebar.classList.contains('show');
        
        if (isCollapsed) {
            sidebar.classList.remove('show');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        } else {
            sidebar.classList.add('show');
            hamburgerMenu.setAttribute('aria-expanded', 'true');
        }
        
        appState.sidebarCollapsed = !isCollapsed;
    });
    
    // Cerrar sidebar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            hamburgerMenu.focus();
        }
    });
}

// Configurar tree view
function setupTreeView() {
    const treeView = document.querySelector('.tree-view');
    
    treeView.addEventListener('click', function(e) {
        if (e.target.closest('.tree-parent')) {
            const parent = e.target.closest('.tree-parent');
            const children = parent.nextElementSibling;
            const icon = parent.querySelector('.tree-icon');
            const isExpanded = parent.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                children.classList.remove('expanded');
                icon.classList.remove('expanded');
                parent.classList.remove('expanded');
                parent.setAttribute('aria-expanded', 'false');
            } else {
                children.classList.add('expanded');
                icon.classList.add('expanded');
                parent.classList.add('expanded');
                parent.setAttribute('aria-expanded', 'true');
            }
        }
        
        if (e.target.closest('.tree-child')) {
            const child = e.target.closest('.tree-child');
            selectMovie(child);
        }
    });
    
    // Manejo de teclado
    treeView.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (e.target.closest('.tree-parent')) {
                e.target.closest('.tree-parent').click();
            } else if (e.target.closest('.tree-child')) {
                e.target.closest('.tree-child').click();
            }
        }
    });
}

// Seleccionar película
function selectMovie(element) {
    // Remover selección anterior
    document.querySelectorAll('.tree-child').forEach(child => {
        child.classList.remove('selected');
        child.setAttribute('aria-selected', 'false');
    });
    
    // Agregar selección actual
    element.classList.add('selected');
    element.setAttribute('aria-selected', 'true');
    
    // Actualizar estado
    appState.selectedMovie = {
        id: element.getAttribute('data-movie-id'),
        title: element.getAttribute('data-movie-title'),
        image: element.getAttribute('data-movie-image')
    };
    
    // Mostrar película seleccionada
    showSelectedMovie();
}

// Mostrar película seleccionada
function showSelectedMovie() {
    if (!appState.selectedMovie) return;
    
    const movieDisplay = document.getElementById('movieDisplay');
    const movieTitle = document.getElementById('movieTitle');
    const movieImage = document.getElementById('movieImage');
    
    movieTitle.textContent = appState.selectedMovie.title;
    movieImage.src = appState.selectedMovie.image;
    movieImage.alt = `Poster de ${appState.selectedMovie.title}`;
    
    movieDisplay.style.display = 'block';
}

// Seleccionar primera película por defecto
function selectFirstMovie() {
    const firstMovie = document.querySelector('.tree-child');
    if (firstMovie) {
        selectMovie(firstMovie);
    }
}

// Configurar select personalizado
function setupCustomSelect() {
    const customSelect = document.getElementById('provinciaSelect');
    const trigger = customSelect.querySelector('.select-trigger');
    const options = customSelect.querySelector('.select-options');
    const valueSpan = customSelect.querySelector('.select-value');
    const nativeSelect = document.getElementById('provincia'); // Select nativo para validación
    
    // Abrir/cerrar dropdown
    trigger.addEventListener('click', function() {
        const isExpanded = customSelect.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            closeSelect();
        } else {
            openSelect();
        }
    });
    
    // Manejo de teclado para el trigger
    customSelect.addEventListener('keydown', function(e) {
        const isExpanded = customSelect.getAttribute('aria-expanded') === 'true';
        
        if (!isExpanded) {
            // Cuando está cerrado, solo manejar teclas para abrir
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                openSelect();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                openSelect();
            } else if (e.key === 'Escape') {
                closeSelect();
            }
        } else {
            // Cuando está abierto, manejar navegación
            const currentFocused = document.activeElement;
            const allOptions = Array.from(options.querySelectorAll('.select-option'));
            const currentIndex = allOptions.indexOf(currentFocused);
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = currentIndex + 1;
                if (nextIndex < allOptions.length) {
                    allOptions[nextIndex].focus();
                } else {
                    allOptions[0].focus(); // Wrap to first
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex - 1;
                if (prevIndex >= 0) {
                    allOptions[prevIndex].focus();
                } else {
                    allOptions[allOptions.length - 1].focus(); // Wrap to last
                }
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (currentFocused && currentFocused.classList.contains('select-option')) {
                    selectOption(currentFocused);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeSelect();
                customSelect.focus();
            } else if (e.key === 'Tab') {
                // Permitir que Tab funcione normalmente para salir del componente
                closeSelect();
            }
        }
    });
    
    // Seleccionar opción
    options.addEventListener('click', function(e) {
        if (e.target.classList.contains('select-option')) {
            selectOption(e.target);
        }
    });
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            closeSelect();
        }
    });
    
    // Cerrar cuando pierde el foco completamente
    customSelect.addEventListener('focusout', function(e) {
        // Usar setTimeout para verificar si el foco se movió fuera del componente
        setTimeout(() => {
            if (!customSelect.contains(document.activeElement)) {
                closeSelect();
            }
        }, 0);
    });
    
    function openSelect() {
        customSelect.setAttribute('aria-expanded', 'true');
        options.classList.add('show');
        
        // Enfocar la opción seleccionada o la primera
        const selectedOption = options.querySelector('.select-option[aria-selected="true"]') || 
                              options.querySelector('.select-option');
        if (selectedOption) {
            selectedOption.focus();
        }
    }
    
    function closeSelect() {
        customSelect.setAttribute('aria-expanded', 'false');
        options.classList.remove('show');
    }
    
    function selectOption(option) {
        // Remover selección anterior
        options.querySelectorAll('.select-option').forEach(opt => {
            opt.setAttribute('aria-selected', 'false');
        });
        
        // Seleccionar nueva opción
        option.setAttribute('aria-selected', 'true');
        valueSpan.textContent = option.textContent;
        
        // Actualizar estado
        const selectedValue = option.getAttribute('data-value');
        appState.selectedProvince = selectedValue;
        
        // Sincronizar con select nativo para validación HTML5
        nativeSelect.value = selectedValue;
        
        // Limpiar estilos de error si se selecciona una opción válida
        if (selectedValue && selectedValue !== '') {
            nativeSelect.classList.remove('error');
            customSelect.classList.remove('error');
            trigger.classList.remove('error');
        }
        
        // Cerrar dropdown
        closeSelect();
        customSelect.focus();
    }
}

// Configurar formulario
function setupForm() {
    const form = document.querySelector('.form-container');
    
    // Configurar eventos de validación para aplicar estilos personalizados
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        // Evento cuando el campo es inválido
        input.addEventListener('invalid', function(e) {
            e.target.classList.add('error');
            
            // Si es el select de provincia, también marcar el custom select
            if (e.target.id === 'provincia') {
                const customSelect = document.getElementById('provinciaSelect');
                const trigger = customSelect.querySelector('.select-trigger');
                customSelect.classList.add('error');
                trigger.classList.add('error');
            }
        });
        
        // Evento cuando el campo es válido
        input.addEventListener('input', function(e) {
            if (e.target.checkValidity()) {
                e.target.classList.remove('error');
                
                // Si es el select de provincia, también limpiar el custom select
                if (e.target.id === 'provincia') {
                    const customSelect = document.getElementById('provinciaSelect');
                    const trigger = customSelect.querySelector('.select-trigger');
                    customSelect.classList.remove('error');
                    trigger.classList.remove('error');
                }
            }
        });
        
        // También verificar en blur
        input.addEventListener('blur', function(e) {
            if (e.target.checkValidity()) {
                e.target.classList.remove('error');
                
                // Si es el select de provincia, también limpiar el custom select
                if (e.target.id === 'provincia') {
                    const customSelect = document.getElementById('provinciaSelect');
                    const trigger = customSelect.querySelector('.select-trigger');
                    customSelect.classList.remove('error');
                    trigger.classList.remove('error');
                }
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        // Verificar validez del formulario usando validación HTML5 nativa
        if (!form.checkValidity()) {
            // Aplicar estilos de error manualmente a todos los campos inválidos
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('error');
                    
                    // Si es el select de provincia, también marcar el custom select
                    if (input.id === 'provincia') {
                        const customSelect = document.getElementById('provinciaSelect');
                        const trigger = customSelect.querySelector('.select-trigger');
                        customSelect.classList.add('error');
                        trigger.classList.add('error');
                    }
                }
            });
            
            // Si el formulario no es válido, mostrar mensajes de validación nativos
            form.reportValidity();
            return;
        }
        
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre') || '',
            provincia: formData.get('provincia') || '', // Usar el select nativo
            fecha: formData.get('fecha') || '',
            pelicula: appState.selectedMovie || null
        };
        
        // Mostrar resultado
        showResult(data);
    });
}

// Mostrar resultado en dialog
function showResult(data) {
    const dialog = document.getElementById('resultDialog');
    const content = document.getElementById('dialog-content');
    
    // Limpiar contenido anterior
    content.innerHTML = '';
    
    // Agregar información de la película seleccionada si existe
    if (data.pelicula) {
        const movieSection = document.createElement('div');
        movieSection.className = 'dialog-movie-section';
        movieSection.innerHTML = `
            <div class="dialog-movie-header">Película Seleccionada</div>
            <div class="dialog-movie-content">
                <div class="dialog-movie-image">
                    <img src="${data.pelicula.image}" alt="Poster de ${data.pelicula.title}">
                </div>
                <div class="dialog-movie-title">${data.pelicula.title}</div>
            </div>
        `;
        content.appendChild(movieSection);
    }
    
    // Crear elementos para mostrar los datos
    const fields = [
        { key: 'nombre', label: 'Nombre', value: data.nombre },
        { key: 'provincia', label: 'Cine de su preferencia', value: provincias[data.provincia] || data.provincia },
        { key: 'fecha', label: 'Fecha', value: data.fecha }
    ];
    
    fields.forEach(field => {
        if (field.value) {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'dialog-field';
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'dialog-label';
            labelDiv.textContent = field.label + ':';
            
            const valueDiv = document.createElement('div');
            valueDiv.className = 'dialog-value';
            
            if (field.key === 'fecha' && field.value) {
                const date = new Date(field.value);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Los meses van de 0-11
                const year = date.getFullYear();
                valueDiv.textContent = `${day}/${month}/${year}`;
            } else {
                valueDiv.textContent = field.value;
            }
            
            fieldDiv.appendChild(labelDiv);
            fieldDiv.appendChild(valueDiv);
            content.appendChild(fieldDiv);
        }
    });
    
    dialog.showModal();
    
    // Enfocar el botón de cerrar
    const closeButton = dialog.querySelector('.dialog-close');
    if (closeButton) {
        closeButton.focus();
    }
}

// Cerrar dialog
function closeDialog() {
    const dialog = document.getElementById('resultDialog');
    dialog.close();
}

// Cerrar dialog con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const dialog = document.getElementById('resultDialog');
        if (dialog.open) {
            closeDialog();
        }
    }
});
