"use strict";
import './index.scss';

// // опции грузоподъемности
const selectCapacity = document.querySelector('#lifting-capacity');
const selectCapacityTitle = selectCapacity.querySelector('.select__title');
const selectCapacityLabels = selectCapacity.querySelectorAll('.select__label');
const spanCapacity = selectCapacity.querySelector('.span')
// Toggle menu
selectCapacityTitle.addEventListener('click', () => {
    if ('active' === selectCapacity.getAttribute('data-state')) {
        selectCapacity.setAttribute('data-state', '');
    } else {
        selectCapacity.setAttribute('data-state', 'active');
    }
});

for (let i = 0; i < selectCapacityLabels.length; i++) {
    selectCapacityLabels[i].addEventListener('click', (evt) => {
        spanCapacity.textContent = evt.target.textContent;
        spanCapacity.classList.add('check')
        selectCapacity.setAttribute('data-state', '');
    });
}
// опции способа загрузки 
const selectMethod = document.querySelector('#method');
const selectMethodTitle = selectMethod.querySelector('.select__title');
const selectMethodLabels = selectMethod.querySelectorAll('.select__label');
const spanMethod = selectMethod.querySelector('.span')

// Toggle menu
selectMethodTitle.addEventListener('click', () => {
    if ('active' === selectMethod.getAttribute('data-state')) {
        selectMethod.setAttribute('data-state', '');
    } else {
        selectMethod.setAttribute('data-state', 'active');
    }
});

for (let i = 0; i < selectMethodLabels.length; i++) {
    selectMethodLabels[i].addEventListener('click', (evt) => {
        spanMethod.textContent = evt.target.textContent;
        selectMethod.setAttribute('data-state', '');
    });
}

// опции типа груза
const selectCargo = document.querySelector('#cargo');
const selectCargoTitle = selectCargo.querySelector('.select__title');
const selectCargoLabels = selectCargo.querySelectorAll('.select__label');
const spanCargo = selectCargo.querySelector('.span')

// Toggle menu
selectCargoTitle.addEventListener('click', () => {
    if ('active' === selectCargo.getAttribute('data-state')) {
        selectCargo.setAttribute('data-state', '');
    } else {
        selectCargo.setAttribute('data-state', 'active');
    }
});

for (let i = 0; i < selectCargoLabels.length; i++) {
    selectCargoLabels[i].addEventListener('click', (evt) => {
        spanCargo.textContent = evt.target.textContent;
        spanCargo.classList.add('check');
        selectCargo.setAttribute('data-state', '');
    });
}

// опции типа опасности 
const selectDanger = document.querySelector('#danger');
const selectDangerTitle = selectDanger.querySelector('.select__title');
const selectDangerLabels = selectDanger.querySelectorAll('.select__label');
const spanDanger = selectDanger.querySelector('.span')

// Toggle menu
selectDangerTitle.addEventListener('click', () => {
    if ('active' === selectDanger.getAttribute('data-state')) {
        selectDanger.setAttribute('data-state', '');
    } else {
        selectDanger.setAttribute('data-state', 'active');
    }
});

for (let i = 0; i < selectDangerLabels.length; i++) {
    selectDangerLabels[i].addEventListener('click', (evt) => {
        spanDanger.textContent = evt.target.textContent;
        selectDanger.setAttribute('data-state', '');
    });
}

//всплытие инпутов с настройками температуры
const temperatureSection = document.querySelector('#temperature');
const checkbox = document.querySelector('#check')
const toggleClass = () => {
    temperatureSection.classList.toggle('visible');
}
checkbox.addEventListener('click', toggleClass)