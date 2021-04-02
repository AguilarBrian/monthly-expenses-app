const inputTitle: HTMLInputElement = document.querySelector(
  '#title'
) as HTMLInputElement;
const inputCost: HTMLInputElement = document.querySelector(
  '#cost'
) as HTMLInputElement;
const selectCurrency: HTMLSelectElement = document.querySelector(
  '#currency'
) as HTMLSelectElement;
const buttonAdd: HTMLButtonElement = document.querySelector(
  '#bAdd'
) as HTMLButtonElement;

const expenses = new Expenses('USD');

const render: Function = () => {
  let html = '';

  expenses.getItems().forEach(item => {
    const { id, title, cost } = item;
    const { amount, currency } = cost;

    html += `
                    <div class='item'>
                        <div><span class='currency'>${currency}</span> $${amount}</div>
                        <div>${title}</div>
                        <div><button class='buttonDel' data-id='${id}'>DELETE</button></div>
                    </div>
                `;
  });

  $('#items').innerHTML = html;
  $('#display').textContent = expenses.getTotal();

  $$('.buttonDel').forEach(b => {
    b.addEventListener('click', e => {
      const id = (e.target as HTMLButtonElement).getAttribute('data-id');
      expenses.remove(parseInt(id!));

      render();
    });
  });

  function $(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement;
  }

  function $$(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  }
};

render();

buttonAdd!.addEventListener('click', e => {
  if (
    inputTitle!.value !== '' &&
    inputCost!.value !== '' &&
    !isNaN(parseFloat(inputCost.value))
  ) {
    const title: string = inputTitle!.value;
    const cost: number = parseFloat(inputCost!.value);
    const currency: Currency = <Currency>selectCurrency!.value;

    expenses.add({ title: title, cost: { amount: cost, currency: currency } });

    render();
  } else {
    alert('Please, fill in the details correctly');
  }
});
