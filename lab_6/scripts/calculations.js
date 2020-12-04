const calculationTypes = [
  'square_area',
  'circle_area',
  'triangle_area',
  'circle_length',
  'sphere_volume',
];

let selectedCalcType;

const form = document.querySelector('form');

const selectCalculationType = (calcType) => {
  if (!calcType) {
    calcType = location.search.replace('?type=', '') || calculationTypes[0];
  }

  [...document.querySelectorAll('[data-if-calculation]')].map((el) => {
    if (el.dataset['ifCalculation'] === calcType) {
      el.classList.add('active-calculation');
    } else {
      el.classList.remove('active-calculation');
    }
  });
  document.querySelector('#result').innerHTML = 0;
  form.reset();
  selectedCalcType = calcType;
};
selectCalculationType();

calculationTypes.map((type, index) => {
  document.querySelector('#calculation-types').insertAdjacentHTML(
    'beforeend',
    `
		<div class="custom-control custom-radio ml-4 text-capitalize">
			<input
				type="radio" id="calculation-${index}"
				name="figure-type"
				class="custom-control-input"
				${type === selectedCalcType && 'checked'}
			>
			<a href="?type=${type}" class="custom-control-label text-light" for="calculation-${index}">${type.replace(
      '_',
      ' '
    )}</a>
		</div>
	`
  );
});

const clearCalculation = () => {
  document.querySelector('#result').innerHTML = 0;
  form.reset();
};

const calculate = (e) => {
  e.preventDefault();
  const value = e.target.value.value;
  let result;

  switch (selectedCalcType) {
    case 'square_area':
      result = value * value;
      break;
    case 'circle_area':
      result = Math.PI * value * value;
      break;
    case 'triangle_area':
      result = 0.5 * value * value;
      break;
    case 'circle_length':
      result = Math.PI * 2 * value;
      break;
    case 'sphere_volume':
      result = Math.PI * (4 / 3) * value;
      break;
  }

  document.querySelector('#result').innerHTML =
    result.toFixed(3).replace('.000', '') || 0;
};
