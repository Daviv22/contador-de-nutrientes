import {setMetas} from "./state.js";
import {atualizarGraficoMetas} from "./graphics.js";

export function pegarMetas() {
    const metas = {
        carboidratos: Number(document.getElementById('meta-carb').value),
        proteinas: Number(document.getElementById('meta-prot').value),
        gorduras: Number(document.getElementById('meta-gord').value)
    }

    setMetas(metas);
    atualizarGraficoMetas();
}