document.getElementById('calculo-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const intervaloAInput = document.getElementById('intervalo_a');
    const intervaloBInput = document.getElementById('intervalo_b');
    const numeroIntervalosInput = document.getElementById('numero_intervalos');
    const resultadoElement = document.getElementById('resultado');

    const intervaloA = parseFloat(intervaloAInput.value);
    const intervaloB = parseFloat(intervaloBInput.value);
    const numeroIntervalos = parseInt(numeroIntervalosInput.value);

    if (isNaN(intervaloA) || isNaN(intervaloB) || isNaN(numeroIntervalos) || numeroIntervalos <= 0) {
        resultadoElement.textContent = "Por favor, ingrese todos los valores correctamente.";
        return;
    }

    resultadoElement.innerHTML = '';

    const h = (intervaloB - intervaloA) / numeroIntervalos;

    function f(x) {
        return Math.sqrt(1 + 0.00627264 * Math.pow(Math.sin(0.11 * x), 2));
    }

    let l = 0;
    let m = 0;

    for (let i = 2; i < numeroIntervalos; i += 2) {
        l += f(intervaloA + i * h);
    }

    for (let i = 1; i < numeroIntervalos; i += 2) {
        m += f(intervaloA + i * h);
    }

    const c = f(intervaloA);
    const d = f(intervaloB);
    const n = numeroIntervalos;

    const total = (h / 3) * (c + (2 * l) + (4 * m) + d);


    const resultados = document.createElement('div');
    resultados.classList.add('resultados');


    const hParrafo = document.createElement('p');
    hParrafo.textContent = `Valor de h (Es el tamaño de cada subintervalo): ${h.toFixed(4)}`;
    resultados.appendChild(hParrafo);


    const nParrafo = document.createElement('p');
    nParrafo.textContent = `Valor de n: ${n.toFixed(4)}`;
    resultados.appendChild(nParrafo);

    const totalParrafo = document.createElement('p');
    totalParrafo.textContent = `Total: ${total.toFixed(4)}`;
    resultados.appendChild(totalParrafo);


    resultadoElement.appendChild(resultados);
});

const ctx = document.getElementById('grafico').getContext('2d');


function actualizarGrafico() {

    const intervaloA = parseFloat(document.getElementById('intervalo_a').value);
    const intervaloB = parseFloat(document.getElementById('intervalo_b').value);
    const numeroIntervalos = parseInt(document.getElementById('numero_intervalos').value);


    const datos = [];
    const paso = (intervaloB - intervaloA) / 100;
    for (let x = intervaloA; x <= intervaloB; x += paso) {
        datos.push({x: x, y: Math.sqrt(1 + 0.00627264 * Math.pow(Math.sin(0.11 * x), 2))});
    }


    const grafico = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Función f(x)',
                data: datos,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}


document.getElementById('calculo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    actualizarGrafico();
});
