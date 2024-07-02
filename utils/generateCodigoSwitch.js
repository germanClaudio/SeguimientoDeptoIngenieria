const fs = require('fs');

const posiblesValores = {
    query: ['', 'noEmptyString', 'noEmptyNumber'],
    status: ['todos', true, false],
    admin: ['todos', true, false],
    area: ['todos', 'ingenieria', 'fabricacion', 'proyectos', 'administracion'],
    permiso: ['todos', 'diseno', 'simulacion', 'disenoSimulacion', 'projectManager', 'cadCam', 'mecanizado', 'ajuste']
};

// Función para generar todas las combinaciones posibles de los valores
function generarCombinaciones(valores) {
    const keys = Object.keys(valores);
    const combinations = [];
    const generate = (arr, keyIndex) => {
        const key = keys[keyIndex];
        if (keyIndex === keys.length - 1) {
            for (const value of valores[key]) {
                combinations.push([...arr, value]);
            }
        } else {
            for (const value of valores[key]) {
                generate([...arr, value], keyIndex + 1);
            }
        }
    };
    generate([], 0);
    return combinations;
}

// Generar todas las combinaciones posibles
const combinaciones = generarCombinaciones(posiblesValores);

// Función para generar la consulta basada en los filtros
function generarConsulta(query, status, admin, area, permiso) {
    let queryObj = {};
    
    if (query === 'noEmptyString') {
        queryObj.$or = [{ 'name': { $regex: "${query}", $options: 'i' } }, 
                        { 'lastName': { $regex: "${query}", $options: 'i' } },
                        { 'email': { $regex: "${query}", $options: 'i' } }, 
                        { 'username': { $regex: "${query}", $options: 'i' } }
                    ];
    } else if (query === 'noEmptyNumber') {
        queryObj.$or = [
            { 'legajoId': {
                            $match: {
                                $expr: {
                                    $regexMatch: {
                                        input: { $toString: "$legajoId" },
                                        regex: "${query}"
                                    }
                                }
                            }
                        }
            }
        ]
    }
    
    if (status !== 'todos') {
        queryObj.status = status === true;
    }

    if (admin !== 'todos') {
        queryObj.admin = admin === true;
    }

    if (area !== 'todos') {
        queryObj.area = area;
    }

    if (permiso !== 'todos') {
        queryObj.permiso = permiso;
    }

    return queryObj;
}

// Función para generar el código del switch
function generarCodigoSwitch(combinaciones) {
    let codigoSwitch = "switch(filter) {\n";
    combinaciones.forEach(combinacion => {
        const [query, status, admin, area, permiso] = combinacion;
        const key = `${query}-${status}-${admin}-${area}-${permiso}`;
        codigoSwitch += `    case 'filterFor-${key}': {\n`;
        codigoSwitch += `        var queryObj = ${JSON.stringify(generarConsulta(query, status, admin, area, permiso ) ) };\n`;
        if (Object.keys(generarConsulta(query, status, admin, area, permiso)).length > 0) {
            codigoSwitch += `        var resultados = await Usuarios.find(queryObj);\n`;
        } else {
            codigoSwitch += `        var resultados = ['vacio'];\n`;
        }
        codigoSwitch += `        break;\n`;
        codigoSwitch += `    }\n`;
    });
    codigoSwitch += "    default: {\n";
    codigoSwitch += `        var resultados = ['vacio'];\n`;
    codigoSwitch += "        break;\n";
    codigoSwitch += "    }\n";
    codigoSwitch += "}";
    return codigoSwitch;
}

// Generar el código del switch
const codigoSwitch = generarCodigoSwitch(combinaciones);

// Definir el nombre del archivo
const nombreArchivo = 'codigoSwitch.txt';

// Escribir el código a un archivo
fs.writeFile(nombreArchivo, codigoSwitch, (err) => {
    if (err) {
        console.error('Error al escribir el archivo:', err);
    } else {
        console.log(`Código guardado en ${nombreArchivo}`);
    }
});
