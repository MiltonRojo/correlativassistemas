// Datos de las materias y sus correlativas para Ingeniería en Sistemas de Información - UTN
const materias = [
    // Nivel 1
    { id: 1, nombre: "Análisis Matemático I", nivel: 1, correlativas: [] },
    { id: 2, nombre: "Álgebra y Geometría Analítica", nivel: 1, correlativas: [] },
    { id: 3, nombre: "Sistemas y Organizaciones", nivel: 1, correlativas: [] },
    { id: 4, nombre: "Algoritmos y Estructuras de Datos", nivel: 1, correlativas: [] },
    { id: 5, nombre: "Arquitectura de Computadoras", nivel: 1, correlativas: [] },
    
    // Nivel 2
    { id: 6, nombre: "Análisis Matemático II", nivel: 2, correlativas: [1] },
    { id: 7, nombre: "Física I", nivel: 2, correlativas: [1, 2] },
    { id: 8, nombre: "Inglés I", nivel: 2, correlativas: [] },
    { id: 9, nombre: "Paradigmas de Programación", nivel: 2, correlativas: [4] },
    { id: 10, nombre: "Sintaxis y Semántica de los Lenguajes", nivel: 2, correlativas: [4] },
    
    // Nivel 3
    { id: 11, nombre: "Probabilidad y Estadística", nivel: 3, correlativas: [6] },
    { id: 12, nombre: "Física II", nivel: 3, correlativas: [7] },
    { id: 13, nombre: "Inglés II", nivel: 3, correlativas: [8] },
    { id: 14, nombre: "Química", nivel: 3, correlativas: [] },
    { id: 15, nombre: "Sistemas Operativos", nivel: 3, correlativas: [5] },
    { id: 16, nombre: "Gestión de Datos", nivel: 3, correlativas: [9] },
    
    // Nivel 4
    { id: 17, nombre: "Investigación Operativa", nivel: 4, correlativas: [11] },
    { id: 18, nombre: "Comunicaciones", nivel: 4, correlativas: [12] },
    { id: 19, nombre: "Diseño de Sistemas", nivel: 4, correlativas: [3, 16] },
    { id: 20, nombre: "Redes de Información", nivel: 4, correlativas: [15] },
    { id: 21, nombre: "Matemática Superior", nivel: 4, correlativas: [6] },
    { id: 22, nombre: "Legislación", nivel: 4, correlativas: [] },
    
    // Nivel 5
    { id: 23, nombre: "Teoría de Control", nivel: 5, correlativas: [21] },
    { id: 24, nombre: "Simulación", nivel: 5, correlativas: [17] },
    { id: 25, nombre: "Economía", nivel: 5, correlativas: [] },
    { id: 26, nombre: "Administración de Recursos", nivel: 5, correlativas: [19] },
    { id: 27, nombre: "Ingeniería de Software", nivel: 5, correlativas: [19] },
    { id: 28, nombre: "Administración de Recursos Informáticos", nivel: 5, correlativas: [20] },
    { id: 29, nombre: "Integrador", nivel: 5, correlativas: [19, 20] }
];

// Estado de la aplicación
let materiasAprobadas = new Set();
let nivelFiltro = "todos";

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarEstadoGuardado();
    renderizarMaterias();
    actualizarResultados();
    inicializarEventListeners();
});

// Event Listeners
function inicializarEventListeners() {
    document.getElementById('nivelFilter').addEventListener('change', (e) => {
        nivelFiltro = e.target.value;
        renderizarMaterias();
    });

    document.getElementById('clearAll').addEventListener('click', () => {
        materiasAprobadas.clear();
        guardarEstado();
        renderizarMaterias();
        actualizarResultados();
    });

    document.getElementById('selectAll').addEventListener('click', () => {
        materias.forEach(m => materiasAprobadas.add(m.id));
        guardarEstado();
        renderizarMaterias();
        actualizarResultados();
    });
}

// Renderizar materias
function renderizarMaterias() {
    const container = document.getElementById('materiasContainer');
    container.innerHTML = '';

    const materiasFiltradas = nivelFiltro === "todos" 
        ? materias 
        : materias.filter(m => m.nivel.toString() === nivelFiltro);

    materiasFiltradas.forEach(materia => {
        const card = crearTarjetaMateria(materia);
        container.appendChild(card);
    });
}

