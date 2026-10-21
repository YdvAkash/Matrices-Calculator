const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'scripts.js'), 'utf8');

function loadCalculator(rows, columns, values = {}) {
    const elements = new Map();
    elements.set('rows', { value: String(rows) });
    elements.set('columns', { value: String(columns) });

    for (const [id, value] of Object.entries(values)) {
        elements.set(id, { value: String(value), textContent: '' });
    }

    const alerts = [];
    const context = {
        document: {
            getElementById(id) {
                if (!elements.has(id)) {
                    elements.set(id, { value: '', textContent: '' });
                }
                return elements.get(id);
            },
        },
        alert(message) {
            alerts.push(message);
        },
    };

    vm.runInNewContext(source, context);
    return { calculator: context, elements, alerts };
}

test('matrix multiplication rejects non-square dimensions with a clear message', () => {
    const { calculator, alerts, elements } = loadCalculator(2, 3, {
        result00: 'unchanged',
    });

    calculator.multiplyMatrices();

    assert.equal(alerts.length, 1);
    assert.match(alerts[0], /square matrices only/i);
    assert.equal(elements.get('result00').textContent, '');
});

test('matrix multiplication computes a valid 2x2 product', () => {
    const { calculator, elements, alerts } = loadCalculator(2, 2, {
        a00: 1, a01: 2, a10: 3, a11: 4,
        b00: 5, b01: 6, b10: 7, b11: 8,
        result00: '', result01: '', result10: '', result11: '',
    });

    calculator.multiplyMatrices();

    assert.deepEqual(alerts, []);
    assert.deepEqual(
        ['result00', 'result01', 'result10', 'result11'].map(id => elements.get(id).textContent),
        [19, 22, 43, 50],
    );
});
