const inventario = document.getElementById('bau');
const portal = document.getElementById('portal');

let itemArrastado = null;

function criarSlot() {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    return slot;
}

function criarObsidian() {
    const bloco = document.createElement('div');
    bloco.classList.add('obsidian');
    bloco.setAttribute('draggable', 'true');
    return bloco;
}

function adicionarEventosAoItem(bloco) {
    bloco.addEventListener('dragstart', () => {
        itemArrastado = bloco;
    });

    bloco.addEventListener('dragend', () => {
        itemArrastado = null;
    });
}

function adicionarEventosAoDestino(slot, podeReceber) {
    slot.addEventListener('dragover', (event) => {
        event.preventDefault();

        if (podeReceber() && !slot.hasChildNodes()) {
            slot.classList.add('drag-over');
        }
    });

    slot.addEventListener('dragleave', () => {
        slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (event) => {
        event.preventDefault();
        slot.classList.remove('drag-over');

        if (podeReceber() && itemArrastado && !slot.hasChildNodes()) {
            slot.appendChild(itemArrastado);
            verificarPortal();
        }
    });
}

for (let i = 0; i < 14; i++) {
    const slot = criarSlot();

    if (i < 14) {
        const obsidian = criarObsidian();
        slot.appendChild(obsidian);
        adicionarEventosAoItem(obsidian);
    }

    inventario.appendChild(slot);
}

const slotsInventario = inventario.querySelectorAll('.slot');

slotsInventario.forEach((slot) => {
    adicionarEventosAoDestino(slot, () => true);
});

for (let i = 0; i < 20; i++) {
    const slot = criarSlot();

    const linha = Math.floor(i / 4);
    const coluna = i % 4;

    if (linha > 0 && linha < 4 && coluna > 0 && coluna < 3) {
        slot.classList.add('slot-vazio-portal');
    }

    portal.appendChild(slot);
}

const slotsPortal = portal.querySelectorAll('.slot:not(.slot-vazio-portal)');
let portalCarregado = false;

function verificarPortal() {
    const portalCompleto = [...slotsPortal].every((slot) => slot.hasChildNodes());

    if (portalCarregado || !portalCompleto) {
        return;
    }

    portalCarregado = true;
    portal.classList.add('portal-carregando');

    setTimeout(() => {
        portal.classList.remove('portal-carregando');
        portal.classList.add('portal-aceso');
    }, 3000);
}

slotsPortal.forEach((slot) => {
    adicionarEventosAoDestino(slot, () => itemArrastado?.parentElement?.parentElement === inventario);
});