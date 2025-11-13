import { Phase } from '../types';

export const CHECKLIST_DATA: Phase[] = [
  {
    id: "phase-1",
    title: "I. Fase de Gestión y Formalización Inicial (Pasos Previos)",
    description: "💡 Requisito de Gestión",
    tasks: [
      { id: 1, title: "1. Conformación del Comité de Salud Intercultural (CSI)", description: "Conformar y formalizar un Comité de Salud Intercultural (equipo de gestión). Designar al coordinador del comité (se sugiere a quien tenga mayores atribuciones orgánicas).", completed: false, notes: "", evidence: "" },
      { id: 2, title: "2. Integración del CSI", description: "El comité debe estar integrado por: Director/a o Subdirector/a del establecimiento, Referente de Participación, Encargado/a Coordinador/a de un servicio o programa clínico, Referente de pueblos indígenas, Asesor Cultural, Referente de Capacitación, Profesional de perfil sociosanitario, Representante de la posta de salud rural y Representante gremial.", completed: false, notes: "", evidence: "" },
      { id: 3, title: "3. Formalización del Equipo de Apoyo", description: "Obtener una resolución o decreto de nombramiento del equipo de apoyo/Comité de Salud Intercultural. Asignar horas semanales o mensuales para el trabajo en la Oficina Amuldungun.", completed: false, notes: "", evidence: "" },
      { id: 4, title: "4. Elaboración del Documento Modelo", description: "Elaborar el documento del Modelo de Salud Intercultural y los protocolos para su futura implementación.", completed: false, notes: "", evidence: "" },
      { id: 5, title: "5. Contextualización del Establecimiento", description: "Agregar la ubicación, nivel de complejidad, población general y mapuche atendida, perfil epidemiológico y determinantes sociales del territorio en el documento del modelo.", completed: false, notes: "", evidence: "" },
      { id: 6, title: "6. Definición de Principios", description: "Definir y documentar los principios u orientaciones que sostendrán el modelo (ej. Interculturalidad, pertinencia cultural, buen vivir).", completed: false, notes: "", evidence: "" },
      { id: 7, title: "7. Diagnóstico Comunitario", description: "Elaborar el diagnóstico comunitario y epidemiológico para focalizar la intervención de salud del territorio, incorporando la situación de salud de la población indígena.", completed: false, notes: "", evidence: "" },
    ]
  },
  {
    id: "phase-2",
    title: "II. Desarrollo de los Componentes Mínimos Obligatorios (Art. 7, Ley 20.584)",
    description: "",
    components: [
      {
        id: "comp-A", icon: "👥", title: "A. Participación Indígena y Cogestión", deadline: "6 meses", tasks: [
          { id: 8, title: "8. Instancia Permanente de Participación", description: "Conformar una instancia específica y permanente de participación indígena en salud, basada en el diálogo horizontal, la negociación y la toma de decisiones por consenso (carácter incidente, no consultivo).", completed: false, notes: "", evidence: "" },
          { id: 9, title: "9. Fortalecimiento de Mesas Locales", description: "Constitución y fortalecimiento de la mesa local de salud Mapuche.", completed: false, notes: "", evidence: "" },
          { id: 10, title: "10. Integración en la Gestión", description: "Incorporar representantes de la mesa de salud mapuche en las instancias de participación del establecimiento (COSOC, CODELO, etc.).", completed: false, notes: "", evidence: "" },
          { id: 11, title: "11. Participación en Comités de Ética", description: "Incorporar a los pueblos indígenas (en calidad de expertos) en los Comités de Ética Asistencial/científicos/clínicos.", completed: false, notes: "", evidence: "" },
          { id: 12, title: "12. Herramientas para Equipos", description: "Dotar a los equipos de salud con herramientas de participación que incorporen el conocimiento de la cultura de los usuarios.", completed: false, notes: "", evidence: "" },
        ]
      },
      {
        id: "comp-B", icon: "💊", title: "B. Reconocimiento y Fortalecimiento de Sistemas de Sanación", deadline: "12 meses", tasks: [
          { id: 13, title: "13. Protocolos de Complementariedad", description: "Establecer mecanismos permanentes de colaboración y complementariedad con los sistemas de sanación, mediante protocolos locales.", completed: false, notes: "", evidence: "" },
          { id: 14, title: "14. Sistemas de Referencia y Contrarreferencia", description: "Implementar protocolos de referencia y contrarreferencia entre el sistema médico mapuche y el alópata. (Las atenciones Mapuche se registran en el REM A04 sección G).", completed: false, notes: "", evidence: "" },
          { id: 15, title: "15. Acceso a Sanadores Hospitalizados", description: "Asegurar que los sanadores puedan acceder a otorgar atención a pacientes hospitalizados si es solicitado por el paciente o la familia, en un marco de diálogo y respeto.", completed: false, notes: "", evidence: "" },
          { id: 16, title: "16. Ingreso de Lawen", description: "Coordinar con el Facilitador Intercultural y la familia el ingreso de Lawen (medicamentos a base de hierbas) para tratamiento y asistencia espiritual en el área de hospitalizados.", completed: false, notes: "", evidence: "" },
          { id: 17, title: "17. Formación sobre Sistemas Indígenas", description: "Diseñar e incorporar en los programas de capacitación contenidos para que los equipos de salud conozcan, respeten y acojan los principios y prácticas de los sistemas de sanación, definidos colectivamente.", completed: false, notes: "", evidence: "" },
          { id: 18, title: "18. Convenios Interjurisdiccionales", description: "Celebrar convenios o establecer mecanismos de coordinación con otros servicios de salud para facilitar el acceso a los sistemas de sanación si no están disponibles en el área.", completed: false, notes: "", evidence: "" },
        ]
      },
      {
        id: "comp-C", icon: "👨‍💻", title: "C. Asesor/a Cultural (Facilitador Intercultural)", deadline: "24 meses", tasks: [
          { id: 19, title: "19. Proceso de Selección Participativo", description: "Garantizar que representantes de comunidades y organizaciones indígenas participen en la definición del perfil, selección y evaluación institucional del Asesor/a Cultural. (El proceso de contratación debe ser mediante concurso público).", completed: false, notes: "", evidence: "" },
          { id: 20, title: "20. Condiciones Laborales y Espacio Físico", description: "Disponer de la Oficina Amuldungun (sugerida de 12 m²), un espacio adecuado, pertinente, visible y que garantice la privacidad de la entrevista.", completed: false, notes: "", evidence: "" },
          { id: 21, title: "21. Integración y Recursos", description: "Generar las condiciones para la incorporación efectiva en los equipos de salud y otorgar los recursos para el pleno ejercicio de sus funciones.", completed: false, notes: "", evidence: "" },
          { id: 22, title: "22. Planificación Anual", description: "Elaborar, implementar, realizar seguimiento y evaluar la planificación anual de actividades en conjunto con el equipo de apoyo/Comité de Salud Intercultural (dos veces al año).", completed: false, notes: "", evidence: "" },
          { id: 23, title: "23. Funciones Clave", description: "Asesorar a directivos, facilitar la interacción paciente-personal, velar por la transversalización del enfoque cultural en los programas sanitarios, apoyar la gestión de referencia, y velar por la participación indígena en la toma de decisiones.", completed: false, notes: "", evidence: "" },
        ]
      },
      {
        id: "comp-D", icon: "🏗️", title: "D. Infraestructura y Adecuaciones Espaciales", deadline: "24 meses", tasks: [
          { id: 24, title: "24. Señalética Bilingüe y Simbología", description: "Incorporar simbología y señalética en español y en la o las lenguas indígenas del territorio. Este trabajo debe ser desarrollado con la comunidad.", completed: false, notes: "", evidence: "" },
          { id: 25, title: "25. Orientación de Camas", description: "Priorizar algunas camas con orientación al este (cabeza mirando al este).", completed: false, notes: "", evidence: "" },
          { id: 26, title: "26. Nuevos Proyectos", description: "Asegurar estándares de pertinencia cultural en nuevos proyectos arquitectónicos, preferentemente con la mirada y aprobación de la comunidad.", completed: false, notes: "", evidence: "" },
        ]
      },
      {
        id: "comp-E", icon: "🙏", title: "E. Asistencia Espiritual y Religiosa", deadline: "6 meses", tasks: [
          { id: 27, title: "27. Garantía de Acompañamiento", description: "Velar por que se aseguren condiciones adecuadas de respeto, espacio, privacidad y tranquilidad para el acompañamiento espiritual o religioso (incluyendo sanadores indígenas, familiares o miembros de la comunidad).", completed: false, notes: "", evidence: "" },
          { id: 28, title: "28. Protocolo de Ingreso y Espacio", description: "Elaborar un protocolo de ingreso y disponer de un espacio adecuado sin símbolos de otras religiones para ceremonias. En caso contrario, solicitar permiso y usar biombos.", completed: false, notes: "", evidence: "" },
          { id: 29, title: "29. Resguardo de Elementos Culturales", description: "Resguardar el uso de elementos terapéuticos, simbólicos y ceremoniales propios de la cosmovisión indígena durante el acompañamiento.", completed: false, notes: "", evidence: "" },
          { id: 30, title: "30. Reglamentación Interna", description: "Incorporar en la reglamentación interna los procedimientos para recibir asistencia espiritual o religiosa propia de su cultura.", completed: false, notes: "", evidence: "" },
        ]
      },
      {
        id: "comp-F", icon: "📊", title: "F. Adecuaciones Técnicas y Organizacionales", deadline: "18 meses", tasks: [
          { id: 31, title: "31. Capacitación Continua", description: "Implementar un Programa de formación y capacitación continua en interculturalidad en salud (PAC/PAC APS) dirigido al personal.", completed: false, notes: "", evidence: "" },
          { id: 32, title: "32. Inducción de Funcionarios Nuevos", description: "Implementar un programa de inducción en salud intercultural para funcionarios nuevos (a lo menos 2 veces al año).", completed: false, notes: "", evidence: "" },
          { id: 33, title: "33. Convenios Docente Asistenciales", description: "Cautelar que los convenios docentes asistenciales incorporen capacitaciones sobre enfoque intercultural.", completed: false, notes: "", evidence: "" },
          { id: 34, title: "34. Transversalización de Programas", description: "Adecuar la pertinencia cultural en los programas de salud en todas las etapas del ciclo vital (e.g., Cardiovascular, Salud Mental, Salud de la Mujer, TBC, etc.).", completed: false, notes: "", evidence: "" },
          { id: 35, title: "35. Adecuación de Servicios Específicos", description: "Implementar adecuaciones específicas en servicios como: Farmacia (infografía cultural, entrega de medicamentos), Salud Mental (revisión de casos clínicos sospechosos de enfermedad mapuche), Nutrición (integrar minutas adecuadas al territorio en hospitalizados), Servicio Dental (apoyo con cuentos), Entrega de agua de hierbas, Entrega de placenta (con educación y orientación).", completed: false, notes: "", evidence: "" },
          { id: 36, title: "36. Conformación de Equipos", description: "Conformar equipos de salud interculturales con personal clínico, social, administrativo y facilitadores.", completed: false, notes: "", evidence: "" },
          { id: 37, title: "37. Acceso Diferenciado y Horarios", description: "Adecuar los horarios de atención ambulatoria y establecer un sistema de acceso a horas diferenciado (según dispersión geográfica, ruralidad, etc.), visible en el establecimiento.", completed: false, notes: "", evidence: "" },
          { id: 38, title: "38. Registros de Autoadscripción", description: "Formular la pregunta de pertenencia a pueblos indígenas en los sistemas de información de salud y registrar adecuadamente (autoadscripción).", completed: false, notes: "", evidence: "" },
          { id: 39, title: "39. Consentimiento Informado Culturalmente Pertinente", description: "Asegurar que el proceso de consentimiento informado considere las características culturales y concepciones de salud propias de las personas indígenas.", completed: false, notes: "", evidence: "" },
          { id: 40, title: "40. Estrategias de Promoción y Prevención", description: "Desarrollar estrategias preventivas y promocionales (ej. trabajo en escuelas con alimentación mapuche, talleres de rescate de hierbas, juego del palin).", completed: false, notes: "", evidence: "" },
        ]
      },
    ]
  },
  {
    id: "phase-3",
    title: "III. Fase de Formalización y Validación Final",
    description: "💡 Tarea Clave",
    tasks: [
      { id: 41, title: "41. Elaboración del Reglamento Interno", description: "Elaborar un reglamento interno de funcionamiento del modelo de salud intercultural. Este debe incluir, a lo menos, protocolos de referencia, mecanismos de participación, adecuación cultural de la atención y procedimientos de consentimiento informado.", completed: false, notes: "", evidence: "" },
      { id: 42, title: "42. Socialización y Mejora", description: "El modelo elaborado debe ser socializado, desarrollado y mejorado si es necesario, en conjunto con las comunidades de su territorio o área de influencia.", completed: false, notes: "", evidence: "" },
      { id: 43, title: "43. Validación Comunitaria", description: "Aplicar un modelo de salud intercultural validado ante las comunidades indígenas.", completed: false, notes: "", evidence: "" },
      { id: 44, title: "44. Monitoreo Institucional", description: "Establecer un mecanismo institucionalizado de monitoreo del cumplimiento del derecho a la atención de salud con pertinencia cultural.", completed: false, notes: "", evidence: "" },
    ]
  }
];
