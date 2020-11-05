function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")  // procurando dados
    .then( res => res.json() )  // retornando-os em json, porém só na memória dele
    .then( states => {  // Coloca eles em uma das opções
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value  // pega o valor do estado

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text      // Pegar qual option está selecionado pra pegar seu valor

    // mostra os municípios de acordo com o número da variável ufValue \/
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`  

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)  // procurando dados
    .then( res => res.json() )  // retornando-os em json, porém só na memória dele
    .then( cities => {  // Coloca eles em uma das opções
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) // identifica qual valor do estado foi pego

// -------- ITENS DE COLETA ----------
// =|Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

// =|Vê qual está sendo clicado
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // =|Adicionar ou remover uma classe com Javascript
    itemLi.classList.toggle("selected")  // toggle => Se ele tiver selected ele tira e se não tiver ele põem

    const itemId = itemLi.dataset.id

    // console.log("ITEM ID: ", itemId)

    // =|Verificar se existem itens selecionados
        // =|Se sim: Pega os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId  // isso será true ou false | Repete até chegar em um true
        return itemFound
    })
        // =|Se já tiver: Tirar o item da seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId  // Retorna => False 
            return itemIsDifferent
        })

        selectedItems = filteredItems
        // =|Se não: Adicionar a seleção
    } else {
        selectedItems.push(itemId)
    }

    // console.log("selectedItems ", selectedItems)

    // =|Atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItems
}
