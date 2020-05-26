Counter.quantity = 0;

/**
 * Counter handler for buttons and value display
 * @param {Number} value initial counter value
 * @param {String} displayId
 * @param {String} increaseButtonId 
 * @param {String} descreaseButtonId 
 * @param {String} resetButtonId 
 */
function Counter(value = 0, phase = 1) {
    let id = Counter.quantity;

    this.value = value;
    this.phase = phase;
    
    this.id = id;
    this.displayId = `displayId-${id}`;
    this.increaseButtonId = `increaseButtonId-${id}`;
    this.descreaseButtonId = `descreaseButtonId-${id}`;
    this.resetButtonId = `resetButtonId-${id}`;

    Counter.quantity++;
}

/**
 * Atach the display and buttons to the DOM
 * @param {Number} id counter id
 * @returns {Array<HTMLButtonElement>} increaseBtn, decreaseBtn, resetBtn
 */
function createUI(id) {
    // Create elements
    let counterContainer = document.createElement('div');
    let display = document.createElement('p');
    let increaseBtn = document.createElement('button');
    let decreaseBtn = document.createElement('button');
    let resetBtn = document.createElement('button');

    // Set ids to elements
    counterContainer.id = `counter-${id}`;
    display.id = `displayId-${id}`;
    increaseBtn.id = `increaseBtn-${id}`;
    decreaseBtn.id = `decreaseBtn-${id}`;
    resetBtn.id = `resetBtn-${id}`;
    
    // Set innerText to buttons
    increaseBtn.innerText = 'Increase';
    decreaseBtn.innerText = 'Decrease';
    resetBtn.innerText = 'Reset';

    // Apend counter components to container
    counterContainer.appendChild(display);      // display
    counterContainer.appendChild(increaseBtn);  // increaseBtn
    counterContainer.appendChild(decreaseBtn);  // decreaseBtn
    counterContainer.appendChild(resetBtn);     // resetBtn

    // Apend counter to counters container
    document.getElementById('counters').appendChild(counterContainer);

    return [ increaseBtn, decreaseBtn, resetBtn ];
}

Counter.prototype.resetCounter = function resetCounter() {
    this.setCounterValue(0);
};

Counter.prototype.setCounterValue = function setCounterValue(value) {
    this.value = value;
    document.getElementById(`${this.displayId}`).innerHTML = value.toString();
};

Counter.prototype.increaseCounter = function increaseCounter() {
    this.setCounterValue(this.value + this.phase);
};

Counter.prototype.decreaseCounter = function decreaseCounter() {
    this.setCounterValue(this.value - this.phase);
};

Counter.prototype.init = function init() {
    // Add display text and buttons to DOM
    let [increaseBtn, decreaseBtn, resetBtn] = createUI(this.id);

    // Bind functions to current Counter this
    this.increaseCounter = this.increaseCounter.bind(this);
    this.decreaseCounter = this.decreaseCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);

    // Add events listeners
    increaseBtn.addEventListener('click', this.increaseCounter);
    decreaseBtn.addEventListener('click', this.decreaseCounter);
    resetBtn.addEventListener('click', this.resetCounter);
    
    // Set the initial value
    this.setCounterValue(this.value);
};

export { Counter };