// js/models/datos-cursos.js

export const baseDeCursos = {
    // ==========================================
    // 1. INGLÉS
    // ==========================================
    ingles: {
        nombre: "Inglés",
        nivel: "Básico",
        unidades: {
            u1: {
                titulo: "Unidad 1: Saludos y Presentaciones",
                checkpoints: {
                    cp1: {
                        titulo: "Lo básico",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Hola"?', opciones: [{ valor: "hello", etiqueta: "Hello" }, { valor: "goodbye", etiqueta: "Goodbye" }, { valor: "please", etiqueta: "Please" }], correcta: "hello", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe la traducción de "Adiós" en inglés', correcta: "goodbye", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Please" significa "Por favor"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Presentaciones",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué significa "Name"?', opciones: [{ valor: "edad", etiqueta: "Edad" }, { valor: "nombre", etiqueta: "Nombre" }, { valor: "amigo", etiqueta: "Amigo" }], correcta: "nombre", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Amigo" en inglés', correcta: "friend", xp: 15 },
                            { tipo: "vf", pregunta: '¿"I am" significa "Yo soy"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Cortesía",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Gracias"?', opciones: [{ valor: "sorry", etiqueta: "Sorry" }, { valor: "thank you", etiqueta: "Thank you" }, { valor: "welcome", etiqueta: "Welcome" }], correcta: "thank you", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Lo siento" en inglés (una palabra)', correcta: "sorry", xp: 15 },
                            { tipo: "vf", pregunta: '¿"You are welcome" se usa para decir "De nada"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u2: {
                titulo: "Unidad 2: Comida y Bebida",
                checkpoints: {
                    cp1: {
                        titulo: "En el restaurante",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Agua"?', opciones: [{ valor: "milk", etiqueta: "Milk" }, { valor: "water", etiqueta: "Water" }, { valor: "wine", etiqueta: "Wine" }], correcta: "water", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Comida" en inglés', correcta: "food", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Menu" significa lo mismo en español?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Bebidas y postres",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué es "Coffee"?', opciones: [{ valor: "te", etiqueta: "Té" }, { valor: "cafe", etiqueta: "Café" }, { valor: "jugo", etiqueta: "Jugo" }], correcta: "cafe", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Leche" en inglés', correcta: "milk", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Cake" significa "Ensalada"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "falso", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "En el mercado",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Manzana"?', opciones: [{ valor: "orange", etiqueta: "Orange" }, { valor: "apple", etiqueta: "Apple" }, { valor: "banana", etiqueta: "Banana" }], correcta: "apple", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Pan" en inglés', correcta: "bread", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Meat" significa "Carne"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u3: {
                titulo: "Unidad 3: Animales",
                checkpoints: {
                    cp1: {
                        titulo: "Animales domésticos",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Perro"?', opciones: [{ valor: "dog", etiqueta: "Dog" }, { valor: "cat", etiqueta: "Cat" }, { valor: "bird", etiqueta: "Bird" }], correcta: "dog", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Gato" en inglés', correcta: "cat", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Bird" significa "Pájaro"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Animales de la granja",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Vaca"?', opciones: [{ valor: "cow", etiqueta: "Cow" }, { valor: "pig", etiqueta: "Pig" }, { valor: "horse", etiqueta: "Horse" }], correcta: "cow", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Cerdo" en inglés', correcta: "pig", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Horse" significa "Caballo"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Animales salvajes",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "León"?', opciones: [{ valor: "tiger", etiqueta: "Tiger" }, { valor: "elephant", etiqueta: "Elephant" }, { valor: "lion", etiqueta: "Lion" }], correcta: "lion", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Tigre" en inglés', correcta: "tiger", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Elephant" significa "Elefante"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            }
        }
    },

    // ==========================================
    // 2. ALEMÁN
    // ==========================================
    aleman: {
        nombre: "Alemán",
        nivel: "Básico",
        unidades: {
            u1: {
                titulo: "Unidad 1: Saludos",
                checkpoints: {
                    cp1: {
                        titulo: "Lo básico",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Hola"?', opciones: [{ valor: "hallo", etiqueta: "Hallo" }, { valor: "tschüss", etiqueta: "Tschüss" }, { valor: "bitte", etiqueta: "Bitte" }], correcta: "hallo", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Adiós" en alemán (informal)', correcta: "tschüss", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Guten Morgen" significa "Buenas noches"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "falso", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Presentaciones",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué significa "Name"?', opciones: [{ valor: "nombre", etiqueta: "Nombre" }, { valor: "edad", etiqueta: "Edad" }, { valor: "ciudad", etiqueta: "Ciudad" }], correcta: "nombre", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Yo" en alemán', correcta: "ich", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Frau" significa "Señora/Mujer"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Cortesía",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Gracias"?', opciones: [{ valor: "danke", etiqueta: "Danke" }, { valor: "bitte", etiqueta: "Bitte" }, { valor: "ja", etiqueta: "Ja" }], correcta: "danke", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Por favor" en alemán', correcta: "bitte", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Entschuldigung" se usa para pedir disculpas?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u2: {
                titulo: "Unidad 2: Comida y Bebida",
                checkpoints: {
                    cp1: {
                        titulo: "En el restaurante",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Agua"?', opciones: [{ valor: "bier", etiqueta: "Bier" }, { valor: "wasser", etiqueta: "Wasser" }, { valor: "wein", etiqueta: "Wein" }], correcta: "wasser", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Pan" en alemán', correcta: "brot", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Käse" significa "Queso"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Bebidas y postres",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué es "Kaffee"?', opciones: [{ valor: "te", etiqueta: "Té" }, { valor: "cafe", etiqueta: "Café" }, { valor: "leche", etiqueta: "Leche" }], correcta: "cafe", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Leche" en alemán', correcta: "milch", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Zucker" significa "Azúcar"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "En el mercado",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Manzana"?', opciones: [{ valor: "apfel", etiqueta: "Apfel" }, { valor: "banane", etiqueta: "Banane" }, { valor: "orange", etiqueta: "Orange" }], correcta: "apfel", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Carne" en alemán', correcta: "fleisch", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Fisch" significa "Pollo"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "falso", xp: 25 }
                        ]
                    }
                }
            },
            u3: {
                titulo: "Unidad 3: Animales",
                checkpoints: {
                    cp1: {
                        titulo: "Animales domésticos",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Perro"?', opciones: [{ valor: "hund", etiqueta: "Hund" }, { valor: "katze", etiqueta: "Katze" }, { valor: "vogel", etiqueta: "Vogel" }], correcta: "hund", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Gato" en alemán', correcta: "katze", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Vogel" significa "Pájaro"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Animales de la granja",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Vaca"?', opciones: [{ valor: "kuh", etiqueta: "Kuh" }, { valor: "schwein", etiqueta: "Schwein" }, { valor: "pferd", etiqueta: "Pferd" }], correcta: "kuh", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Cerdo" en alemán', correcta: "schwein", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Pferd" significa "Caballo"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Animales salvajes",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "León"?', opciones: [{ valor: "löwe", etiqueta: "Löwe" }, { valor: "tiger", etiqueta: "Tiger" }, { valor: "elefant", etiqueta: "Elefant" }], correcta: "löwe", xp: 10 },
                            { tipo: "texto", pregunta: 'Escribe "Tigre" en alemán', correcta: "tiger", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Elefant" significa "Elefante"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            }
        }
    },

    // ==========================================
    // 3. CHINO (Mandarín Pinyin)
    // ==========================================
    chino: {
        nombre: "Chino",
        nivel: "Básico",
        unidades: {
            u1: {
                titulo: "Unidad 1: Saludos",
                checkpoints: {
                    cp1: {
                        titulo: "Lo básico",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Hola"?', opciones: [{ valor: "ni hao", etiqueta: "Nǐ hǎo" }, { valor: "zaijian", etiqueta: "Zàijiàn" }, { valor: "xiexie", etiqueta: "Xièxiè" }], correcta: "ni hao", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Zàijiàn" en español?', correcta: "adios", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Nǐ" significa "Tú"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Presentaciones",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué significa "Wǒ"?', opciones: [{ valor: "tu", etiqueta: "Tú" }, { valor: "el", etiqueta: "Él" }, { valor: "yo", etiqueta: "Yo" }], correcta: "yo", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Míngzi" en español?', correcta: "nombre", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Hěn hǎo" significa "Muy bien"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Cortesía",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Gracias"?', opciones: [{ valor: "xiexie", etiqueta: "Xièxiè" }, { valor: "bu keqi", etiqueta: "Bù kèqì" }, { valor: "hao", etiqueta: "Hǎo" }], correcta: "xiexie", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Bù" en español?', correcta: "no", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Duìbùqǐ" significa "Lo siento"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u2: {
                titulo: "Unidad 2: Comida y Bebida",
                checkpoints: {
                    cp1: {
                        titulo: "En el restaurante",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Agua"?', opciones: [{ valor: "cha", etiqueta: "Chá" }, { valor: "shui", etiqueta: "Shuǐ" }, { valor: "kafei", etiqueta: "Kāfēi" }], correcta: "shui", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Fàn" en español?', correcta: "arroz", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Chī" significa "Comer"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Bebidas y postres",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué es "Chá"?', opciones: [{ valor: "cafe", etiqueta: "Café" }, { valor: "te", etiqueta: "Té" }, { valor: "leche", etiqueta: "Leche" }], correcta: "te", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Kāfēi" en español?', correcta: "cafe", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Hē" significa "Beber"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "En el mercado",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Manzana"?', opciones: [{ valor: "pingguo", etiqueta: "Píngguǒ" }, { valor: "rou", etiqueta: "Ròu" }, { valor: "yu", etiqueta: "Yú" }], correcta: "pingguo", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Ròu" en español?', correcta: "carne", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Yú" significa "Pescado"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u3: {
                titulo: "Unidad 3: Animales",
                checkpoints: {
                    cp1: {
                        titulo: "Animales domésticos",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Perro"?', opciones: [{ valor: "gou", etiqueta: "Gǒu" }, { valor: "mao", etiqueta: "Māo" }, { valor: "niao", etiqueta: "Niǎo" }], correcta: "gou", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Māo" en español?', correcta: "gato", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Niǎo" significa "Pájaro"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Animales de la granja",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Vaca"?', opciones: [{ valor: "niu", etiqueta: "Niú" }, { valor: "zhu", etiqueta: "Zhū" }, { valor: "ma", etiqueta: "Mǎ" }], correcta: "niu", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Zhū" en español?', correcta: "cerdo", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Mǎ" significa "Caballo"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Animales salvajes",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "León"?', opciones: [{ valor: "shizi", etiqueta: "Shīzi" }, { valor: "laohu", etiqueta: "Lǎohǔ" }, { valor: "daxiang", etiqueta: "Dàxiàng" }], correcta: "shizi", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Lǎohǔ" en español?', correcta: "tigre", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Dàxiàng" significa "Elefante"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            }
        }
    },

    // ==========================================
    // 4. COREANO (Romanización)
    // ==========================================
    coreano: {
        nombre: "Coreano",
        nivel: "Básico",
        unidades: {
            u1: {
                titulo: "Unidad 1: Saludos",
                checkpoints: {
                    cp1: {
                        titulo: "Lo básico",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Hola"?', opciones: [{ valor: "annyeonghaseyo", etiqueta: "Annyeonghaseyo" }, { valor: "gamsahamnida", etiqueta: "Gamsahamnida" }, { valor: "ne", etiqueta: "Ne" }], correcta: "annyeonghaseyo", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Ne" en español?', correcta: "si", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Aniyo" significa "No"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Presentaciones",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué significa "Jeoneun"?', opciones: [{ valor: "tu", etiqueta: "Tú" }, { valor: "yo", etiqueta: "Yo" }, { valor: "nosotros", etiqueta: "Nosotros" }], correcta: "yo", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Ireum" en español?', correcta: "nombre", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Saram" significa "Persona"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Cortesía",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Gracias"?', opciones: [{ valor: "mianhamnida", etiqueta: "Mianhamnida" }, { valor: "gamsahamnida", etiqueta: "Gamsahamnida" }, { valor: "juseyo", etiqueta: "Juseyo" }], correcta: "gamsahamnida", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Mianhamnida" en español?', correcta: "perdon", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Juseyo" se usa para pedir "Por favor / Dámelo"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u2: {
                titulo: "Unidad 2: Comida y Bebida",
                checkpoints: {
                    cp1: {
                        titulo: "En el restaurante",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Agua"?', opciones: [{ valor: "mul", etiqueta: "Mul" }, { valor: "bap", etiqueta: "Bap" }, { valor: "kimchi", etiqueta: "Kimchi" }], correcta: "mul", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Bap" en español?', correcta: "arroz", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Sikdang" significa "Restaurante"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Bebidas y postres",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Qué es "Cha"?', opciones: [{ valor: "agua", etiqueta: "Agua" }, { valor: "cafe", etiqueta: "Café" }, { valor: "te", etiqueta: "Té" }], correcta: "te", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Uyu" en español?', correcta: "leche", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Kkeopi" es "Café"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "En el mercado",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Carne"?', opciones: [{ valor: "gogi", etiqueta: "Gogi" }, { valor: "saengseon", etiqueta: "Saengseon" }, { valor: "gwail", etiqueta: "Gwail" }], correcta: "gogi", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Gwail" en español?', correcta: "fruta", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Sagwa" significa "Manzana"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            },
            u3: {
                titulo: "Unidad 3: Animales",
                checkpoints: {
                    cp1: {
                        titulo: "Animales domésticos",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Perro"?', opciones: [{ valor: "gae", etiqueta: "Gae" }, { valor: "goyangi", etiqueta: "Goyangi" }, { valor: "sae", etiqueta: "Sae" }], correcta: "gae", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Goyangi" en español?', correcta: "gato", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Sae" significa "Pájaro"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp2: {
                        titulo: "Animales de la granja",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "Vaca"?', opciones: [{ valor: "so", etiqueta: "So" }, { valor: "dwaeji", etiqueta: "Dwaeji" }, { valor: "mal", etiqueta: "Mal" }], correcta: "so", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Dwaeji" en español?', correcta: "cerdo", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Mal" significa "Caballo"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    },
                    cp3: {
                        titulo: "Animales salvajes",
                        pasos: [
                            { tipo: "choice", pregunta: '¿Cómo se dice "León"?', opciones: [{ valor: "saja", etiqueta: "Saja" }, { valor: "horangi", etiqueta: "Horangi" }, { valor: "kokkiri", etiqueta: "Kokkiri" }], correcta: "saja", xp: 10 },
                            { tipo: "texto", pregunta: '¿Qué significa "Horangi" en español?', correcta: "tigre", xp: 15 },
                            { tipo: "vf", pregunta: '¿"Kokkiri" significa "Elefante"?', opciones: [{ valor: "verdadero", etiqueta: "Verdadero" }, { valor: "falso", etiqueta: "Falso" }], correcta: "verdadero", xp: 25 }
                        ]
                    }
                }
            }
        }
    }
};