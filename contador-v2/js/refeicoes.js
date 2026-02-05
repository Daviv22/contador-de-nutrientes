import {setMetas} from "./state.js";

export function pegarMetas() {
    const metas = {
        carboidratos: document.getElementById('meta-carb').value,
        proteinas: document.getElementById('meta-prot').value,
        gorduras: document.getElementById('meta-gord').value,
    }

    console.log(metas)
}