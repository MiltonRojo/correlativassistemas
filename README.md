# 📚 Sistema de Correlativas - Ingeniería en Sistemas UTN

Herramienta web interactiva para estudiantes de Ingeniería en Sistemas de Información de la Universidad Tecnológica Nacional (UTN) que permite visualizar y gestionar el progreso académico, mostrando qué materias se pueden cursar según las correlativas aprobadas.

## 🌟 Características

- ✅ Visualización clara de todas las materias de la carrera
- 🔍 Filtrado por nivel académico
- ✨ Indicadores visuales del estado de cada materia:
  - **Verde**: Materias aprobadas
  - **Verde claro**: Materias que podés cursar
  - **Rojo claro**: Materias bloqueadas por correlativas
- 📊 Estadísticas en tiempo real de tu progreso
- 💾 Guardado automático del progreso en el navegador
- 📱 Diseño responsive (funciona en móviles y tablets)

## 🚀 Uso

### Opción 1: Uso Local

1. Descargá los archivos del repositorio
2. Abrí el archivo `index.html` en tu navegador web
3. ¡Listo! Ya podés usar la herramienta

### Opción 2: Despliegue Web

#### GitHub Pages

1. Ve a Settings > Pages en tu repositorio
2. Seleccioná la rama `main` como source
3. Guardá los cambios
4. Tu sitio estará disponible en: `https://miltonrojo.github.io/correlativassistemas/`

#### Netlify

1. Conectá tu repositorio a Netlify
2. El sitio se desplegará automáticamente

#### Vercel

1. Importá tu repositorio en Vercel
2. El sitio se desplegará automáticamente

## 📖 Cómo usar la herramienta

1. **Seleccionar materias aprobadas**: Hacé clic en las materias que ya aprobaste. Se marcarán en verde.
2. **Ver materias disponibles**: Las materias que podés cursar se mostrarán en verde claro.
3. **Ver materias bloqueadas**: Las materias que no podés cursar (te faltan correlativas) se mostrarán en rojo claro.
4. **Filtrar por nivel**: Usá el selector de nivel para ver solo las materias de un nivel específico.
5. **Estadísticas**: En la sección de resultados verás un resumen de tu progreso.

## 🛠️ Tecnologías

- HTML5
- CSS3 (con variables CSS y diseño responsive)
- JavaScript vanilla (sin dependencias)
- LocalStorage para persistencia de datos

## ⚠️ Importante

Esta es una herramienta educativa de referencia. Siempre verificá la información oficial de correlativas en la normativa de tu facultad, ya que pueden existir cambios o excepciones particulares.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encontrás algún error en las correlativas o querés agregar funcionalidades:

1. Hacé un fork del repositorio
2. Creá una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commiteá tus cambios (`git commit -am 'Agrego nueva funcionalidad'`)
4. Pusheá a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrí un Pull Request

## 📝 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Milton Rodrigo Caceres Barrero

---

**Nota**: Los datos de correlativas pueden variar según la sede de la UTN. Esta herramienta usa el plan de estudios estándar de Ingeniería en Sistemas de Información.
