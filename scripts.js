// seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector('ul')

// capturando o evento de input para formatar o valor
amount.oninput = () =>{
    // obtem o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D+/g, "")

    // transformar o valor em centavos
    value = Number(value)/100

    // atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    // formata o valor no padrão BRL (Real brasileiro)
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    // retorna o valor formatado
    return value
}

// captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    // previne o comportamento padrão de recarregar a página
    event.preventDefault()

    // cria um objeto com os detalhes na nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    // chama a função que irá adicionar o item na lista
    expenseAdd(newExpense)

}

function expenseAdd(newExpense){
    try{
        // cria o elemento deli para adicionar o item na lista (ul)
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        // cria o ícone da categoria
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        // adiciona as informações no item
        expenseItem.append(expenseIcon)

        // adiciona o item na lista
        expenseList.append(expenseIcon)

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}