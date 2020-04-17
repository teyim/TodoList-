//created by Teyim---4/15/2020---//
const userInput = document.getElementById('textbox');
const addBtn = document.getElementById('addbtn');
const ul = document.getElementById('listItem');
const itemArray = [];
let editElementId;
let indexValue;

const validateUserInput = () => {
	if (userInput.value === '') {
		alert('please insert text into textbox');
	} else if (userInput.value.length > 80) {
		alert('your text avnnot be longer than 80 characters');
	} else {
		addItem(userInput.value);
		clearTextbox();
	}
};
const addItem = (userdata) => {
	const inlineEditElementId = editElementId;
	let editElementIndex = 0;
	if (addBtn.innerText === 'Edit') {
		for (const item of itemArray) {
			if (item.id === inlineEditElementId) {
				item.text = userdata;
				break;
			}
			editElementIndex++;
			indexValue = editElementIndex;
		}
		if (ul.children[editElementIndex].classList.contains('checked')) {
			ul.children[
				editElementIndex
			].innerHTML = `<img src="assets/checkmark_24px.png" alt="" class="checkedimageoff"> <img src="assets/edit_24px.png" alt="" class="m-2" style="width:20px;">${userInput.value}<img data-toggle="modal" data-target="#exampleModalCenter"
				class="float-right delete-image" src="assets/delete_sign_48px.png" alt="image"
				style="width:26px;">
		`;
			const images = ul.children[editElementIndex].querySelectorAll('img');
			ul.children[editElementIndex].classList.toggle('checked');
			images[1].addEventListener('click', () => {
				userInput.value = ul.children[editElementIndex].innerText;
				addBtn.innerText = 'Edit';
				editElementId = inlineEditElementId;
			});
			images[2].addEventListener('click', () => {
				removeListElement(inlineEditElementId);
			});
			addBtn.innerHTML = 'Add Item';
			clearTextbox();
		} else {
			ul.children[
				editElementIndex
			].innerHTML = `<img src="assets/checkmark_24px.png" alt="" class="checkedimageoff"> <img src="assets/edit_24px.png" alt="" class="m-2" style="width:20px;">${userInput.value}<img data-toggle="modal" data-target="#exampleModalCenter"
				class="float-right delete-image" src="assets/delete_sign_48px.png" alt="image"
				style="width:26px;">
		`;
			const images = ul.children[editElementIndex].querySelectorAll('img');
			images[1].addEventListener('click', () => {
				userInput.value = ul.children[editElementIndex].innerText;
				addBtn.innerText = 'Edit';
				editElementId = inlineEditElementId;
			});
			images[2].addEventListener('click', () => {
				removeListElement(inlineEditElementId);
			});
			addBtn.innerHTML = 'Add Item';
			clearTextbox();
		}
	} else {
		const item = {
			id: Math.random().toString(),
			text: userdata,
		};
		itemArray.push(item);
		createListDomItem(item.id, item.text);
		console.log(itemArray);
	}
};
const createListDomItem = (id, text) => {
	const li = document.createElement('li');
	li.innerHTML = `<img src="assets/checkmark_24px.png" alt="" class="checkedimageoff"> <img src="assets/edit_24px.png" alt="" class="m-2" style="width:20px;">${text}<img data-toggle="modal" data-target="#exampleModalCenter"
                                class="float-right delete-image" src="assets/delete_sign_48px.png" alt="image"
                                style="width:26px;">
  `;

	const images = li.querySelectorAll('img');
	images[1].addEventListener('click', () => {
		userInput.value = text;
		addBtn.innerText = 'Edit';
		editElementId = id;
	});
	images[2].addEventListener('click', () => {
		removeListElement(id);
	});
	ul.appendChild(li);
	li.addEventListener('dblclick', () => {
		if (itemArray.length > -1) {
			li.classList.toggle('checked');
			li.querySelector('img').classList.toggle('checkedimageoff');
		}
	});
};

const clearTextbox = () => {
	userInput.value = '';
};

const removeListElement = (movieId) => {
	let movieIndex = 0;
	for (const movie of itemArray) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	itemArray.splice(movieIndex, 1);
	ul.removeChild(ul.children[movieIndex]);
};
const EditListElement = (movieId, Text) => {
	let movieIndex = 0;
	for (const movie of itemArray) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	itemArray[movieIndex].text = Text;
};
addBtn.addEventListener('click', validateUserInput);
