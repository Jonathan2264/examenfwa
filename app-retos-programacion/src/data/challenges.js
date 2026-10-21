export const initialChallenges = [
  {
    id: 1,
    title: "1. Tipo de dato en JavaScript",
    category: "JavaScript Básico",
    type: "choice", // Tipo selección múltiple
    difficulty: "Fácil",
    points: 10,
    description: "¿Cuál es el resultado de ejecutar `typeof NaN` en JavaScript?",
    options: ["'number'", "'nan'", "'undefined'", "'object'"],
    correctAnswer: "'number'",
    explanation: "En JavaScript, NaN (Not a Number) es técnicamente de tipo numérico según la especificación IEEE 754."
  },
  {
    id: 2,
    title: "2. Completar función de Palíndromo",
    category: "Lógica / Algoritmos",
    type: "code", // Tipo solución introducida / escrita
    difficulty: "Medio",
    points: 20,
    description: "Escribe el método de Array que invierte los elementos en JavaScript para completar: `cadena.split('').____().join('')`",
    expectedInput: "reverse",
    placeholder: "ejemplo: reverse",
    explanation: "El método reverse() invierte el orden de los elementos de un array."
  },
  {
    id: 3,
    title: "3. Scope con 'let' vs 'var'",
    category: "JavaScript Moderno",
    type: "choice",
    difficulty: "Fácil",
    points: 10,
    description: "¿Qué tipo de alcance (scope) tiene una variable declarada con `let` dentro de un bloque if?",
    options: ["Alcance global", "Alcance de bloque", "Alcance de función", "No tiene alcance"],
    correctAnswer: "Alcance de bloque",
    explanation: "`let` y `const` poseen block scope (alcance delimitado por las llaves {} donde se definen)."
  },
  {
    id: 4,
    title: "4. React Hook de Estado",
    category: "React",
    type: "code",
    difficulty: "Medio",
    points: 15,
    description: "¿Cuál es el nombre del Hook estándar en React usado para declarar variables de estado en componentes funcionales? (solo el nombre de la función)",
    expectedInput: "useState",
    placeholder: "ejemplo: useState",
    explanation: "useState es el hook fundamental para manejar estado reactivo en React."
  },
  {
    id: 5,
    title: "5. Complejidad Búsqueda Binaria",
    category: "Estructuras y Algoritmos",
    type: "choice",
    difficulty: "Difícil",
    points: 25,
    description: "¿Cuál es la complejidad temporal en el peor caso de la búsqueda binaria sobre un array ordenado?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: "O(log n)",
    explanation: "La búsqueda binaria divide el espacio de búsqueda a la mitad en cada paso, resultando en O(log n)."
  }
];