// Crear tarjeta de materia
function crearTarjetaMateria(materia) {
    const card = document.createElement('div');
    card.className = 'materia-card';
    
    const estaAprobada = materiasAprobadas.has(materia.id);
    const puedeCursar = !estaAprobada && puedeCursarMateria(materia);
    
    if (estaAprobada) {
        card.classList.add('aprobada');
    } else if (puedeCursar) {
        card.classList.add('puede-cursar');
    } else {
        card.classList.add('bloqueada');
    }

    const correlativasTexto = obtenerNombresCorrelativas(materia.correlativas);
    
    card.innerHTML = `
        <span class="materia-nivel">Nivel ${materia.nivel}</span>
        <span class="materia-nombre">${materia.nombre}</span>
        ${materia.correlativas.length > 0 ? `
            <div class="materia-correlativas">
                <strong>Requiere:</strong>
                ${correlativasTexto}
            </div>
        ` : '<div class="materia-correlativas">Sin correlativas</div>'}
    `;

    card.addEventListener('click', () => {
        toggleMateria(materia.id);
    });

    return card;
}

// Toggle estado de materia
function toggleMateria(id) {
    if (materiasAprobadas.has(id)) {
        // Verificar si alguna materia aprobada depende de esta
        const dependientes = materias.filter(m => 
            materiasAprobadas.has(m.id) && m.correlativas.includes(id)
        );
        
        if (dependientes.length > 0) {
            const nombres = dependientes.map(m => m.nombre).join(', ');
            if (!confirm(`Si desaprobás esta materia, también se desaprobarán: ${nombres}. ¿Continuar?`)) {
                return;
            }
            // Desaprobar esta materia y todas las dependientes
            materiasAprobadas.delete(id);
            dependientes.forEach(m => materiasAprobadas.delete(m.id));
        } else {
            materiasAprobadas.delete(id);
        }
    } else {
        materiasAprobadas.add(id);
    }
    
    guardarEstado();
    renderizarMaterias();
    actualizarResultados();
}

// Verificar si puede cursar una materia
function puedeCursarMateria(materia) {
    if (materia.correlativas.length === 0) return true;
    return materia.correlativas.every(corrId => materiasAprobadas.has(corrId));
}

// Obtener nombres de correlativas
function obtenerNombresCorrelativas(correlativasIds) {
    return correlativasIds
        .map(id => {
            const materia = materias.find(m => m.id === id);
            return materia ? materia.nombre : 'Desconocida';
        })
        .join(', ');
}

// Actualizar resultados
function actualizarResultados() {
    const materiasNoAprobadas = materias.filter(m => !materiasAprobadas.has(m.id));
    const materiasPuedeCursar = materiasNoAprobadas.filter(m => puedeCursarMateria(m));
    const materiasBloqueadas = materiasNoAprobadas.filter(m => !puedeCursarMateria(m));

    // Actualizar estadísticas
    document.getElementById('materiasAprobadas').textContent = materiasAprobadas.size;
    document.getElementById('materiasPosibles').textContent = materiasPuedeCursar.length;
    document.getElementById('materiasBloqueadas').textContent = materiasBloqueadas.length;

    // Actualizar listas
    renderizarListaResultados('materiasPosiblesLista', materiasPuedeCursar, 'puede-cursar');
    renderizarListaResultados('materiasBloqueadasLista', materiasBloqueadas, 'bloqueada');
}

// Renderizar lista de resultados
function renderizarListaResultados(containerId, materiasList, clase) {
    const container = document.getElementById(containerId);
    
    if (materiasList.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay materias en esta categoría</div>';
        return;
    }

    container.innerHTML = materiasList
        .sort((a, b) => a.nivel - b.nivel || a.nombre.localeCompare(b.nombre))
        .map(materia => {
            const correlativasTexto = materia.correlativas.length > 0 
                ? obtenerNombresCorrelativas(materia.correlativas)
                : 'Sin correlativas';
            
            const faltantes = materia.correlativas.filter(id => !materiasAprobadas.has(id));
            const faltantesTexto = faltantes.length > 0 
                ? obtenerNombresCorrelativas(faltantes)
                : '';

            return `
                <div class="materia-item ${clase}">
                    <strong>${materia.nombre}</strong>
                    <small>Nivel ${materia.nivel}</small>
                    ${materia.correlativas.length > 0 ? `
                        <small style="display: block; margin-top: 0.25rem;">
                            Requiere: ${correlativasTexto}
                        </small>
                    ` : ''}
                    ${faltantes.length > 0 ? `
                        <small style="display: block; margin-top: 0.25rem; color: var(--danger-color); font-weight: 600;">
                            Te falta: ${faltantesTexto}
                        </small>
                    ` : ''}
                </div>
            `;
        })
        .join('');
}

// Guardar estado en localStorage
function guardarEstado() {
    localStorage.setItem('materiasAprobadas', JSON.stringify([...materiasAprobadas]));
}

// Cargar estado desde localStorage
function cargarEstadoGuardado() {
    const guardado = localStorage.getItem('materiasAprobadas');
    if (guardado) {
        try {
            const array = JSON.parse(guardado);
            materiasAprobadas = new Set(array);
        } catch (e) {
            console.error('Error al cargar estado guardado:', e);
        }
    }
}
